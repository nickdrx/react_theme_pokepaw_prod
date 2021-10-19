import useImage from 'use-image';
import { Image, Text } from 'react-konva';
import { Accordion, AccordionDetails, AccordionSummary, Backdrop, Button, Dialog, DialogActions, DialogContentText, DialogTitle, IconButton, LinearProgress, MenuItem, TextField, Typography, withStyles } from '@material-ui/core'
import { Add as AddIcon, CenterFocusStrong, Description, Remove as RemoveIcon } from '@material-ui/icons'
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import loading from '../../../assets/loadingGif.gif'
import "../../App.css"
import {INPUT_PROPS } from '../../assets/default.js'


export const FrameImage = ({ image, x, y, width, height, visible, opacity, frameProps }) => {
    const [img] = useImage(image);
    return <Image image={img} x={x} y={y} width={width} height={height} visible={visible} opacity={opacity} preventDefault={false} {...frameProps} />;
};

export const TypeIcon = ({ image, x, y, width, height, visible }) => {
    const [img] = useImage(image.value);
    return <Image image={img} preventDefault={false} x={x} y={y} width={width} height={height} visible={visible} />;
};

export const WrrIcon = ({ image, x, y, width, height, visible }) => {
    const [img] = useImage(image);
    return <Image image={img} preventDefault={false} x={x} y={y} width={width} height={height} visible={visible} />;
};

export const WrrText = (props) => {
    return <Text {...props} preventDefault={false} fontFamily="Gill Sans MT" text={props.text} x={props.x} y={props.y} />
};

export const InputAccourcion = ({ children, summaryTitle, value, onChange }) => {
    return (
        <Accordion square expanded={value} onChange={onChange}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Typography>{summaryTitle}</Typography>
            </AccordionSummary>
            <AccordionDetails style={{ display: "block" }} >
                {children}
            </AccordionDetails>
        </Accordion>
    )
}

export const BasicTextField = (props) => {
    return <TextField className="basic-margin" {...props} fullWidth label={props.label} value={props.value} onChange={props.onChange} inputProps={props.inputProps} />
}

export const CardnameText = (props) => {
    return <Text {...props} fontFamily="Gill Sans Bold" />
}

export const HealthpointsText = (props) => {
    return <Text {...props} preventDefault={false} fontFamily="Futura Std Heavy" />
}

export const IllustratorText = (props) => {
    return <Text {...props} preventDefault={false} fontFamily="Gill Sans MT" fontSize={props.fontSize ? props.fontSize : 12} fontStyle="bold" fillAfterStrokeEnabled={true} stroke="white" strokeWidth={2} align="left" width={1000} />
}

export const ShopnameText = (props) => {
    return <Text {...props} preventDefault={false} fontFamily="Gill Sans MT" fontSize={12} fontStyle="bold" fillAfterStrokeEnabled={true} stroke="white" strokeWidth={2} width={100} />
}

export const BasicAutocomplete = (props) => {
    return <Autocomplete
        {...props}
        style={{ margin: "8px 8px 0 8px" }}
        fullWidth
        disableClearable
        options={props.options}
        getOptionLabel={props.getOptionLabel}
        onChange={props.onChange}
        value={props.value}
        getOptionSelected={props.getOptionSelected}
        renderInput={(params) => <TextField {...params} label={props.label} />} />
}

export const BasicCombobox = ({ onChange, label, value, children, ...props }) => {
    return <TextField
        {...props}
        onChange={onChange}
        label={label}
        value={value}
        className="basic-margin"
        select
    // variant="outlined"
    >
        {children}
    </TextField>
}

export const WrrAutocomplete = ({ options, value, getOptionLabel, onChange, getOptionSelected, label, ...props }) => {
    return <BasicCombobox
        {...props}

        label={label}
        value={value}
        style={{ margin: "8px 8px 0 8px" }}
        SelectProps={{
            renderValue: (value) => <div style={{ textAlign: "left" }}>{value.key}</div>,
            MenuProps: {
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left"
                },
                transformOrigin: {
                    vertical: "top",
                    horizontal: "left"
                },
                getContentAnchorEl: null
            }
        }}
        onChange={onChange}>
        {options.map(element => {
            return (<MenuItem key={element} value={element}>
                <img src={element.value} alt="" width={25} height={25} style={{ margin: "0 10px 0 0" }} />
                {element.key}
            </MenuItem>)
        })}
    </BasicCombobox>
}

export const BasicEnergyamount = ({ label, onChange, options, value, ...props }) => {
    return (
        <BasicCombobox
            label={label}
            value={value}
            {...props}
            SelectProps={{
                renderValue: (value) => <div style={{ textAlign: "left" }}>{value}</div>,
                MenuProps: {
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left"
                    },
                    transformOrigin: {
                        vertical: "top",
                        horizontal: "left"
                    },
                    getContentAnchorEl: null
                }
            }}
            onChange={onChange}>
            {options.map(element => {
                return (<MenuItem key={element} value={element}>
                    {element}
                </MenuItem>)
            })}
        </BasicCombobox>
    )
}

export const BasicEnergyselector = ({ label, onChange, options, value, ...props }) => {
    return (
        <BasicCombobox
            label={label}
            value={value}
            {...props}
            fullWidth
            SelectProps={{
                renderValue: (value) => <div style={{ textAlign: "left" }}>{value.key}</div>,
                MenuProps: {
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left"
                    },
                    transformOrigin: {
                        vertical: "top",
                        horizontal: "left"
                    },
                    getContentAnchorEl: null
                }
            }}
            onChange={onChange}>
            {options.map(element => {
                return (<MenuItem key={element} value={element}>
                    <img className="icon-selector" src={element.value} alt="" width={25} height={25} />
                    {element.key}
                </MenuItem>)
            })}
        </BasicCombobox>
    )
}

export const BasicFeatureselector = ({ label, onChange, options, value, ...props }) => {
    return (
        <BasicCombobox
            label={label}
            value={value}
            fullWidth
            {...props}
            SelectProps={{
                renderValue: (value) => <div style={{ textAlign: "left" }}>{value.key}</div>,
                MenuProps: {
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left"
                    },
                    transformOrigin: {
                        vertical: "top",
                        horizontal: "left"
                    },
                    getContentAnchorEl: null
                }
            }}
            onChange={onChange}>
            {options.map(element => {
                return (<MenuItem key={element} value={element}>
                    {element.key}
                </MenuItem>)
            })}
        </BasicCombobox>
    )
}

export const CustomIncreaseDecrease = (props) => {
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "8px 8px 0 8px" }}>
            <IconButton onClick={props.onIncreaseClick}>
                <AddIcon />
            </IconButton>
            <Typography style={{ margin: "0 15px " }} variant="body1" component="p">{props.value}</Typography>
            <IconButton onClick={props.onDecreaseClick}>
                <RemoveIcon />
            </IconButton>
        </div>)
}

export const EnergySelector = (options, state, stateFunction, labelProp) => {
    return (<div style={{ display: "flex", justifyContent: "space-around" }}>
        {state.iconArray.map((element, index) => {
            return (
                <BasicAutocomplete key={index}
                    id="selector-feature-two-icon"
                    style={{ width: 150 }}
                    renderOption={(option) => (
                        <React.Fragment>
                            <img className="icon-selector" src={option.value} alt="" width={25} height={25} />
                            {option.key}
                        </React.Fragment>
                    )}
                    options={options}
                    getOptionLabel={(option) => option.key}
                    value={state.iconArray[index]}
                    onChange={(event, newIcon) => {
                        let icons = [...state.iconArray]
                        icons[index] = newIcon
                        // icons.sort((a, b) => { return a === typeIcon })
                        stateFunction({
                            ...state,
                            iconArray: icons
                        })
                    }}
                    label={labelProp + " " + (index + 1)} />)
        })}
    </div>)
}

export const TransformButton = (props) => {
    return (<Button {...props} onClick={props.onClick} disabled={props.disabled} variant="outlined" color="primary" >{props.isSelected ? "Confirm Image" : "Move Image"}</Button>)
}

export const DeleteButton = (props) => {
    return (<Button {...props} onClick={props.onClick} disabled={props.disabled} variant="outlined" color="primary" >Delete Image</Button>)
}

export const checResistanceNumber = (state) => {
    if (state === "" || state === "0" || state === 0) {
        return false
    }
    return true
}

export const variableFontSize = (input, MAX, sizeMax, sizeMin) => {
    if (input.length > MAX) {
        return sizeMin
    }
    return sizeMax
}

export const LoadingBackdrop = () => {
    return (<Backdrop className={"loading-div"} open={true} onClick={() => { return }}>
        <img src={loading} className="App-logo" alt="logo" />
    </Backdrop>)
}

export const dataURItoBlob = (dataURI) => {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
}

export const convertDataURLToImage = async (dataURL) => {
    let blob = await dataURItoBlob(dataURL)
    let image = new File([blob], "image.png", {
        type: "image/png",
    })
    return image
}

export const uploadToCloudinaryandtoCard = (uri, variantId, amount, anotherArticle) => {
    //Create Data Object
    var data = {
        upload_preset: "z2iv3bxn", // the unsigned image preset within cloudinary
        context: "photo=phototitle",
        file: uri 
    }

    jQuery.post("https://api.cloudinary.com/v1_1/dynqzfnnt/upload", data).done(function(data) {
                   // do something here
                }).then(function(data) {
                    let formData = {
                        'items': [{
                        'id': variantId,
                        'quantity': amount,
                        'properties': {
                            'Photo': data.secure_url
                        }
                        }]
                        };
    
                     fetch('/cart/add.js', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                        })
                        .then(response => {
                        if (anotherArticle === true){
                            window.location.reload(false); 
                        }else if(anotherArticle === false){
                        window.location.replace("/cart");
                        }
                        return response.json();
                        })
                        .catch((error) => {
                        console.error('Error:', error);
                        });
                });
        return true;
    }

// export const ContestResponseDialog = (response) => {
//     if (response === 200) {
//         <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
//             <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
//             <DialogContentText>
//                 Thank you for uploading your card to the card gallery!

//                 To prevent offensive cards from being uploaded, we subject every card to a review.
//                 This review can take up to 72 hours, but it is usually faster.

//                 Once our review is done and your card has been approved by us, you can find your card in our card gallery and show it to your friends!
//             </DialogContentText>
//             <DialogActions>
//                 <Button>OK</Button>
//             </DialogActions>
//         </Dialog>
//     } else {
//         return (
//             <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
//                 <DialogTitle id="simple-dialog-title">Sometihing went wrong</DialogTitle>
//                 <DialogContentText>
//                     Something went wrong while uploading your image to the gallery. Please contact us so we can fix this error.
//                 </DialogContentText>
//                 <DialogActions>
//                     <Button>OK</Button>
//                 </DialogActions>
//             </Dialog>
//         )
//     }
// }

export const uploadToContest = async (cardname, description, username, mail, stageRef, category, dialogHandler) => {
    let image = await convertDataURLToImage(stageRef.current.toDataURL({ mimeType: "image/png", quality: 1, pixelRatio: 1.573 }))
    let timestamp = new Date()
    let date = timestamp.toLocaleString("de-DE", { year: '2-digit', month: '2-digit', day: '2-digit' })
    let time = timestamp.toLocaleString("de-DE", { hour: "2-digit", minute: "2-digit", second: "2-digit" })

    var myHeaders = new Headers();
    var formdata = new FormData();
    formdata.append("photo-name", cardname);
    formdata.append("photo-description", description);
    formdata.append("photo-category", category);

    formdata.append("contest-photo", image);
    formdata.append("_wpnonce", "c58aa24c3c");
    formdata.append("_wp_http_referer", "/contest/?contest=upload-photo");
    formdata.append("action", "new_post");
    formdata.append("upload-action", "new_post");
    formdata.append("photo-upload-hidden", "new_post");
    formdata.append("wp-submit2", "");
    formdata.append("username", username + "-" + date + "-" + time);
    formdata.append("email", mail + "-" + timestamp.getTime() + "@pokecustoms.de");
    formdata.append("agree-GDPR", "ch");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
    };

    fetch("https://pokecardmaker.com/contest/?contest=upload-photo", requestOptions)
        .then(response => {
            dialogHandler(response)
        })
        .then(result => console.log(result))
        .catch(error => {
            console.log('error', error)
            // dialogHandler(error)
        });
}

export const downloadHandler = (deselectionHandler, stageRef, cardname) => {
    deselectionHandler().then((value) => {
        const uri = stageRef.current.toDataURL({ mimeType: "image/webp", quality: 1});
        // const uri = stageRef.current.toImage({ quality: 1, pixelRatio: 5 });
        downloadURI(uri, cardname.toLowerCase() + INPUT_PROPS.downloadSuffix + '.webp');

    })
}

export function downloadURI(uri, name) {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}