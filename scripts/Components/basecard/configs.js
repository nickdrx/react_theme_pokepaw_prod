import React, { useState, useEffect } from 'react';


const CardPlanze = 'https://cdn.shopify.com/s/files/1/0554/4057/2576/t/9/assets/1_pflanze_karte.png?v=7010108639482829919';
const CardFeuer =  'https://cdn.shopify.com/s/files/1/0554/4057/2576/t/9/assets/1_feuer_karte.png?v=8874202177365162412';
const CardWasser = 'https://cdn.shopify.com/s/files/1/0554/4057/2576/t/9/assets/1_wasser_karte.png?v=4787179642220768052';
const CardPsycho = 'https://cdn.shopify.com/s/files/1/0554/4057/2576/t/9/assets/1_psycho_karte.png?v=10079966239826265070';
const CardElektro = 'https://cdn.shopify.com/s/files/1/0554/4057/2576/t/9/assets/1_elektro_karte.png?v=9266683675416933535';
const CardNormal = 'https://cdn.shopify.com/s/files/1/0554/4057/2576/t/9/assets/1_normal_karte.png?v=11695136987055346955';
const CardKampf = 'https://cdn.shopify.com/s/files/1/0554/4057/2576/t/9/assets/1_kampf_karte.png?v=3479434328579203087';
const CardFinsternis = 'https://cdn.shopify.com/s/files/1/0554/4057/2576/t/9/assets/1_finsternis_karte.png?v=8069353974506429989';


const PflanzeIcon = 'https://cdn.shopify.com/s/files/1/0554/4057/2576/t/9/assets/grass-thumbnail.png?v=262978755752589757';
const FeuerIcon = 'https://cdn.shopify.com/s/files/1/0554/4057/2576/t/9/assets/fire-thumbnail.png?v=3352239319451728964';
const WasserIcon = 'https://cdn.shopify.com/s/files/1/0554/4057/2576/t/9/assets/water-thumbnail.png?v=4192130843896120973';
const PsychoIcon = 'https://cdn.shopify.com/s/files/1/0554/4057/2576/t/9/assets/psychic-thumbnail.png?v=1395257491664953305';
const ElektroIcon = 'https://cdn.shopify.com/s/files/1/0554/4057/2576/t/9/assets/lightning-thumbnail.png?v=1426050179370864288';
const NormalIcon = 'https://cdn.shopify.com/s/files/1/0554/4057/2576/t/9/assets/normal-thumbnail.png?v=1436657233733366119';
const KampfIcon = 'https://cdn.shopify.com/s/files/1/0554/4057/2576/t/9/assets/fighting-thumbnail.png?v=989673766798842188';
const FinsternisIcon = 'https://cdn.shopify.com/s/files/1/0554/4057/2576/t/9/assets/dark-thumbnail.png?v=9682264188183492969';


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
    { title: "Pflanze", selectorIcon: PflanzeIcon, index: 0, assets: { title: "Basic", asset: CardPlanze, index: 0 } },
    { title: "Feuer", selectorIcon: FeuerIcon, index: 1, assets: { title: "Basic", asset: CardFeuer, index: 0 } },
    { title: "Wasser", selectorIcon: WasserIcon, index: 2, assets: { title: "Basic", asset: CardWasser, index: 0 } },
    { title: "Psycho", selectorIcon: PsychoIcon, index: 3, assets: { title: "Basic", asset: CardPsycho, index: 0 } },
    { title: "Elektro", selectorIcon: ElektroIcon, index: 4, assets: { title: "Basic", asset: CardElektro, index: 0 } },
    { title: "Normal", selectorIcon: NormalIcon, index: 5, assets: { title: "Basic", asset: CardNormal, index: 0 } },
    { title: "Kampf", selectorIcon: KampfIcon, index: 6, assets: { title: "Basic", asset: CardKampf, index: 0 } },
    { title: "Finsternis", selectorIcon: FinsternisIcon, index: 7, assets: { title: "Basic", asset: CardFinsternis, index: 0 } },
]

export const icons = [
    { key: "Pflanze", value: PflanzeIcon },
    { key: "Feuer", value: FeuerIcon },
    { key: "Wasser", value: WasserIcon },
    { key: "Psycho", value: PsychoIcon },
    { key: "Elektro", value: ElektroIcon },
    { key: "Normal", value: NormalIcon },
    { key: "Kampf", value: KampfIcon },
    { key: "Finsternis", value: FinsternisIcon }
]