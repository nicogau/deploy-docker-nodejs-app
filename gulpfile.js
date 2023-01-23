import gulp from "gulp"
import gulpCopy from "gulp-copy"
import {deleteAsync} from "del"

const sourceFiles=['./front/dist/**/*']
const publicJsFolder =  'public/js/'

// clean publicJsFolder
const cleanDist = async () => deleteAsync(publicJsFolder)
// copy front/dist/* to  ./public/js
const copyDist = () => gulp.src(sourceFiles).pipe(gulpCopy(publicJsFolder, {prefix: 2}))
// execute cleanDist  and copyDist
const copyDistTask =  gulp.series(cleanDist, copyDist)
 
export  {copyDistTask}


