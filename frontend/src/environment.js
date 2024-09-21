let IS_PROD = true;
const server = IS_PROD ?
    "https://video-calling-mu.vercel.app/":"http://localhost:8000";


export default server;