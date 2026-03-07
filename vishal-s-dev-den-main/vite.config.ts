import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import http from 'http';
import https from 'https';

const codolioProxyPlugin = () => ({
  name: 'codolio-proxy',
  configureServer(server: any) {
    server.middlewares.use('/api/codolio', (req: http.IncomingMessage, res: http.ServerResponse) => {

      const fetchAPI = (url: string) => {
        https.get(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        }, (response) => {
          if ([301, 302, 307, 308].includes(response.statusCode as number)) {
            const redirectUrl = response.headers.location;
            if (redirectUrl) {
              return fetchAPI(redirectUrl);
            }
          }

          let data = '';
          response.on('data', (chunk) => { data += chunk; });
          response.on('end', () => {
            try {
              const json = JSON.parse(data);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, payload: json }));
            } catch (e: any) {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: 'Failed to parse JSON', details: e.message }));
            }
          });
        }).on('error', (e) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, error: e.message }));
        });
      };

      fetchAPI('https://api.codolio.com/profile?userKey=V_Patel');
    });
  }
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger(), codolioProxyPlugin()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
