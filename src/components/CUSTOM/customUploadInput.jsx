import { Audiotrack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import { Small } from "components/Typography";
import React from "react";
// ------------------------------------------------------------------
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  listAll,
} from "firebase/storage";
// ------------------------------------------------------------------
const ImageUploadInput = ({ accept }) => {
  async function uploadToStorage(event) {
    const file = event.target.files[0];
    const storageRef = ref(storage, file.name);

    const metadata = {
      contentType: file.type,
    };

    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            alert("unauthorized");
            break;
          case "storage/canceled":
            // User canceled the upload
            alert("canceled");
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            alert("storage unknown");
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          console.log(uploadTask.snapshot.ref);
        });
      }
    );
  }

  return (
    <label htmlFor="icon-button-file">
      <input
        type="file"
        accept={accept}
        id="icon-button-file"
        style={{
          display: "none",
        }}
        onChange={uploadToStorage}
      />

      <IconButton
        disableRipple
        component="span"
        sx={{
          padding: 0,
          display: "block",
        }}
      >
        <FlexRowAlign
          gap={0.5}
          sx={{
            minHeight: 40,
            borderRadius: "8px",
            backgroundColor: "divider",
          }}
        >
          <Audiotrack
            sx={{
              fontSize: 18,
              color: "text.disabled",
            }}
          />
          <Small color="text.disabled">Choose a file</Small>
        </FlexRowAlign>
      </IconButton>
    </label>
  );
};

export default ImageUploadInput;
