# Azure Container Apps Deployment Guide

This guide provides setup instructions for deploying the Breede Escape web application to Azure Container Apps.

## Prerequisites

- Azure subscription with active account
- [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli) installed
- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed (for local testing)
- GitHub repository with write access
- Owner/Contributor role in Azure subscription

## Architecture Overview

```
GitHub Repository
    ↓
GitHub Actions Workflow
    ↓
GitHub Container Registry / GHCR (push image)
    ↓
Azure Container Apps (pull & run)
    ↓
Container Environment (networking, scaling)
```

## Step 1: Create Base Azure Resources

The pipeline deploys Container Apps infrastructure via Bicep, but you still need a resource group created once. No container registry needs to be provisioned — images are stored in GHCR for free.

### 1.1 Create a Resource Group

```bash
az group create \
  --name rg-breede-escape \
  --location eastus
```

## Step 2: Configure GHCR Access

### 2.1 Create a GitHub PAT for Azure

Azure Container Apps needs a token to pull images from GHCR at runtime. Create a GitHub Personal Access Token (classic) with the `read:packages` scope:

1. Go to **GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)**
2. Generate a new token with `read:packages` scope
3. Copy the token — you'll use it as `GHCR_TOKEN` in GitHub secrets

The push step uses the built-in `GITHUB_TOKEN` automatically — no extra setup needed.

## Step 3: Configure GitHub Secrets

Add these secrets to your GitHub repository (Settings → Secrets and Variables → Actions):

```
GHCR_TOKEN                      → GitHub PAT with read:packages scope (for Azure to pull images)

AZURE_CLIENT_ID                 → <from service principal>
AZURE_TENANT_ID                 → <from service principal>
AZURE_SUBSCRIPTION_ID           → <your subscription id>

AZURE_RESOURCE_GROUP            → rg-breede-escape
AZURE_CONTAINER_ENVIRONMENT     → cae-breede-escape
AZURE_CONTAINER_APP             → ca-breede-escape
AZURE_CONTAINER_APP_URL         → <your-app-url>.azurecontainerapps.io

NEXT_PUBLIC_SANITY_PROJECT_ID   → <your sanity project id>
NEXT_PUBLIC_SANITY_DATASET      → <your sanity dataset>
GOOGLE_SERVICE_ACCOUNT_JSON     → <full Google service account JSON, single line JSON string>
GOOGLE_PLACES_API_KEY           → <your google places api key>
GOOGLE_PLACE_ID                 → <your google place id>
```

> **Note:** `AZURE_REGISTRY_URL`, `AZURE_REGISTRY_USERNAME`, and `AZURE_REGISTRY_PASSWORD` are no longer needed.

## Step 4: Deploy Infrastructure as Pipeline Step 1 (Bicep)

The workflow deploys `infra/container-app.bicep` as the first job (`infra`) before image build/deploy.

It configures:

- Container Apps managed environment
- Container app ingress and scale settings
- Registry binding
- Runtime app environment variables and secrets, including Google Places
- Runtime app environment variables and secrets, including Google Calendar service account JSON and Google Places

## Step 5: Trigger Deployment

Push to `main` to run the pipeline:

1. `infra` job: deploys `infra/container-app.bicep`
2. `build-and-push` job: builds and pushes the image
3. `deploy` job: updates the container app image

## Step 6: Configure Container App Environment Variables (Manual fallback)

```bash
az containerapp update \
  --name ca-breede-escape \
  --resource-group rg-breede-escape \
  --set-env-vars \
    NEXT_PUBLIC_SANITY_PROJECT_ID=<value> \
    NEXT_PUBLIC_SANITY_DATASET=<value> \
    GOOGLE_SERVICE_ACCOUNT_JSON='<full-json>' \
    GOOGLE_PLACES_API_KEY=<value> \
    GOOGLE_PLACE_ID=<value>
```

## Step 7: Configure Auto-Scaling

```bash
az containerapp update \
  --name ca-breede-escape \
  --resource-group rg-breede-escape \
  --min-replicas 1 \
  --max-replicas 5
```

## Step 8: Testing Locally (Optional)

Build and test the Docker image locally:

```bash
# Build the image
docker build -t breede-escape-web:latest .

# Run the container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SANITY_PROJECT_ID=<your-id> \
  -e NEXT_PUBLIC_SANITY_DATASET=<your-dataset> \
  -e GOOGLE_SERVICE_ACCOUNT_JSON='<full-json>' \
  -e GOOGLE_PLACES_API_KEY=<your-google-places-api-key> \
  -e GOOGLE_PLACE_ID=<your-google-place-id> \
  breede-escape-web:latest

# Visit http://localhost:3000
```

## Deployment Flow

1. **Push to `main` branch** → Builds image and deploys to the container app

## Monitoring & Logs

### View logs:

```bash
az containerapp logs show \
  --name ca-breede-escape \
  --resource-group rg-breede-escape \
  --follow
```

### Monitor metrics:

```bash
az monitor metrics list \
  --resource /subscriptions/{SUBSCRIPTION_ID}/resourceGroups/rg-breede-escape/providers/Microsoft.App/containerApps/ca-breede-escape \
  --metric Requests,ProcessorCount,MemoryUsage \
  --start-time $(date -u -d '1 hour ago' +%Y-%m-%dT%H:%M:%SZ) \
  --interval PT1M
```

## Troubleshooting

### Image won't pull from registry

- Verify `GHCR_TOKEN` secret is set and has `read:packages` scope
- Ensure the package (image) visibility is set correctly on GitHub — either public, or the PAT has access
- Check the image name matches: `ghcr.io/<owner>/breede-escape-web`

### Container won't start

- Check logs: `az containerapp logs show --name ca-breede-escape --resource-group rg-breede-escape --follow`
- Verify environment variables are set correctly
- Check Next.js build succeeded locally: `npm run build`

### App is slow or timing out

- Check memory/CPU allocation: `az containerapp show -n ca-breede-escape -g rg-breede-escape`
- Increase resources: `az containerapp update -n ca-breede-escape -g rg-breede-escape --cpu 1 --memory 2Gi`
- Review logs for errors

### Environment variables not loading

- Re-update container app: `az containerapp update --name ca-breede-escape ...`
- Ensure `NEXT_PUBLIC_*` prefix for client-side variables
- Ensure server-side Google variables are set: `GOOGLE_SERVICE_ACCOUNT_JSON`, `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID`
- Redeploy image to pick up changes

## Cleanup

To remove all resources:

```bash
az group delete --name rg-breede-escape --yes --no-wait
```

## Further Documentation

- [Azure Container Apps Documentation](https://learn.microsoft.com/en-us/azure/container-apps/)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Azure CLI Reference](https://learn.microsoft.com/en-us/cli/azure/reference-index)
- [GitHub Actions for Azure](https://github.com/Azure/actions)

## Cost Optimization Tips

- Set min replicas to 0 when traffic is low (scale to zero)
- Set appropriate CPU/memory limits to avoid overprovisioning
- Use consumption-based pricing tier where possible
- Regularly review cost management in Azure Portal
