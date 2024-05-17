// get fs object
const fs = require("fs");

const buffer = new Buffer.alloc(1024);

// // open file
// // synchronous -> Returns an integer representing the file descriptor.
// try {
//     const file = fs.openSync("./data/input.txt", "r"); // open file input.txt
//     console.log(file); // 26
// } catch (e) {
//     console.log(e);
// }
// // asynchronous
// fs.open("./data/input.txt", "r", function (err, file) {
//     if (err) throw err;
//     console.log(file); // 31 : an integer representing the file descriptor
// });
// // using a flag -> if file is not exist then create a new file
// fs.open("./data/input2.txt", "a", function (err, file) {
//     if (err) throw err;
//     console.log(file); // 31 : an integer representing the file descriptor
// });

// // using w flag -> if file is not exist then create a new file, or file is exist then remove file content
// // fs.open("./data/input.txt", "w", function (err, file) {
// //     if (err) throw err;
// //     console.log(file); // 31 : an integer representing the file descriptor
// // });

// // Read file
// // synchronous
// // without option
// console.log(fs.readFileSync("./data/input.txt")); // <Buffer 57 65 6c 63 6f 6d 65 20 4e 6f 64 65 4a 73>

// // with option
// console.log(
//     fs.readFileSync("./data/input.txt", { encoding: "utf8", flag: "r" })
// ); // Welcome NodeJs

// asynchronous

// readFile()
// fs.readFile('./data/input.txt', 'utf8', function(err, data){
//     // Display the file content
//     console.log(data); // Welcome NodeJs
// });

// // without encoding
// fs.readFile('./data/input.txt', (err, data) => {
//     console.log(data); // <Buffer 57 65 6c 63 6f 6d 65 20 4e 6f 64 65 4a 73>
//  })

// read()
// fs.open("./data/input.txt", "r", function (error, fd) {
//     fs.read(fd, buffer, 0, buffer.length,
//         null, function (error, bytesRead, buffer) {
//             var data = buffer.toString("utf8");
//             console.log(data); // Welcome NodeJs
//         });
// });

// Write file
//synchronous

// let data = "Tran Vu Hoang Son";
// fs.writeFileSync("./data/input.txt", data);
// console.log(fs.readFileSync("./data/input.txt", "utf8")); // Tran Vu Hoang Son

// let data = "\nNodeJs internship at LizAI";
// fs.writeFileSync("./data/input.txt", data, {
//     encoding: "utf8",
//     flag: "a+",
// });
// console.log(fs.readFileSync("./data/input.txt", "utf8"));

// // Tran Vu Hoang Son
// // NodeJs internship at LizAI

// asynchronous
// using a flag to create a new file
// let data = "Learn Core Modules in NodeJS";
// fs.writeFile(
//     "./data/core-modules.txt",
//     data,
//     {
//         encoding: "utf8",
//         flag: "a+",
//     },
//     (err) => {
//         if (err) console.log(err);
//         else {
//             console.log(fs.readFileSync("./data/core-modules.txt", "utf8")); // Learn Core Modules in NodeJS
//         }
//     }
// );

// append file
// synchronous
// appendFileSync()
// console.log(fs.readFileSync("./data/core-modules.txt", "utf8")); // Learn Core Modules in NodeJS

// fs.appendFileSync("./data/core-modules.txt", " - Do exercises");
// console.log(fs.readFileSync("./data/core-modules.txt", "utf8")); // Learn Core Modules in NodeJS - Do exercises

// asynchronous
// console.log(fs.readFileSync("./data/core-modules.txt", "utf8")); // Learn Core Modules in NodeJS - Do exercises

// fs.appendFile("./data/core-modules.txt", " - Take a report", (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         // Get the file contents after the append operation
//         console.log(fs.readFileSync("./data/core-modules.txt", "utf8")); // Learn Core Modules in NodeJS - Do exercises - Take a report
//     }
// });

// closing file

// synchronous
// try {
//     // open file to reaad
//     const fd = fs.openSync("./data/core-modules.txt", "r");

//     // read file
//     let bytesRead = fs.readSync(fd, buffer, 0, buffer.length, 0);
//     console.log(buffer.toString("utf8", 0, bytesRead));
//     // Learn Core Modules in NodeJS - Do exercises - Take a report

//     // close file
//     fs.closeSync(fd);
//     console.log("File descriptor is closed");

//     // try to read file after closing
//     bytesRead = fs.readSync(fd, buffer, 0, buffer.length, 0); // Error
//     console.log("read again : ", buffer.toString("utf8", 0, bytesRead));
// } catch (err) {
//     console.error(err.message);
// }
// // EBADF: bad file descriptor, read

// asynchronous
// close( fd, callback )

// try {
//     // open file to reaad
//     const fd = fs.openSync("./data/core-modules.txt", "r");

//     // read file
//     let bytesRead = fs.readSync(fd, buffer, 0, buffer.length, 0);
//     console.log(buffer.toString("utf8", 0, bytesRead));
//     // Learn Core Modules in NodeJS - Do exercises - Take a report

//     // close file
//     fs.close(fd, (error) => {
//         try {
//             // try to read file after closing
//             bytesRead = fs.readSync(fd, buffer, 0, buffer.length, 0); // Error
//             console.log("read again : ", buffer.toString("utf8", 0, bytesRead));
//         } catch (error) {
//             console.log(error);
//         }
//     });
// } catch (err) {
//     console.error(err.message);
// }
// // EBADF: bad file descriptor, read

// Delete a file
//synchronous
// fs.unlinkSync("./data/input2.txt"); // inout.txt was deleted

// console.log(
//   fs.readFileSync('./data/core-modules.txt', 'utf8')
// );
// fs.symlinkSync(__dirname + "/data/core-modules.txt",
//                "symlinkToCore", 'file');
// console.log(
//   fs.readFileSync('symlinkToCore', 'utf8')
// );

// fs.unlinkSync("symlinkToCore");

// console.log(
//     fs.readFileSync('symlinkToCore', 'utf8')
// );  // Error: ENOENT: no such file or directory, open 'symlinkToCore'

// asynchronous
// fs.unlink("./data/introduce.md", (err) => {
//     if (err) console.log(err);
//     else {
//         console.log("\nDeleted file");
//         // Deleted file
//     }
// });

// check exist file
// using exists
// fs.exists("./data/core-modules.txt", (exists) => {
//     console.log(exists); // true
// });
// fs.exists("./data/core-modules.pdf", (exists) => {
//     console.log(exists); // false
// });

// mkdir
// create a folder
// fs.mkdir("test", (err) => {
//     if (err) {
//         return console.error(err);
//     }
//     console.log("test Directory created successfully!");
// });
// // test Directory created successfully!

// readdir

// fs.readdir(__dirname, (err, files) => {
//     if (err) console.log(err);
//     else {
//         files.forEach((file) => {
//             console.log(file);
//         });
//     }
// });
// // data
// // fs.js
// // test

// rmdir
// to remove a directory

// fs.rmdir("test", (error) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Directories Deleted!");
//     }
// });

// fs.rmdir("pop", (error) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Directories Deleted!");
//     }
// });
// // [Error: ENOTEMPTY: directory not empty, rmdir 'pop']
// // because pop have an element inside

// fs.rmdir("pop", { recursive: true }, (error) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Directories Deleted!");
//     }
// });

// copy file

// fs.copyFile("new.txt", "copied_file.txt", (err) => {
//     if (err) {
//         console.log("Error Found:", err);
//     } else {
//         // after the function
//         console.log(fs.readFileSync("copied_file.txt", "utf8"));
//     }
// });

// rename file

// fs.rename("copied_file.txt", "new_copied.txt", () => {
//     console.log("\nFile Renamed!\n");
// });

// stat

// Getting information for a file
// fs.stat("new.txt", (error, stats) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log(stats);

//         // Using methods of the Stats object
//         console.log(stats.isFile());
//         console.log(stats.isDirectory());
//     }
// });
// Stats {
//     dev: 2080,
//     mode: 33188,
//     nlink: 1,
//     uid: 1000,
//     gid: 1000,
//     rdev: 0,
//     blksize: 4096,
//     ino: 151867,
//     size: 11,
//     blocks: 8,
//     atimeMs: 1715766593951.4294,
//     mtimeMs: 1715766593931.4294,
//     ctimeMs: 1715766593931.4294,
//     birthtimeMs: 1715766575351.4326,
//     atime: 2024-05-15T09:49:53.951Z,
//     mtime: 2024-05-15T09:49:53.931Z,
//     ctime: 2024-05-15T09:49:53.931Z,
//     birthtime: 2024-05-15T09:49:35.351Z
//   }
//   true
//  false

// symlink
// fs.symlink("new.txt", "symlinkToNew", "file", (err) => {
//     if (err) console.log(err);
//     else {
//         console.log(fs.readFileSync("symlinkToNew", "utf8"));
//         // this is new
//     }
// });

// truncate

fs.open("new.txt", "r+", function (err, fd) {
    if (err) {
        return console.error(err);
    }
    // Truncating the file
    fs.truncate("new.txt", 4, function (err) {
        if (err) {
            console.log(err);
        }
        // Content after truncating

        fs.read(fd, buffer, 0, buffer.length, 0, function (err, bytes) {
            if (err) {
                console.log(err);
            }
            // Print only read bytes to avoid junk.
            console.log(bytes); // 4
            if (bytes > 0) {
                console.log(buffer.slice(0, bytes).toString()); // this
            }
        });
    });
});
