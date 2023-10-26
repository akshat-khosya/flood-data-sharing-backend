import env from "dotenv";

class Config {
  _config: Record<string, any>;
  constructor() {
    env.config();
    this._config = {
      port: process.env.PORT || 8080,
      dbUrl: process.env.DB_URL || "",
      googleId: process.env.ID || "",
      googleSecret: process.env.SECRET || "",
      refreshToken: process.env.REFRESH_TOKEN || "",
      email: process.env.EMAIL || "",
      saltWorkFactor: 10,
      privateKey: process.env.PRIVATE_KEY || "",
      accessTokenTtl: "1d",
    };
  }

  get(key: string): any {
    const val: any = this._config[key] ?? null;

    if (!val) {
      throw new Error(`Config for key [${key}] not found`);
    }

    return val;
  }
  set(key: string, val: any): void {
    this._config[key] = val;
  }
}

const config = new Config();

export default config;
