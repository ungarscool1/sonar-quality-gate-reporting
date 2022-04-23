export interface GithubInstallationAccessToken {
    token: string;
    expires_at: string;
    permissions: {
        [key: string]: string;
    };
    repository_selection: string;
}