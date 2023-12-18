class TokenManager {
    private tokens: Map<number, string>;
    private sessionTokens: Map<string, number>;

    constructor() {
        this.tokens = new Map();
        this.sessionTokens = new Map();
    }

    setToken(userId: number, token: string): void {
        this.tokens.set(userId, token);
    }

    getToken(userId: number): string | undefined {
        return this.tokens.get(userId);
    }

    setSessionToken(sessionToken: string, userId: number): void {
        this.sessionTokens.set(sessionToken, userId);
    }

    getUserIdFromSessionToken(sessionToken: string): number | undefined {
        return this.sessionTokens.get(sessionToken);
    }

    generateToken(){
       return Date.now().toString(36) + Math.random().toString(36);
    }
}
export const tokenManager = new TokenManager();