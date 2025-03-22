import fs from 'fs';
import { google } from 'googleapis';

async function authenticate() {
  try {
    const keyFile = './google-key.json';
    const auth = new google.auth.GoogleAuth({
      keyFile,
      scopes: [
        'https://www.googleapis.com/auth/presentations',
        'https://www.googleapis.com/auth/drive'
      ]
    });
    
    const authClient = await auth.getClient();
    console.log('Authentication successful');
    return authClient;
  } catch (error) {
    console.error('Authentication failed:', error.message);
    throw error;
  }
}

async function createPresentation(authClient) {
  try {
    const slides = google.slides({ version: 'v1', auth: authClient });
    
    const presentation = await slides.presentations.create({
      requestBody: {
        title: 'Generated Presentation'
      }
    });
    
    const presentationId = presentation.data.presentationId;
    console.log(`Presentation created with ID: ${presentationId}`);
    
    await slides.presentations.batchUpdate({
      presentationId: presentationId,
      requestBody: {
        requests: [
          {
            createSlide: {
              objectId: 'slide2',
              insertionIndex: 1,
              slideLayoutReference: {
                predefinedLayout: 'BLANK'
              }
            }
          }
        ]
      }
    });
    
    console.log('Additional slide added');
    return presentationId;
  } catch (error) {
    console.error('Failed to create presentation:', error.message);
    throw error;
  }
}

async function exportAsPdf(authClient, presentationId) {
  try {
    const drive = google.drive({ version: 'v3', auth: authClient });
    
    const response = await drive.files.export({
      fileId: presentationId,
      mimeType: 'application/pdf'
    }, {
      responseType: 'stream'
    });
    
    const pdfDir = './pdfs';
    if (!fs.existsSync(pdfDir)) {
      fs.mkdirSync(pdfDir, { recursive: true });
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const outputPath = `${pdfDir}/presentation-${timestamp}.pdf`;
    const writer = fs.createWriteStream(outputPath);
    
    return new Promise((resolve, reject) => {
      response.data
        .on('error', err => {
          reject(err);
        })
        .pipe(writer)
        .on('finish', () => {
          console.log(`PDF exported successfully to ${outputPath}`);
          resolve(outputPath);
        })
        .on('error', err => {
          reject(err);
        });
    });
  } catch (error) {
    console.error('Failed to export PDF:', error.message);
    throw error;
  }
}

export async function createAndExportPresentation() {
  try {
    const authClient = await authenticate();
    const presentationId = await createPresentation(authClient);
    
    const pdfPath = await exportAsPdf(authClient, presentationId);
    
    console.log(`Complete process finished. PDF available at: ${pdfPath}`);
    return pdfPath;
  } catch (error) {
    console.error('Process failed:', error.message);
    throw error;
  }
}