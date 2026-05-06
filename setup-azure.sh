#!/bin/bash
# Azure Container Apps Setup Script for Breede Escape Web

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Breede Escape - Azure Container Apps Setup${NC}"
echo ""

# Check prerequisites
check_prerequisites() {
    echo -e "${YELLOW}Checking prerequisites...${NC}"
    
    command -v az &> /dev/null || { echo -e "${RED}❌ Azure CLI not found. Please install it first.${NC}"; exit 1; }
    command -v docker &> /dev/null || { echo -e "${RED}❌ Docker not found. Please install it first.${NC}"; exit 1; }
    
    echo -e "${GREEN}✓ Prerequisites checked${NC}\n"
}

# Prompt for user input
prompt_for_config() {
    echo -e "${YELLOW}Please enter the following configuration:${NC}"
    
    read -p "Resource Group Name (default: rg-breede-escape): " RESOURCE_GROUP
    RESOURCE_GROUP=${RESOURCE_GROUP:-rg-breede-escape}
    
    read -p "Location (default: eastus): " LOCATION
    LOCATION=${LOCATION:-eastus}
    
    read -p "Registry Name (must be globally unique, lowercase, no hyphens): " REGISTRY_NAME
    
    read -p "Sanity Project ID: " SANITY_PROJECT_ID
    
    read -p "Sanity Dataset: " SANITY_DATASET
    
    echo ""
    echo -e "${YELLOW}Configuration Summary:${NC}"
    echo "Resource Group: $RESOURCE_GROUP"
    echo "Location: $LOCATION"
    echo "Registry Name: $REGISTRY_NAME"
    echo "Sanity Project ID: $SANITY_PROJECT_ID"
    echo "Sanity Dataset: $SANITY_DATASET"
    echo ""
    
    read -p "Proceed with setup? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Setup cancelled."
        exit 1
    fi
}

# Create Azure resources
create_resources() {
    echo -e "${YELLOW}Creating Azure resources...${NC}"
    
    # Get current subscription
    SUBSCRIPTION_ID=$(az account show --query id -o tsv)
    echo "Using subscription: $SUBSCRIPTION_ID"
    
    # Create resource group
    echo "Creating resource group..."
    az group create \
        --name $RESOURCE_GROUP \
        --location $LOCATION \
        || { echo -e "${RED}Failed to create resource group${NC}"; exit 1; }
    
    # Create container registry
    echo "Creating container registry..."
    az acr create \
        --resource-group $RESOURCE_GROUP \
        --name $REGISTRY_NAME \
        --sku Basic \
        || { echo -e "${RED}Failed to create registry${NC}"; exit 1; }
    
    # Enable admin access
    echo "Enabling registry admin access..."
    az acr update -n $REGISTRY_NAME --admin-enabled true
    
    # Create container environment
    echo "Creating container environment..."
    az containerapp env create \
        --name cae-breede-escape \
        --resource-group $RESOURCE_GROUP \
        --location $LOCATION \
        || { echo -e "${RED}Failed to create environment${NC}"; exit 1; }
    
    # Create container app
    echo "Creating container app..."
    az containerapp create \
        --name ca-breede-escape \
        --resource-group $RESOURCE_GROUP \
        --environment cae-breede-escape \
        --image mcr.microsoft.com/k8se/quickstart:latest \
        --target-port 3000 \
        --ingress external \
        --min-replicas 1 \
        --max-replicas 5 \
        || { echo -e "${RED}Failed to create container app${NC}"; exit 1; }
    
    echo -e "${GREEN}✓ Azure resources created${NC}\n"
}

# Configure environment variables
configure_env_vars() {
    echo -e "${YELLOW}Configuring environment variables...${NC}"
    
    az containerapp update \
        --name ca-breede-escape \
        --resource-group $RESOURCE_GROUP \
        --set-env-vars \
            NEXT_PUBLIC_SANITY_PROJECT_ID=$SANITY_PROJECT_ID \
            NEXT_PUBLIC_SANITY_DATASET=$SANITY_DATASET \
        || { echo -e "${RED}Failed to set env vars${NC}"; exit 1; }
    
    echo -e "${GREEN}✓ Environment variables configured${NC}\n"
}

# Get registry credentials
get_registry_credentials() {
    echo -e "${YELLOW}Retrieving registry credentials...${NC}"
    
    REGISTRY_URL=$(az acr show \
        --name $REGISTRY_NAME \
        --query loginServer \
        -o tsv)
    
    REGISTRY_USERNAME=$(az acr credential show \
        --name $REGISTRY_NAME \
        --query username \
        -o tsv)
    
    REGISTRY_PASSWORD=$(az acr credential show \
        --name $REGISTRY_NAME \
        --query "passwords[0].value" \
        -o tsv)
    
    echo -e "${GREEN}✓ Credentials retrieved${NC}\n"
    
    echo -e "${YELLOW}Save these secrets in GitHub repository (Settings → Secrets and Variables → Actions):${NC}"
    echo ""
    echo "AZURE_REGISTRY_URL=$REGISTRY_URL"
    echo "AZURE_REGISTRY_USERNAME=$REGISTRY_USERNAME"
    echo "AZURE_REGISTRY_PASSWORD=$REGISTRY_PASSWORD"
    echo "AZURE_SUBSCRIPTION_ID=$SUBSCRIPTION_ID"
    echo "AZURE_RESOURCE_GROUP=$RESOURCE_GROUP"
    echo "AZURE_CONTAINER_ENVIRONMENT=cae-breede-escape"
    echo "AZURE_CONTAINER_APP=ca-breede-escape"
    echo ""
}

# Get container URL
get_container_urls() {
    echo -e "${YELLOW}Retrieving container app URL...${NC}"
    
    APP_URL=$(az containerapp show \
        --name ca-breede-escape \
        --resource-group $RESOURCE_GROUP \
        --query properties.configuration.ingress.fqdn \
        -o tsv)
    
    echo -e "${GREEN}✓ Container app created${NC}\n"
    echo "App URL: https://$APP_URL"
    echo ""
    
    echo "Add to GitHub secrets:"
    echo "AZURE_CONTAINER_APP_URL=$APP_URL"
    echo ""
}

# Main execution
main() {
    check_prerequisites
    prompt_for_config
    create_resources
    configure_env_vars
    get_registry_credentials
    get_container_urls
    
    echo -e "${GREEN}✅ Setup complete!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Add the secrets to your GitHub repository"
    echo "2. Push to main branch to deploy"
    echo ""
    echo "For more information, see AZURE_DEPLOYMENT_GUIDE.md"
}

main
