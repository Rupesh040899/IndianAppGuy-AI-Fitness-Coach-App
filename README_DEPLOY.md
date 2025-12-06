# Deployment instructions

## Vercel (recommended)
1. Create a Vercel account and a new project.
2. Connect your GitHub repo to Vercel (or push this repo and import).
3. Add the following environment variables in Vercel dashboard:
   - OPENAI_API_KEY
   - ELEVENLABS_API_KEY (optional)
   - IMAGE_API_KEY (optional)
4. Vercel will automatically build and deploy on push to `main`.

### GitHub Actions → Vercel (optional)
If you prefer to deploy from GitHub Actions, add these secrets to your repo:
 - VERCEL_TOKEN
 - VERCEL_ORG_ID
 - VERCEL_PROJECT_ID

Then enable the provided workflow `.github/workflows/deploy-to-vercel.yml`.

## Docker
Build:
```
docker build -t ai-fitness-coach .
docker run -e OPENAI_API_KEY=$OPENAI_API_KEY -p 3000:3000 ai-fitness-coach
```

## Notes
- Do not commit secrets into the repo.
- Replace API stubs in `app/api/*` with real provider integrations before production.
