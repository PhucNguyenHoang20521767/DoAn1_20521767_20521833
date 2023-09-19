import { RcFile, UploadFile } from "antd/es/upload";

//function to check if the text is a number
export function matchIsNumeric(text: string) {
  const isNumber = typeof text === "number";
  const isString = matchIsString(text);
  return (isNumber || (isString && text !== "")) && !isNaN(Number(text));
}

//function to check if the text is a string
export function matchIsString(text: any): boolean {
  return typeof text === "string" || text instanceof String;
}

//random number
export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const uploadFileToBlob = (uploadFile: UploadFile): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const file = new File([reader.result as ArrayBuffer], uploadFile.name, {
        type: uploadFile.type,
        lastModified: uploadFile.lastModified,
      });
      resolve(file);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(uploadFile.originFileObj as Blob);
  });
};
