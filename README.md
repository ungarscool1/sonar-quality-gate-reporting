# Community SonarQube Quality Gate Report

This action comments your pull request with a message based on the quality gate status.

## Environment

- **SONAR_ID**: SonarQube project ID
- **SONAR_TOKEN**: SonarQube project token
- **SONAR_URL**: SonarQube server URL
- **GITHUB_REF**: GitHub ref (pull request number)
- **GITHUB_REPOSITORY**: GitHub repository
- **APP_ID**: GitHub app ID
- **APP_KEY**: GitHub app private key
- **INSTALLATION**: GitHub app installation ID

:warning: all environment variables are required !
The ``GITHUB_x`` variables are set by default by GitHub.

## Outputs

A comment is posted on the pull request.

## Example usage

```yaml
uses: ungarscool1/sonar-quality-gate-reporting@v1
env:
  SONAR_ID: my-project-key
  SONAR_TOKEN: my-token
  SONAR_URL: https://my-sonarqube-server.com
  APP_ID: my-app-id
  APP_KEY: my-app-key
  INSTALLATION: my-installation-id
```