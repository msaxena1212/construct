const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const baseUploadDir = path.join(__dirname, '../../static/uploads');
const projectUploadDir = path.join(baseUploadDir, 'projects');
const avatarUploadDir = path.join(baseUploadDir, 'avatars');

[projectUploadDir, avatarUploadDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dest = projectUploadDir;
    if (file.fieldname === 'avatar') {
      dest = avatarUploadDir;
    }
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ['.pdf', '.dwg', '.png', '.jpg', '.jpeg'];
//   const ext = path.extname(file.originalname).toLowerCase();
  
//   if (allowedTypes.includes(ext)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Invalid file type. Only PDF, DWG, PNG, JPG are allowed.'), false);
//   }
// };


const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    '.pdf',
    '.dwg',
    '.dxf',
    '.png',
    '.jpg',
    '.jpeg',
    '.jfif',
    '.gif',
    '.bmp',
    '.webp',
    '.svg',
    '.tiff',
    '.tif',
    '.heic',
    '.heif'
  ];

  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        'Invalid file type. Allowed types: PDF, DWG, DXF, PNG, JPG, JPEG, JFIF, GIF, BMP, WEBP, SVG, TIFF, HEIC.'
      ),
      false
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

module.exports = upload;
