//IMPORTANT -- PRODUCTION GRADE PRACTICE--


const conf = {
    appWriteUrl : "https://cloud.appwrite.io/v1",
    appWriteProjectId : import.meta.env.VITE_APPWRITE_PROJECT_ID,
    appWriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appWriteCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appWriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    openAiKey : String(import.meta.env.VITE_OPENAI_API_KEY ),
    tinyMCEApiKey : String(import.meta.env.VITE_TINYMCE_API_KEY)
    }


//console.log(conf);

export default conf