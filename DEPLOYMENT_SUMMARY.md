# Deployment Setup Summary

This document summarizes the Azure Container Apps deployment setup for Breede Escape.

## What Was Created

### 1. **Dockerfile** (`Dockerfile`)
- Multi-stage Docker build for optimal image size
- Node.js 20 Alpine Linux (minimal security surface)
- Development dependencies excluded from production image
- Built-in health checks
- Optimized for Azure Container Apps

### 2. **.dockerignore** (`.dockerignore`)
- Excludes unnecessary files from Docker build context
- Reduces image size and build time
- Excludes node_modules, docs, tests, etc.

### 3. **GitHub Actions Workflow** (`.github/workflows/deploy-to-azure-container-apps.yml`)
- **Trigger**: Push to `main` → Production | PR → Staging
- **Build**: Builds Docker image and pushes to Azure Container Registry
- **Deploy**: Automatically deploys to Azure Container Apps
- **Staging**: For testing on PRs
- **Production**: For main branch releases

### 4. **Docker Compose** (`docker-compose.yml`)
- Local development and testing
- Resource limits matching Azure configuration
- Health checks enabled
- Environment variable pass-through

### 5. **Setup Script** (`setup-azure.sh`)
- Automated Azure resource provisioning
- Creates Container Apps, Registry, Environment
- Configures environment variables
- Displays required GitHub secrets

### 6. **Deployment Guides**
- `AZURE_DEPLOYMENT_GUIDE.md` - Complete setup instructions
- `DOCKER_GUIDE.md` - Local Docker usage and troubleshooting
- `.env.example` - Environment variable template

## Quick Start

### Step 1: Set Up Azure Resources
```bash
chmod +x setup-azure.sh
./setup-azure.sh
```

This will:
- Create Resource Group
- Create Container Registry
- Create Container App Environment
- Create Staging & Production Container Apps
- Configure environment variables
- Display GitHub secrets to add

### Step 2: Add GitHub Secrets
Copy the displayed secrets to your GitHub repository:
- Settings → Secrets and Variables → Actions
- Add all `AZURE_*` secrets

### Step 3: Test Locally (Optional)
```bash
docker-compose up --build
# Visit http://localhost:3000
```

### Step 4: Deploy
- **Staging**: Create a PR (merges to any branch)
- **Production**: Push to `main` branch

## Deployment Flow

```
┌─────────────────────────────────────────────────────┐
│            GitHub Repository                         │
│  (main branch / Pull Request)                        │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│        GitHub Actions Workflow                       │
│  (Build Docker Image)                                │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│    Azure Container Registry                          │
│  (Push Image)                                        │
└──────────────────┬──────────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
   ┌─────────────┐      ┌──────────────┐
   │  Staging    │      │ Production   │
   │  Container  │      │ Container    │
   │  App        │      │ App          │
   └─────────────┘      └──────────────┘
```

## Architecture

```
Networking:
  Container Apps Environment (Virtual Network)
    ├── Staging Container (2 cores, 2GB RAM)
    ├── Production Container (varies with load)
    └── Auto-scaling based on traffic

Registry:
  Azure Container Registry
    ├── Private image storage
    ├── Image versioning
    └── Automatic cleanup policies

Monitoring:
  Azure Monitor
    ├── Container logs
    ├── Performance metrics
    ├── Auto-scaling rules
    └── Alerts
```

## Environment Variables

All `NEXT_PUBLIC_*` variables are client-side (visible in frontend):
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`

Set these in Azure Container Apps via the deployment guide.

## Scaling Configuration

### Staging
- **Min replicas**: 1
- **Max replicas**: 3
- **Resources**: 0.5 CPU, 512MB RAM

### Production
- **Min replicas**: 2
- **Max replicas**: 5
- **Resources**: 1 CPU, 1GB RAM (scalable)

Adjust based on your traffic patterns.

## Cost Estimation

### Monthly Costs (Approximate)
- **Container Registry**: $10 (Basic tier)
- **Container Apps**: $0.10/vCPU/hour + storage
  - Staging (1 replica): ~$36/month
  - Production (2-5 replicas): ~$72-180/month
- **Ingress (Public)**: Included
- **Total**: ~$120-230/month

See Azure Pricing Calculator for exact estimates.

## Monitoring & Observability

### View Logs
```bash
az containerapp logs show --name ca-breede-escape-prod --resource-group rg-breede-escape --follow
```

### Monitor Performance
```bash
az monitor metrics list \
  --resource <resource-id> \
  --metric Requests,ProcessorCount,MemoryUsage
```

### Set Up Alerts
- High error rates
- High latency
- Resource exhaustion
- Deployment failures

## Security

- **Private Registry**: Azure Container Registry (private)
- **Network Isolation**: Virtual Network integration
- **Credentials**: Managed in GitHub Secrets (encrypted)
- **Image Signing**: Optional (enable in registry)

## CI/CD Capabilities

Current workflow supports:
- Automatic image building
- Automated testing (add to workflow)
- Staging/Production separation
- Rollback (manual via Azure Portal)
- Health checks & auto-restart

### Adding Tests
Add to workflow before deployment:
```yaml
- name: Run Tests
  run: npm test
```

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Image won't pull | Check registry credentials in GitHub secrets |
| App won't start | Review logs: `az containerapp logs show ...` |
| Slow performance | Increase CPU/memory limits |
| Build fails | Check `npm run build` locally |
| Env vars not loading | Verify `NEXT_PUBLIC_*` prefix, redeploy |

See `AZURE_DEPLOYMENT_GUIDE.md` for detailed troubleshooting.

## Next Steps

1. ✅ Run `setup-azure.sh` to provision resources
2. ✅ Add GitHub secrets to repository
3. ✅ Test locally with `docker-compose up`
4. ✅ Create a PR to test staging deployment
5. ✅ Merge to main for production deployment
6. ✅ Monitor with Azure Portal & CLI

## Additional Resources

- [Azure Container Apps Docs](https://learn.microsoft.com/en-us/azure/container-apps/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## Support

For issues or improvements:
1. Check the deployment guides
2. Review logs with `az containerapp logs show`
3. Verify all GitHub secrets are configured
4. Ensure environment variables are set correctly

---

**Setup completed**: All deployment infrastructure is ready. Next action: Run `setup-azure.sh`
