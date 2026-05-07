@description('Azure region for the resources.')
param location string

@description('Azure Container App name.')
param containerAppName string

@description('Azure Container Apps managed environment name.')
param containerAppEnvironmentName string

@description('Container registry server, e.g. ghcr.io.')
param registryServer string

@description('Container registry username.')
param registryUsername string

@secure()
@description('Container registry password (GitHub PAT with read:packages scope).')
param registryPassword string

@description('Initial image used when creating the container app.')
param initialImage string = 'mcr.microsoft.com/k8se/quickstart:latest'

@description('Client-side Sanity project id.')
param nextPublicSanityProjectId string

@description('Client-side Sanity dataset.')
param nextPublicSanityDataset string

@secure()
@description('Google Places API key used by the server API route.')
param googlePlacesApiKey string

@secure()
@description('Google service account JSON used by the calendar API route.')
param googleServiceAccountJson string

@description('Google Place ID used by the server API route.')
param googlePlaceId string

@description('Minimum number of replicas.')
param minReplicas int = 1

@description('Maximum number of replicas.')
param maxReplicas int = 1

resource managedEnvironment 'Microsoft.App/managedEnvironments@2024-03-01' = {
  name: containerAppEnvironmentName
  location: location
  properties: {}
}

resource containerApp 'Microsoft.App/containerApps@2024-03-01' = {
  name: containerAppName
  location: location
  properties: {
    managedEnvironmentId: managedEnvironment.id
    configuration: {
      ingress: {
        external: true
        targetPort: 3000
        transport: 'auto'
      }
      registries: [
        {
          server: registryServer
          username: registryUsername
          passwordSecretRef: 'registry-password'
        }
      ]
      secrets: [
        {
          name: 'registry-password'
          value: registryPassword
        }
        {
          name: 'google-places-api-key'
          value: googlePlacesApiKey
        }
        {
          name: 'google-service-account-json'
          value: googleServiceAccountJson
        }
      ]
    }
    template: {
      containers: [
        {
          name: 'breede-escape-web'
          image: initialImage
          env: [
            {
              name: 'NODE_ENV'
              value: 'production'
            }
            {
              name: 'NEXT_PUBLIC_SANITY_PROJECT_ID'
              value: nextPublicSanityProjectId
            }
            {
              name: 'NEXT_PUBLIC_SANITY_DATASET'
              value: nextPublicSanityDataset
            }
            {
              name: 'GOOGLE_PLACE_ID'
              value: googlePlaceId
            }
            {
              name: 'GOOGLE_PLACES_API_KEY'
              secretRef: 'google-places-api-key'
            }
            {
              name: 'GOOGLE_SERVICE_ACCOUNT_JSON'
              secretRef: 'google-service-account-json'
            }
          ]
          resources: {
            cpu: json('0.25')
            memory: '0.5Gi'
          }
        }
      ]
      scale: {
        minReplicas: minReplicas
        maxReplicas: maxReplicas
      }
    }
  }
}

output containerAppId string = containerApp.id
output managedEnvironmentId string = managedEnvironment.id
