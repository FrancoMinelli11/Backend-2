import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./backend/src/public/img`)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

export const uploader = multer({ storage: storage })