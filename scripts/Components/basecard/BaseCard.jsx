import React, { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { retreatCostsConfig, icons, atkTwoConfig, cards, atkOneConfig, ablAtkConfig } from "./configs"
import { Stepper, Step, StepLabel, FormGroup, Button, Checkbox, Collapse, FormControlLabel, Grid, Box, Typography, Backdrop, MenuItem, CircularProgress, Menu } from '@material-ui/core'
import { WrrIcon, WrrText, InputAccourcion, BasicTextField, BorderLinearProgress, WrrAutocomplete, CustomIncreaseDecrease, DeleteButton, HealthpointsText, IllustratorText, ShopnameText, TransformButton, checResistanceNumber, variableFontSize, BasicCombobox, uploadToContest, downloadHandler, convertDataURLToImage, uploadToCloudinaryandtoCard } from '../common/common.js'

import { Stage, Layer, Image, Text, Line, Transformer, Label } from 'react-konva';
import { STATE_VALUES, INPUT_PROPS } from '../../assets/default.js'
import useImage from 'use-image';
import "../../App.css"
import { render } from '@testing-library/react';
import { color } from '@mui/system';
import Popup from "reactjs-popup";



function RenderAttackCosts(props) {
    let images = props.images
    return (
        <React.Fragment>
            {props.config.map((element, index) => {
                return <AttackCostsImage key={index} image={images[index].value} x={element.x} y={props.yBase + element.y} width={25} height={25} visible={props.visible} />
            })}
        </React.Fragment>
    );
};

function AttackCostsImage(props) {
    const [image] = useImage(props.image, 'Anonymous');
    return (<Image image={image} preventDefault={false} x={props.x} y={props.y} width={25} height={25} visible={props.visible} />);
};

function AtkText(props) {
    return (<Text ref={props.ref} preventDefault={false} {...props} fontFamily="Gill Sans Bold" fontSize={20} fontStyle="bold" text={props.text} x={100} y={props.y} width={280} />);
};

function UploadButton(props) {
    return (<React.Fragment>
        <input id="contained-button-file"
            accept="image/*"
            onChange={props.onChange}
            onClick={props.onClick}
            style={{ display: "none" }}
            type="file" />
        <label htmlFor="contained-button-file">
            <Button className="Main_Button" fullWidth variant="outlined" color="primary" component="span">{props.buttonTitle}</Button>
        </label>
    </React.Fragment>)
}

function Cardname (props) {
    if (props.cardtitle) {
        return (<Text {...props} fontFamily="Gill Sans Bold" fontSize={props.fontSize} text={props.text} x={props.cardtitle.includes("Stage") ? 120 : 45} y={45} width={1000} />)
    } else {
        return (<Text {...props} fontFamily="Gill Sans Bold" fontSize={props.fontSize} text={props.text} x={45} y={45} width={1000} />)
    }
}

const FrameImage = ({ image, x, y, width, height, visible, opacity, frameProps, stateFunction }) => {
    const [img, status] = useImage(image, 'Anonymous');

    if (status === "loading") {
        stateFunction(true)
    } else {
        stateFunction(false)
    }

    return <Image image={img} x={x} y={y} width={width} height={height} visible={visible} opacity={opacity} preventDefault={false} {...frameProps} />;
};

const MainCustomImage = ({ shapeProps, uploadedImage }) => {
    const [image] = useImage(uploadedImage, 'Anonymous');
    return (
        <Image image={image} {...shapeProps} preventDefault={false} opacity={1} draggable /> 
    );
};

const VirtualImage = ({ shapeProps, isSelected, onSelect, onChange, uploadedImage }) => {
    const [image] = useImage(uploadedImage, 'Anonymous');
    const shapeRef = React.useRef();
    const trRef = React.useRef();

    React.useEffect(() => {
        if (isSelected) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <React.Fragment>
            <Image
                onClick={onSelect}
                onTap={onSelect}
                image={image}
                preventDefault={isSelected}
                ref={shapeRef}
                {...shapeProps}
                draggable={isSelected}
                onDragStart={(e) => {
                    onChange({
                        ...shapeProps,
                        opacity: 0.5,
                    });
                }}
                onDragEnd={(e) => {
                    onChange({
                        ...shapeProps,
                        opacity: 0,
                        x: e.target.x(),
                        y: e.target.y()
                    });
                }}
                onTransformEnd={(e) => {
                    // transformer is changing scale of the node
                    // and NOT its width or height
                    // but in the store we have only width and height
                    // to match the data better we will reset scale on transform end
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    // we will reset it back
                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        ...shapeProps,
                        x: node.x(),
                        y: node.y(),
                        // set minimal value
                        width: Math.max(5, node.width() * scaleX),
                        height: Math.max(node.height() * scaleY)
                    });
                }}
            />
            {isSelected && (
                <Transformer
                    ref={trRef}
                    rotateEnabled={false}
                    boundBoxFunc={(oldBox, newBox) => {
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )}
        </React.Fragment>
    );
};



const BaseCard = () => {
    const [isLoading, setIsLoading] = useState(false)
    const stageRef = React.useRef(null);
    const [customCardImage, setCustomCardImage] = useState(null)
    const [cardScale, setCardScale] = useState(1)
    const [selectedCard, setSelectedCard] = useState({title: "Pflanze", index: 0, assets: cards[0].assets})
    const [selectedAssetDeck, setSelectedAssetDeck] = useState(cards[0].assets)
    const [cardName, setCardName] = useState(STATE_VALUES.cardname)
    const [cardType, setCardType] = useState(STATE_VALUES.cardtype)
    const [healthPoints, setHealthPoints] = useState(STATE_VALUES.healthpoints)
    const [featureOne, setFeatureOne] = useState({ title: STATE_VALUES.featureOne.title, description: STATE_VALUES.featureOne.description, damage: STATE_VALUES.damage, damageAddition: { key: "leer", value: "" }, iconArray: [icons[0]] })
    const [featureTwo, setFeatureTwo] = useState({ title: STATE_VALUES.featureTwo.title, description: STATE_VALUES.featureTwo.description, damage: STATE_VALUES.damage, damageAddition: { key: "leer", value: "" }, iconArray: [icons[0]] })
    const [selectedFeatureOne, setSelectedFeatureOne] = useState( { title: "Attack", index: 2, inputText: "Attack", nameFontColor: "black", x: 100, width: 260, inputDisabled: false, visible: true, attackVisible: true })
    const [featureOneEnergy, setFeatureOneEnergy] = useState(atkOneConfig[0])
    const [featureTwoEnergy, setFeatureTwoEnergry] = useState(atkTwoConfig[0])
    const [simpleTextTwo, setSimpleTextTwo] = useState(STATE_VALUES.bottomText)
    const [isSelected, setIsSelected] = useState(false)
    const [isStageSelected, setIsStageSelected] = useState(false)
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const Steppersteps = INPUT_PROPS.stepper_steps;
    const [attributes, setAttributes] = useState({ width: 70, height: 55,x: 70, y: 90 });
    const [amount, setAmount] = useState(1);
    const [digitalVersion, setDigitalVersion] = useState(false);
    const [holoEffekt, setHoloEffekt] = useState(false);
    const [MainImage, setMainImage] = useState("");
    const [basePrice, setBasePrice] = useState(STATE_VALUES.product.price)
    const [ungezeichneteKarte, setungezeichneteKarte] = useState(basePrice)
    const [testImage, setTestImage] = useState("");
    const [loading] = useImage(STATE_VALUES.loading);
    const myRef = useRef(null)

    const handleDownload = () => {
        downloadHandler(checkIsSelected, stageRef, cardName);
        const uri = stageRef.current.toDataURL({ mimeType: "image/webp", quality: 1});
        return(uri);
    }

    async function checkIsSelected() {
        if (isSelected || isStageSelected) {
            setIsSelected(false)
            setIsStageSelected(false)
        }
    }

    const onAmountChange = (event) => {
        let input = event.target.value;
        if (input > 999) {
            setAmount(999)
            return
        }
        if (input < 1) {
            setAmount(1)
            return
        }
        setAmount(input)
        const Zwischen = basePrice;
        setungezeichneteKarte(Zwischen * input);
    }


    const handleChangeDigitalVersion = (event) => {
        setDigitalVersion(event.target.checked);
        if(event.target.checked === true){
            const newPrice = ungezeichneteKarte + 5
            const parsedPrice = parseFloat(newPrice).toFixed(2)
            setungezeichneteKarte(parseFloat(parsedPrice));
            setBasePrice(parseFloat(parsedPrice));
        }
        else if (event.target.checked === false){
            const newPrice = ungezeichneteKarte - 5
            const parsedPrice = parseFloat(newPrice).toFixed(2)
            setungezeichneteKarte(parseFloat(parsedPrice));
            setBasePrice(parseFloat(parsedPrice));
        }
    }

    const handleChangeHoloEffekt = (event) => {
        setHoloEffekt(event.target.checked);
        if(event.target.checked === true){
            const newPrice = ungezeichneteKarte + 8.9
            const parsedPrice = parseFloat(newPrice).toFixed(2)
            setungezeichneteKarte(parseFloat(parsedPrice));
            setBasePrice(parseFloat(parsedPrice));
        }
        else if (event.target.checked === false){
            const newPrice = ungezeichneteKarte - 8.9
            const parsedPrice = parseFloat(newPrice).toFixed(2)
            setungezeichneteKarte(parseFloat(parsedPrice));
            setBasePrice(parseFloat(parsedPrice));
        }

    }

    const onCardNameChange = (event) => {
        let input = event.target.value;
        setCardName(input);
    }



    const onHealthPointsChange = (event) => {
        let input = event.target.value;
        if (input > 9999) {
            setHealthPoints(9999)
            return
        }
        if (input < 1) {
            setHealthPoints(1)
            return
        }
        setHealthPoints(input)
    }


    const handleImageUpload = (event) => {
        setCustomCardImage(URL.createObjectURL(event.target.files[0]));
    }

    const onFeatureTitleChange = (event, state, stateFunction) => {
        stateFunction({ ...state, title: event.target.value })
    }

    const onFeatureDescriptionChange = (event, state, stateFunction) => {
        stateFunction({ ...state, description: event.target.value })
    }



    const onDamageChange = (event, state, stateFunction) => {
        let input = event.target.value;
        if (input > 9999) {
            stateFunction({ ...state, damage: 9999 })
            return
        }
        if (input < 0) {
            stateFunction({ ...state, damage: 1 })
            return
        }
        stateFunction({ ...state, damage: input })
    }

    const setIconArrayConfig = (amount, state, stateFunction) => {
        if (amount > state.iconArray.length) {
            const lastLength = state.iconArray.length
            state.iconArray.length = amount
            stateFunction({ ...state, iconArray: state.iconArray.fill(icons[0], lastLength) })
        } else {
            state.iconArray.length = amount
            stateFunction({ ...state, iconArray: state.iconArray })
        }
    }

    const checkDarkCard = () => {
        if (selectedCard.title === "Finsternis") {
            return "white"
        }
        return "black"
    }


    const renderEnergySelector = (state, stateFunction, labelProp) => {
        return (
            <Grid container spacing={1}>
                {state.iconArray.map((element, index) => {
                    return(
                        <Grid item xs={12} sm={6} md={3}><BasicCombobox
                            id="selector-feature-two-icon"
                            label={labelProp + " " + (index +1)}
                            value={state.iconArray[index]}
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
                            onChange={(event) => {
                                const newValue = event.target.value
                                let icons = [...state.iconArray]
                                icons[index] = newValue
                                stateFunction({
                                    ...state,
                                    iconArray: icons
                                })
                            }}>
                            {icons.map(element => {
                                return (<MenuItem key={element} value={element}>
                                    <img className="icon-selector" src={element.value} alt="" width={25} height={25} />
                                    {element.key}
                                    </MenuItem>)
                            })}
                            </BasicCombobox>
                            </Grid>)
                })}
            </Grid>
        )
    }

    const isStepOptional = (step) => {
        return step === 3;
      };
    
      const isStepSkipped = (step) => {
        return skipped.has(step);
      };
    
      const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }
        
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);


      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    
      const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
          throw new Error("Pflichtfelder können nicht übersprungen werden");
        }
    
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
          const newSkipped = new Set(prevSkipped.values());
          newSkipped.add(activeStep);
          return newSkipped;
        });
      };
    
      const handleReset = () => {
        setActiveStep(0);
      };

      function addProduct(anotherArticle) {
        const uri = stageRef.current.toDataURL({ mimeType: "image/webp", quality: 1});

        switch(basePrice){
            case parseFloat(STATE_VALUES.product.prices.variant1): {
                
            uploadToCloudinaryandtoCard(uri ,STATE_VALUES.product.variants.variant1, amount, anotherArticle);
            break;
            }
            case parseFloat(STATE_VALUES.product.prices.variant2): {
            uploadToCloudinaryandtoCard(uri ,STATE_VALUES.product.variants.variant2, amount, anotherArticle);
            break;
            }
            case parseFloat(STATE_VALUES.product.prices.variant3): {
            uploadToCloudinaryandtoCard(uri ,STATE_VALUES.product.variants.variant3, amount, anotherArticle);
            break;
            }
            case parseFloat(STATE_VALUES.product.prices.variant4): {
            uploadToCloudinaryandtoCard(uri ,STATE_VALUES.product.variants.variant4, amount, anotherArticle);
            break;
            }
         }
      }
      const executeScroll = () => {
        myRef.current.scrollIntoView()   
      }

      function renderStep(step){
        switch(step){
            case 0: {
                return(
                <React.Fragment>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}><BasicTextField id="input-cardname" label={INPUT_PROPS.cardname.label} placeholder={INPUT_PROPS.cardname.placeholder} fullWidth value={cardName} onChange={event => onCardNameChange(event)} /> </Grid>
                            <Grid item xs={12} sm={6}>
                                <BasicCombobox id="selector-card"
                                label={INPUT_PROPS.type.label}
                                value={selectedCard}
                                fullWidth
                                SelectProps={{
                                    renderValue: (value) => <div style={{ textAlign: "left"}}>{value.title}</div>,
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
                                onChange={(event) => {
                                    const newValue = event.target.value
                                    setSelectedAssetDeck(newValue.assets);
                                    setSelectedCard({ title: newValue.title, index: newValue.index, assets: newValue.assets })  
                                }}>
                                {cards.map(element => {
                                    return (<MenuItem key={element} value={element}>
                                        <img className="icon-selector" src={element.selectorIcon} alt="" width={25} height={25} />
                                        {element.title}
                                        </MenuItem>)
                                })} 
                                </BasicCombobox>
                                </Grid>
                                <Grid item xs={12} sm={6}> <BasicTextField id="input-healthpoints" label={INPUT_PROPS.healthpoints.label} placeholder={INPUT_PROPS.healthpoints.placeholder} fullWidth value={healthPoints} onChange={event => onHealthPointsChange(event)} inputProps={{ maxLength: "4", max: "9999", min: "1", type: "number" }} /></Grid>
                                <Grid item xs={12} sm={6}> <BasicTextField id="input-simple-text-two" label={INPUT_PROPS.bottomText.label} placeholder={INPUT_PROPS.bottomText.placeholder} value={simpleTextTwo} onChange={event => { setSimpleTextTwo(event.target.value) }} inputProps={{ maxLength: "125", type: "text" }} /></Grid>
                        </Grid>
                        
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}><Typography variant="h6" >{INPUT_PROPS.backgroundImageButtonText}</Typography></Grid>
                            <Grid item xs={12} sm={6}><UploadButton buttonTitle="Upload Image" onChange={(event) => {handleImageUpload(event); setIsSelected(true);}} onClick={(event) => event.target.value = null, executeScroll} /></Grid>
                            <Grid item xs={12} sm={6}><DeleteButton fullWidth onClick={(event) => { setCustomCardImage(null); setIsSelected(false) }} disabled={customCardImage === null ? true : false} /></Grid>
                            <Grid item xs={12} sm={6}><TransformButton fullWidth isSelected={isSelected} onClick={(event) => { setIsSelected(!isSelected); }} disabled={customCardImage === null ? true : false} /></Grid>
                        </Grid>
                </React.Fragment>
                );
            }
            case 1: {
                return(
                <React.Fragment>
                <Grid item xs={12}><Typography variant="h5" style={{color:"black",}} component="h5">{INPUT_PROPS.featureOne.selector.label}</Typography></Grid>
                <BasicTextField id="input-feature-one-title" label={INPUT_PROPS.featureOne.title.label} placeholder={INPUT_PROPS.featureOne.title.placeholder} value={featureOne.title} onChange={event => { onFeatureTitleChange(event, featureOne, setFeatureOne) }} disabled={selectedFeatureOne.inputDisabled} inputProps={{ maxLength: "23", type: "text" }} />
                <BasicTextField id="input-feature-one-description" label={INPUT_PROPS.featureOne.description.label} placeholder={INPUT_PROPS.featureOne.description.placeholder} value={featureOne.description} onChange={event => { onFeatureDescriptionChange(event, featureOne, setFeatureOne) }} disabled={selectedFeatureOne.inputDisabled} inputProps={{ maxLength: "115", type: "text" }} />
                <BasicTextField id="input-feature-one-damage" label={INPUT_PROPS.featureOne.damage.label} placeholder={INPUT_PROPS.featureOne.damage.placeholder} value={featureOne.damage} onChange={event => { onDamageChange(event, featureOne, setFeatureOne) }} visible={selectedFeatureOne.damageInputVisible} inputProps={{ maxLength: "4", max: "9999", min: "0", type: "number" }} />
                {renderEnergySelector(featureOne, setFeatureOne, INPUT_PROPS.featureOne.selectorEnergyType.label)}
                            {/* <BasicCombobox
                                id="selector-feature-one-damage-addition"
                                label={INPUT_PROPS.featureOne.damageAddition.label}
                                value={featureOne}
                                fullWidth
                                SelectProps={{
                                    renderValue: (value) => <div style={{ textAlign: "left" }}>{value.damageAddition.key}</div>,
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
                                onChange={(event) => {
                                    const newValue = event.target.value
                                    setFeatureOne({ ...featureOne, damageAddition: newValue })
                                }}>
                                {[{ key: "leer", value: "" }, { key: "+", value: "+" }, { key: "x", value: "x" }].map(element => {
                                    return (<MenuItem key={element} value={element}>
                                        {element.key}
                                    </MenuItem>)
                                })}
                            </BasicCombobox> */}
                {/* <BasicCombobox
                    id="selector-feature-one-energy"
                    label={INPUT_PROPS.featureOne.selectorEnergy.label}
                    value={featureOneEnergy}
                    fullWidth
                    SelectProps={{
                        renderValue: (value) => <div style={{ textAlign: "left" }}>{value.title}</div>,
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
                    onChange={(event) => {
                        const newValue = event.target.value
                        setFeatureOneEnergy(newValue);
                        setIconArrayConfig(newValue.title, featureOne, setFeatureOne)
                    }}>
                    {atkOneConfig.map(element => {
                        return (<MenuItem key={element} value={element}>
                            {element.title}
                        </MenuItem>)
                    })}
                </BasicCombobox> */}
                
                <Grid item xs={12}><Typography variant="h5" style={{color:"black",}} component="h5">{INPUT_PROPS.featureTwo.selector.label}</Typography></Grid>
                <BasicTextField id="input-feature-two-title" label={INPUT_PROPS.featureTwo.title.label} placeholder={INPUT_PROPS.featureTwo.title.placeholder} value={featureTwo.title} onChange={event => { onFeatureTitleChange(event, featureTwo, setFeatureTwo) }} inputProps={{ maxLength: "23", type: "text" }} />
                        <BasicTextField id="input-feature-two-description" label={INPUT_PROPS.featureTwo.description.label} placeholder={INPUT_PROPS.featureTwo.description.placeholder} value={featureTwo.description} onChange={event => onFeatureDescriptionChange(event, featureTwo, setFeatureTwo)} inputProps={{ maxLength: "115", type: "text"}} />
                        <BasicTextField id="input-feature-two-damage" label={INPUT_PROPS.featureTwo.damage.label} placeholder={INPUT_PROPS.featureTwo.damage.placeholder} value={featureTwo.damage} onChange={event => { onDamageChange(event, featureTwo, setFeatureTwo) }} inputProps={{ maxLength: "4", max: "9999", min: "0", type: "number"}} />
                        {renderEnergySelector(featureTwo, setFeatureTwo, INPUT_PROPS.featureTwo.selectorEnergyType.label)}
                                {/* <BasicCombobox
                                id="selector-feature-two-damage-addition"
                                label={INPUT_PROPS.featureTwo.damageAddition.label}
                                value={featureTwo}
                                fullWidth
                                SelectProps={{
                                    renderValue: (value) => <div style={{ textAlign: "left" }}>{value.damageAddition.key}</div>,
                                    MenuProps: {
                                        anchorOrigin:{
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
                                onChange={(event) => {
                                    const newValue = event.target.value
                                    setFeatureTwo({ ...featureTwo, damageAddition: newValue })
                                }}>
                                {[{ key: "leer", valje: ""}, { key: "+", value: "+"}, {key: "x", value: "x"}].map(element => {
                                    return (<MenuItem key={element} value={element}>
                                        {element.key}
                                    </MenuItem>)
                                })}
                                </BasicCombobox> */}
                        {/* <BasicCombobox
                        id="selector-feature-two-energy"
                        label={INPUT_PROPS.featureTwo.selectorEnergy.label}
                        value={featureTwoEnergy}
                        fullWidth
                        SelectProps={{
                            renderValue: (value) => <div style={{ textAlign: "left" }}>{value.title}</div>,
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
                        onChange={(event) => {
                            const newValue = event.target.value
                            setFeatureTwoEnergry(newValue);
                            setIconArrayConfig(newValue.title, featureTwo, setFeatureTwo)
                        }}>
                        {atkTwoConfig.map(element => {
                            return (<MenuItem key={element} value={element}>
                                    {element.title}
                                </MenuItem>)
                        })}
                        </BasicCombobox> */}
            </React.Fragment>
                );
            }
            case 2:{
                return(
                    <FormGroup>
                        <Grid container spacing={2}>
                        <Grid item xs={12}><Typography variant="h5" style={{color:"black",}} component="h5">{INPUT_PROPS.additionals.label}</Typography></Grid>
                        <Grid item xs={6} sm={6}><FormControlLabel style={{color:"black",}} control={<Checkbox checked={holoEffekt} onChange={handleChangeHoloEffekt} style={{color:"black",}} on/>} label={INPUT_PROPS.additionals.holoEffekt.label} /></Grid>
                        <Grid item xs={6} sm={6}><FormControlLabel style={{color:"black",}} control={<Checkbox checked={digitalVersion} onChange={handleChangeDigitalVersion} style={{color:"black",}} />} label={INPUT_PROPS.additionals.digitalVersion.label} /></Grid>
                        </Grid>
                    </FormGroup>
                );
            }
            case 3:{
                return(
                    <React.Fragment>
                        <Grid container spacing={2}>
                        <Grid item xs={12}><Typography variant="h5" style={{color:"black",}} component="h5">{INPUT_PROPS.abschluss.label}</Typography></Grid>
                        <Grid item xs={7} sm={7}></Grid>
                        <Grid item xs={3} sm={3}><Typography variant="p" style={{color:"black",}} component="h5">{INPUT_PROPS.additionals.amount.label}</Typography></Grid>
                        <Grid item xs={2} sm={2}><BasicTextField id="input-additionals-amount" placeholder={INPUT_PROPS.additionals.amount.placeholder} value={amount} onChange={event => { onAmountChange(event) }} inputProps={{ maxLength: "3", max: "999", min: "1", type: "number" }} /></Grid>
                        {/* <Grid item xs={10}></Grid> */}
                        <Grid item xs={12}>
                        <Button style={{backgroundColor:"rgb(60, 91, 167)", color:"white", width:'100%'}} onClick={() => addProduct(true)}>{INPUT_PROPS.abschluss.buttonWeiterKarte}</Button>
                        <Button style={{backgroundColor:"rgb(60, 91, 167)", color:"white", width:'100%', marginTop:'4px'}} className="Main_Button" onClick={() => addProduct(false)}>{INPUT_PROPS.abschluss.buttonAbschließen}</Button>
                        </Grid>
                        </Grid> 
                    </React.Fragment>
                );
            }
            default:
                return null;
        }
    }
        



    return(
        <Grid container>
            <Grid className="cardframe-center cardframe_mobilscale" item sm={12} md={6} ref={myRef}>
            <Backdrop className={"loading-div"} open={isLoading} onClick={() => { return }}>
                    <img src={loading} className="App-logo" alt="logo" />
                </Backdrop>
                <Stage class="Main_Card" width={475} height={660} ref={stageRef} scaleX={cardScale} scaleY={cardScale} >
                    <Layer preventDefault={false}>
                        <React.Fragment>
                        <MainCustomImage shapeProps={attributes} uploadedImage={customCardImage} />
                            <FrameImage id="basecard-frame" image={selectedCard.assets.asset} stateFunction={setIsLoading} opacity={1} width={475} height={660} visible={true} />
                        </React.Fragment>
                    </Layer>
                    <Layer >
                    <React.Fragment>
                    <Cardname id="cardname" preventDefault={false} fontStyle="bold" fontSize={variableFontSize(cardName, 10, INPUT_PROPS.fontSizes.baseCard.cardname.fontMax, INPUT_PROPS.fontSizes.baseCard.cardname.fontMin)} text={cardName} fill={checkDarkCard()} cardtitle={selectedCard.assets.title} y={45} width={220} fontFamily="Gill Sans MT" />
                    <HealthpointsText id="healthPoints" text={healthPoints} fill="red" x={210} y={43} fontSize={30} align="right" width={150} />
                    <Text id="simpleTextTwo" preventDefault={false} fontFamily="Gill Sans MT" fontSize={14} fontStyle="bold" text={simpleTextTwo} fill={checkDarkCard()} x={50} y={590} align="center" width={370} />
                    </React.Fragment>
                    <React.Fragment>
                    <Text id="feature-one-name" preventDefault={false} fontFamily="Gill Sans Bold" fontSize={20} text={featureOne.title} fill={checkDarkCard()} x={selectedFeatureOne.x} y={featureOne.description === "" ? 410 : 380} align="center" width={selectedFeatureOne.width} />
                        <Text id="feature-one-description" preventDefault={false} fontFamily="Gill Sans MT" text={featureOne.description} fill={checkDarkCard()} x={selectedFeatureOne.x} y={400} fontSize={15} width={selectedFeatureOne.width} lineHeight={1.15} />
                        <Text id="feature-one-damage" preventDefault={false} fontFamily="Futura Std Heavy" text={featureOne.damage + featureOne.damageAddition.value} fill={checkDarkCard()} x={340} y={400} fontSize={30} align="right" width={100} visible={featureOne.damage === "0" || featureOne.damage === "" ? false : true} />
                        <RenderAttackCosts id="feature-one-energy" images={featureOne.iconArray} yBase={0} config={featureOneEnergy.config} visible={selectedFeatureOne.attackVisible} />
                    </React.Fragment>
                    <React.Fragment>
                        <AtkText id="feature-two-name" text={featureTwo.title} fill={checkDarkCard()} x={100} y={selectedFeatureOne.index > 0 ? featureTwo.description === "" ? 494 : 470 : featureTwo.description == "" ? 44 :428} align="center" />
                        <Text id="feature-two-description-bottom" preventDefault={false} fontFamily="Gill Sans MT" fontSize={15} text={featureTwo.description.substr(0)} fill={checkDarkCard()} x={100} y={selectedFeatureOne.index > 0 ? 492 : 450} width={260} lineHeight={1.15} />
                        <Text id="feature-two-damage" preventDefault={false} fontFamily="Futura Std Heavy" fontSize={30} text={featureTwo.damage + featureTwo.damageAddition.value} fill={checkDarkCard()} x={340} y={selectedFeatureOne.index > 0 ? 482 : 440} align="right" width={100} visible={featureTwo.damage === "0" || featureTwo.damage === "" ? false : true} />
                        <RenderAttackCosts id="feature-two-costs" images={featureTwo.iconArray} yBase={selectedFeatureOne.index > 0 ? 0 : -50} config={featureTwoEnergy.config} />
                    </React.Fragment>

                    {customCardImage !== null ?
                            <VirtualImage
                                key={2}
                                uploadedImage={customCardImage}
                                shapeProps={attributes}
                                isSelected={isSelected}
                                onSelect={() => {
                                    // setIsSelected(true)
                                }}
                                onChange={(newAttrs) => {
                                    setAttributes(newAttrs)
                                }}
                            /> : null}

                    </Layer>
                </Stage>
            </Grid>
            <Grid className="stepperframe_mobilscale" item sm={12} md={6}  style={{
                borderWidth: '5px',
                borderColor: '#3c5ba7',
                borderStyle: 'solid',
                borderRadius: '12px',
                backgroundColor: 'white'
             }}  >
            <Typography style={{backgroundColor:"#3c5ba7", textAlign:"right" ,padding:"7px 24px 0px 0px" ,height:"50px",color:"white"}}variant="h5" component="h5">Preis: {ungezeichneteKarte} €</Typography>
    <Box component="div" m={3}>
      <Stepper style={{backgroundColor:"white"}} activeStep={activeStep}>
        {Steppersteps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === Steppersteps.length ? (
        <Button
        className="Main_Button"
        onClick={handleReset}
        sx={{ mr: 1 }}
        >
      Zurück
    </Button>
      ) : (
        <React.Fragment>
            {renderStep(activeStep)}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            {activeStep === 0 ? (
            console.log()
            )
             : (
                <Button
              className="Main_Button"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Zurück
            </Button>
             )}
            
            <Box sx={{ flex: '1 1 auto' }} />

            {isStepOptional(activeStep) && (
              <Button className="Main_Button" color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Überspringen
              </Button>
            )}
            {activeStep === Steppersteps.length - 1 ? (
            console.log()
            )
             : (
                <Button className="Main_Button" onClick={handleNext}>
                Weiter
              </Button>
             )}
            
          </Box>
        </React.Fragment>
      )}
    </Box>
</Grid>
            
        </Grid>
    );
}

export default BaseCard