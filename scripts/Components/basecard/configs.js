import { pflanze_basic, feuer_basic, wasser_basic, psycho_basic, elektro_basic,  normal_basic, kampf_basic, finsternis_basic } from '../../assets/cards/basecard/basecards.js'
import {  darkImage, fightingImage, fireImage, grassImage, lightningImage, psychicImage, waterImage, normalImage } from '../../assets/typeIcons/typeIcons.js'


export const retreatCostsConfig = [
    { config: [] },
    { config: [{ x: 375, y: 558 }] },
    { config: [{ x: 362, y: 558 }, { x: 388, y: 558 }] },
    { config: [{ x: 350, y: 558 }, { x: 375, y: 558 }, { x: 400, y: 558 }] },
    { config: [{ x: 336, y: 558 }, { x: 362, y: 558 }, { x: 388, y: 558 }, { x: 414, y: 558 }] },
    { config: [{ x: 325, y: 558 }, { x: 350, y: 558 }, { x: 375, y: 558 }, { x: 400, y: 558 }, { x: 425, y: 558 }] },
]

export const atkOneConfig = [
    // { title: "1", config: [{ x: 47, y: 490, visible: true }] },
    { title: "1", config: [{ x: 47, y: 405, visible: true }] },
    { title: "2", config: [{ x: 32, y: 405, visible: true }, { x: 62, y: 405, visible: true }] },
    { title: "3", config: [{ x: 47, y: 390, visible: true }, { x: 32, y: 420, visible: true }, { x: 62, y: 420, visible: true }] },
    { title: "4", config: [{ x: 32, y: 390, visible: true }, { x: 62, y: 390, visible: true }, { x: 32, y: 420, visible: true }, { x: 62, y: 420, visible: true }] },
]

export const atkTwoConfig = [
    { title: "1", config: [{ x: 47, y: 490, visible: true }] },
    { title: "2", config: [{ x: 32, y: 490, visible: true }, { x: 62, y: 490, visible: true }] },
    { title: "3", config: [{ x: 47, y: 475, visible: true }, { x: 32, y: 505, visible: true }, { x: 62, y: 505, visible: true }] },
    { title: "4", config: [{ x: 32, y: 475, visible: true }, { x: 62, y: 475, visible: true }, { x: 32, y: 505, visible: true }, { x: 62, y: 505, visible: true }] },
]

export const cards = [
    { title: "Pflanze", selectorIcon: grassImage, index: 0, assets: { title: "Basic", asset: pflanze_basic, index: 0 } },
    { title: "Feuer", selectorIcon: fireImage, index: 1, assets: { title: "Basic", asset: feuer_basic, index: 0 } },
    { title: "Wasser", selectorIcon: waterImage, index: 2, assets: { title: "Basic", asset: wasser_basic, index: 0 } },
    { title: "Psycho", selectorIcon: psychicImage, index: 3, assets: { title: "Basic", asset: psycho_basic, index: 0 } },
    { title: "Elektro", selectorIcon: lightningImage, index: 4, assets: { title: "Basic", asset: elektro_basic, index: 0 } },
    { title: "Normal", selectorIcon: normalImage, index: 5, assets: { title: "Basic", asset: normal_basic, index: 0 } },
    { title: "Kampf", selectorIcon: fightingImage, index: 6, assets: { title: "Basic", asset: kampf_basic, index: 0 } },
    { title: "Finsternis", selectorIcon: darkImage, index: 7, assets: { title: "Basic", asset: finsternis_basic, index: 0 } },
]

export const icons = [
    { key: "Pflanze", value: grassImage },
    { key: "Feuer", value: fireImage },
    { key: "Wasser", value: waterImage },
    { key: "Psycho", value: psychicImage },
    { key: "Elektro", value: lightningImage },
    { key: "Normal", value: normalImage },
    { key: "Kampf", value: fightingImage },
    { key: "Finsternis", value: darkImage }
]