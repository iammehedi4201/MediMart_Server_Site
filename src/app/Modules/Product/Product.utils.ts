import { v4 as uuidv4 } from 'uuid';

const generateShoeId = async (brand: string, model: string, color: string) => {
  // Convert brand, model, and color to uppercase and extract the first few characters
  const brandInitials = brand.substring(0, 3).toUpperCase();
  const modelCode = model.substring(0, 2).toUpperCase();
  const colorCode = color.substring(0, 3).toUpperCase();

  // Generate a random string
  const randomString = uuidv4().substring(0, 4).toUpperCase();

  // Combine the components to create the unique ID
  const shoeId = `${brandInitials + modelCode + colorCode}-${randomString}`;

  return shoeId;
};

export default generateShoeId;
