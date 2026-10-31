import React, { useRef } from "react";

const FileInput = ({
  fileData,
  setFileData,
  name,
  uploadFile,
  isUploading,
  className=""
}) => {
  const ref = useRef();
  return (
    <>
      <div
        className={`border border-dashed border-gray-500 hover:bg-gray-100 rounded-md flex flex-col items-center justify-center gap-1 p-2 cursor-pointer w-full min-h-52 sm:min-h-64 ${className}`}
        onClick={() => ref.current.click()}
      >
        {fileData?.image && (
          <img
            className="w-1/4 h-40 sm:h-52 md:h-64 object-contain"
            src={fileData.image}
            alt="Preview"
          />
        )}
        <span className="text-md font-semibold text-orange-500">
          {isUploading
            ? "Uploading..."
            : fileData?.image
              ? "Click to Change File"
              : "Click to Upload File"}
        </span>
      </div>

      <input
        ref={ref}
        className="my-auto hidden"
        type="file"
        accept="image/*"
        name={name}
        onChange={async (e) => {
          const formData = new FormData();
          const file = e.target.files[0];
          formData.append("file", file);
          uploadFile(formData).then((res) => {
            setFileData({
              image : res?.data?.imageUrl,
              imagePublicId :res?.data?.publicId
            });
          });
        }}
      />
    </>
  );
};

export default FileInput;
