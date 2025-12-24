/**
 * Upload Image Utility
 * Converts image to Base64 data URL for storage
 * No external service required - stores directly in database
 */

const uploadImageToCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    // Validate file
    if (!file) {
      reject(new Error("No file provided"));
      return;
    }

    // Check file size (max 5MB for Base64 storage)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      reject(new Error("File size too large. Maximum 5MB allowed."));
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      reject(new Error("Only image files are allowed."));
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      // Create a response object similar to Cloudinary's response
      // so existing code doesn't break
      resolve({
        url: reader.result, // Base64 data URL
        secure_url: reader.result,
        public_id: `local_${Date.now()}`,
        format: file.type.split("/")[1],
        bytes: file.size,
      });
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    // Read file as Base64 data URL
    reader.readAsDataURL(file);
  });
};

export default uploadImageToCloudinary;
