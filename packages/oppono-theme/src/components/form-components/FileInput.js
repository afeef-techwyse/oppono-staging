import React from "react";
import { styled } from "frontity";
import PropTypes from "prop-types";
import classnames from "classnames";
import gsap from "gsap";
import axios from "axios";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import useCombinedRefs from "../../hooks/useCombinedRefs";
import { size } from "../../functions/size";
import { humanFileSize } from "../../functions/humanFileSize";

gsap.registerPlugin(ScrollToPlugin);

const UploadedFileState = styled(
    ({ className, file, name, removeFile = () => { } }) => {
        const [progress, setProgress] = React.useState(0);
        const [success, setSuccess] = React.useState(false);
        const [error, setError] = React.useState(false);
        const cancelToken = React.useRef(axios.CancelToken.source());
        const [base64, setBase64] = React.useState("");

        React.useEffect(() => {

            return; //fixme use this when uploading to the site
            let url = "YOUR URL HERE";
            let formData = new FormData();

            formData.append("file", file);

            axios
                .post(url, formData, {
                    cancelToken: cancelToken.current.token,
                })
                .then(() => setSuccess(true))
                .catch(() => setError(true));
        }, []);

        React.useEffect(() => {
            const tween = gsap.to(
                { x: 0 },
                {
                    x: 100,
                    onUpdate() {
                        setProgress(this.progress());
                    },
                    onComplete() {
                        setSuccess(true);
                    },
                    duration: 30,
                }
            );

            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                setBase64(reader.result);

                tween.paused(true);
                gsap.to(tween, { progress: 1, duration: 1, ease: "linear" });
            };
            reader.onerror = function (error) {
                setError(true);

            };

            return () => {
                tween.kill();
                reader.onload = null;
                reader.onerror = null;
            };
        }, []);

        const removeFileCallback = () => {
            // cancelToken.current.cancel() //fixme to delete uploading the file
            removeFile();
        };

        return (
            <div
                className={classnames(className, { success, error })}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
            >
                <input type="text" name={name} required value={base64} />
                <input
                    type="hidden"
                    name={"appraisal_report_filename"}
                    required
                    value={file.name}
                />
                <div className="progress" style={{ width: progress * 100 + "%" }} />
                <div className="file-name">{file.name}</div>
                <div className="file-size">{humanFileSize(file.size)}</div>
                <div className="delete" onClick={removeFileCallback}>
                    <svg viewBox="0 0 9 8">
                        <path
                            fill="none"
                            stroke="#1b1b26"
                            d="M8.657 7.657L1 0M1 7.657L8.657 0"
                        />
                    </svg>
                </div>
            </div>
        );
    }
)`
  color: #fff;
  width: 100%;
  height: ${size(26)};
  position: relative;
  background-color: ${({ progressContainerColor }) =>
        progressContainerColor || "#bfb6b4"};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${size(7)} ${size(10)};
  cursor: auto;
  border-radius: ${size(2)};
  overflow: hidden;
  margin-top: ${size(8)};
  margin-bottom: ${size(8)};

  .progress {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    background-color: ${({ progressColor }) => progressColor || "#36808b"};
  }

  &.success .progress {
    background-color: ${({ successColor }) => successColor || "#36808b"};
  }

  &.error .progress {
    background-color: ${({ errorColor }) => errorColor || "#f14c34"};
  }

  .file-name {
    z-index: 1;
    color: #1b1b26;
    font-size: ${size(12)};
    font-weight: 400;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .file-size {
    z-index: 1;
    color: rgba(27, 27, 38, 0.5);
    font-size: ${size(10)};
    font-weight: 400;
    text-align: left;
    margin-right: ${size(8)};
    margin-left: ${size(3)};
    flex-shrink: 0;
  }

  .delete {
    z-index: 1;
    margin-left: auto;
    width: ${size(9)};
    height: ${size(8)};
    cursor: pointer;
    position: relative;
    flex-shrink: 0;

    svg {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

    &:after {
      content: "";
      position: absolute;
      width: calc(100% + ${size(16)});
      height: calc(100% + ${size(16)});
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const FileInput = React.forwardRef(
    (
        {
            className,
            required,
            readOnly,
            disabled,
            label,
            accept = "application/pdf,image/*",
            acceptRegex = /^application\/pdf$|^image\/.*$/i,
            acceptText = "PDF, JPG, or PNG",
            multiple,
            name,
        },
        forwardedRef
    ) => {
        const innerRef = React.useRef(null);
        const combinedRef = useCombinedRefs(forwardedRef, innerRef);
        const [highlight, setHighlight] = React.useState(false);
        const [focused, setFocused] = React.useState(false);
        const [files, setFiles] = React.useState([]);

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        function handleFiles(newFiles) {
            // merge old and new files without duplicates
            multiple
                ? setFiles((prevState) => [
                    ...prevState,
                    ...[...newFiles].filter(
                        (file) =>
                            file.type.match(acceptRegex) &&
                            !~prevState.findIndex((i) => i.name === file.name)
                    ),
                ])
                : setFiles([newFiles[0]]);
        }

        return (
            <div
                ref={combinedRef}
                className={classnames("drop-area", "form-group", className, {
                    highlight,
                    focused,
                })}
                onDragEnter={(event) => {
                    preventDefaults(event);
                    setHighlight(true);
                }}
                onDragLeave={(event) => {
                    preventDefaults(event);
                    setHighlight(false);
                }}
                onDragOver={(event) => {
                    preventDefaults(event);
                    setHighlight(true);
                }}
                onDrop={(event) => {
                    preventDefaults(event);
                    setHighlight(false);
                    handleFiles(event.dataTransfer.files);
                }}
            >
                <label>
                    <div className="left-content">
                        <div className="label-text">{label}</div>
                        <div className="accept-text">{acceptText}</div>
                        {files.map((file, index) => (
                            <UploadedFileState
                                name={name}
                                key={file.name}
                                file={file}
                                removeFile={() => {
                                    setFiles((prevState) => {
                                        //fixme remove from server too by API delete request
                                        const newList = [...prevState];
                                        newList.splice(index, 1);
                                        return newList;
                                    });
                                }}
                            />
                        ))}
                    </div>
                    <div className="add-icon">
                        <svg width="50" height="50" viewBox="0 0 72 72">
                            <path
                                fill="none"
                                stroke="#36808b"
                                strokeMiterlimit="20"
                                d="M36 49.714V22.286M22.29 36h27.42"
                            />
                            <path
                                fill="none"
                                stroke="#bfb6b4"
                                strokeMiterlimit="20"
                                strokeOpacity=".2"
                                d="M.5 36C.5 16.394 16.394.5 36 .5S71.5 16.394 71.5 36 55.606 71.5 36 71.5.5 55.606.5 36z"
                            />
                        </svg>
                    </div>
                    <input
                        type={"file"}
                        multiple={multiple}
                        accept={accept}
                        required={required}
                        readOnly={readOnly}
                        disabled={disabled}
                        onFocus={() => {
                            gsap.to(window, {
                                duration: 0.5,
                                scrollTo: {
                                    y: combinedRef.current,
                                    offsetY:
                                        window.innerWidth < 768
                                            ? 200
                                            : (window.innerHeight -
                                                combinedRef.current.getBoundingClientRect().height) /
                                            2,
                                },
                            });
                            setFocused(true);
                        }}
                        onBlur={() => {
                            setFocused(false);
                        }}
                        onChange={({ target }) => handleFiles(target.files)}
                    />
                </label>
            </div>
        );
    }
);

FileInput.propTypes = {
    label: PropTypes.node,
    className: PropTypes.string,
    required: PropTypes.bool,
    readOnly: PropTypes.bool,
    multiple: PropTypes.bool,
    disabled: PropTypes.bool,
    accept: PropTypes.string,
    acceptText: PropTypes.string,
};

export default styled(FileInput)`
  position: relative;
  border-radius: 2px;
  background-color: rgb(27, 27, 38, 0.59);
  border: 2px dashed rgba(41, 127, 255, 0.59);
  transition: border-color 400ms;
  padding: ${size(10)} ${size(18)};

  &:after {
    content: "";
    width: 150%;
    height: 150%;
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: transparent;
    transform: translate(-50%, -50%);
    z-index: -1;
  }

  &.focused {
    border-color: rgb(41, 127, 255);
  }

  &.highlight {
    &:before {
      pointer-events: none;
      content: "Drop To Upload";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
      background-color: #fff;
      opacity: 0.8;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: ${size(22)};
    }
  }

  label {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .label-text {
      color: #bfb6b4;
      font-size: ${size(16)};
      font-weight: 400;
      text-align: left;
      margin-bottom: ${size(7)};
    }

    .accept-text {
      color: rgba(191, 182, 180, 0.5);
      font-size: ${size(12)};
      font-weight: 400;
      text-align: left;
      margin-bottom: ${size(7)};
    }

    .left-content {
      flex: 1 1 auto;
    }
  }

  input {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
  }

  .add-icon {
    flex: 0 0 auto;
    margin-left: ${size(10)};
  }
`;
