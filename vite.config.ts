
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), {
        name: 'feedback-api',
        configureServer(server) {
          server.middlewares.use('/api/feedback', (req, res, next) => {
            if (req.method === 'POST') {
              let body = '';
              req.on('data', chunk => {
                body += chunk.toString();
              });
              req.on('end', () => {
                const feedback = JSON.parse(body);
                fs.readFile('feedback.json', 'utf8', (err, data) => {
                  if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.end('Error reading feedback file');
                    return;
                  }
                  const feedbacks = JSON.parse(data);
                  feedbacks.push(feedback);
                  fs.writeFile('feedback.json', JSON.stringify(feedbacks, null, 2), err => {
                    if (err) {
                      console.error(err);
                      res.statusCode = 500;
                      res.end('Error writing feedback file');
                      return;
                    }
                    res.statusCode = 200;
                    res.end('Feedback submitted');
                  });
                });
              });
            } else if (req.method === 'GET') {
              fs.readFile('feedback.json', 'utf8', (err, data) => {
                if (err) {
                  console.error(err);
                  res.statusCode = 500;
                  res.end('Error reading feedback file');
                  return;
                }
                res.setHeader('Content-Type', 'application/json');
                res.end(data);
              });
            } else {
              next();
            }
          });
        }
      }],
      resolve: {
        alias: {
          // FIX: `__dirname` is not available in ES modules.
          // Using `.` allows `path.resolve` to use the current working directory,
          // which correctly points to the project root.
          '@': path.resolve('.'),
        }
      }
    };
});
