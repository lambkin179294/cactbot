/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./resources/regexes.ts
const startsUsingParams = ['timestamp', 'source', 'id', 'ability', 'target', 'capture'];
const abilityParams = ['timestamp', 'source', 'sourceId', 'id', 'ability', 'targetId', 'target', 'capture'];
const abilityFullParams = [
    'timestamp',
    'sourceId',
    'source',
    'id',
    'ability',
    'targetId',
    'target',
    'flags',
    'flag0',
    'flag1',
    'flag2',
    'flag3',
    'flag4',
    'flag5',
    'flag6',
    'flag7',
    'flag8',
    'flag9',
    'flag10',
    'flag11',
    'flag12',
    'flag13',
    'flag14',
    'targetHp',
    'targetMaxHp',
    'targetMp',
    'targetMaxMp',
    'targetX',
    'targetY',
    'targetZ',
    'targetHeading',
    'hp',
    'maxHp',
    'mp',
    'maxMp',
    'x',
    'y',
    'z',
    'heading',
    'capture',
];
const headMarkerParams = ['timestamp', 'targetId', 'target', 'id', 'capture'];
const addedCombatantParams = ['timestamp', 'name', 'capture'];
const addedCombatantFullParams = [
    'timestamp',
    'id',
    'name',
    'job',
    'level',
    'hp',
    'x',
    'y',
    'z',
    'npcId',
    'capture',
];
const removingCombatantParams = [
    'timestamp',
    'id',
    'name',
    'hp',
    'x',
    'y',
    'z',
    'capture',
];
const gainsEffectParams = ['timestamp', 'targetId', 'target', 'effect', 'source', 'duration', 'capture'];
const statusEffectExplicitParams = [
    'timestamp',
    'targetId',
    'target',
    'job',
    'hp',
    'maxHp',
    'mp',
    'maxMp',
    'x',
    'y',
    'z',
    'heading',
    'data0',
    'data1',
    'data2',
    'data3',
    'data4',
    'capture',
];
const losesEffectParams = ['timestamp', 'targetId', 'target', 'effect', 'source', 'capture'];
const statChangeParams = [
    'timestamp',
    'job',
    'strength',
    'dexterity',
    'vitality',
    'intelligence',
    'mind',
    'piety',
    'attackPower',
    'directHit',
    'criticalHit',
    'attackMagicPotency',
    'healMagicPotency',
    'determination',
    'skillSpeed',
    'spellSpeed',
    'tenacity',
    'capture',
];
const tetherParams = ['timestamp', 'source', 'sourceId', 'target', 'targetId', 'id', 'capture'];
const wasDefeatedParams = ['timestamp', 'target', 'source', 'capture'];
const hasHPParams = ['timestamp', 'name', 'hp', 'capture'];
const echoParams = ['timestamp', 'code', 'line', 'capture'];
const dialogParams = ['timestamp', 'code', 'line', 'name', 'capture'];
const messageParams = ['timestamp', 'code', 'line', 'capture'];
const gameLogParams = ['timestamp', 'code', 'line', 'capture'];
const gameNameLogParams = ['timestamp', 'code', 'name', 'line', 'capture'];
const changeZoneParams = ['timestamp', 'name', 'capture'];
const network6dParams = ['timestamp', 'instance', 'command', 'data0', 'data1', 'data2', 'data3', 'capture'];
class Regexes {
    /**
     * fields: source, id, ability, target, capture
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#14-networkstartscasting
     */
    static startsUsing(f) {
        if (typeof f === 'undefined')
            f = {};
        Regexes.validateParams(f, 'startsUsing', startsUsingParams);
        const capture = Regexes.trueIfUndefined(f.capture);
        let str = Regexes.maybeCapture(capture, 'timestamp', '\\y{Timestamp}') +
            ' 14:' +
            Regexes.maybeCapture(capture, 'id', f.id, '\\y{AbilityCode}') + ':';
        if (f.source || f.id || f.target || capture)
            str += Regexes.maybeCapture(capture, 'source', f.source, '.*?') + ' starts using ';
        if (f.ability || f.target || capture)
            str += Regexes.maybeCapture(capture, 'ability', f.ability, '.*?') + ' on ';
        if (f.target || capture)
            str += Regexes.maybeCapture(capture, 'target', f.target, '.*?') + '\\.';
        return Regexes.parse(str);
    }
    /**
     * fields: sourceId, source, id, ability, targetId, target, capture
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#15-networkability
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#16-networkaoeability
     */
    static ability(f) {
        if (typeof f === 'undefined')
            f = {};
        Regexes.validateParams(f, 'ability', abilityParams);
        const capture = Regexes.trueIfUndefined(f.capture);
        let str = Regexes.maybeCapture(capture, 'timestamp', '\\y{Timestamp}') +
            ' 1[56]:' + Regexes.maybeCapture(capture, 'sourceId', '\\y{ObjectId}') + ':' +
            Regexes.maybeCapture(capture, 'source', f.source, '[^:]*?') + ':';
        if (f.id || f.ability || f.target || f.targetId || capture)
            str += Regexes.maybeCapture(capture, 'id', f.id, '\\y{AbilityCode}') + ':';
        if (f.ability || f.target || f.targetId || capture)
            str += Regexes.maybeCapture(capture, 'ability', f.ability, '[^:]*?') + ':';
        if (f.target || f.targetId || capture)
            str += Regexes.maybeCapture(capture, 'targetId', '\\y{ObjectId}') + ':';
        if (f.target || capture)
            str += Regexes.maybeCapture(capture, 'target', f.target, '[^:]*?') + ':';
        return Regexes.parse(str);
    }
    /**
     * fields: sourceId, source, id, ability, targetId, target, flags, x, y, z, heading, capture
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#15-networkability
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#16-networkaoeability
     */
    static abilityFull(f) {
        if (typeof f === 'undefined')
            f = {};
        Regexes.validateParams(f, 'abilityFull', abilityFullParams);
        const capture = Regexes.trueIfUndefined(f.capture);
        const str = Regexes.maybeCapture(capture, 'timestamp', '\\y{Timestamp}') +
            ' 1[56]:' +
            Regexes.maybeCapture(capture, 'sourceId', f.sourceId, '\\y{ObjectId}') + ':' +
            Regexes.maybeCapture(capture, 'source', f.source, '[^:]*?') + ':' +
            Regexes.maybeCapture(capture, 'id', f.id, '\\y{AbilityCode}') + ':' +
            Regexes.maybeCapture(capture, 'ability', f.ability, '[^:]*?') + ':' +
            Regexes.maybeCapture(capture, 'targetId', f.targetId, '\\y{ObjectId}') + ':' +
            Regexes.maybeCapture(capture, 'target', f.target, '[^:]*?') + ':' +
            Regexes.maybeCapture(capture, 'flags', f.flags, '[^:]*?') + ':' +
            Regexes.maybeCapture(capture, 'flag0', f.flag0, '[^:]*?') + ':' +
            Regexes.maybeCapture(capture, 'flag1', f.flag1, '[^:]*?') + ':' +
            Regexes.maybeCapture(capture, 'flag2', f.flag2, '[^:]*?') + ':' +
            Regexes.maybeCapture(capture, 'flag3', f.flag3, '[^:]*?') + ':' +
            Regexes.maybeCapture(capture, 'flag4', f.flag4, '[^:]*?') + ':' +
            Regexes.maybeCapture(capture, 'flag5', f.flag5, '[^:]*?') + ':' +
            Regexes.maybeCapture(capture, 'flag6', f.flag6, '[^:]*?') + ':' +
            Regexes.maybeCapture(capture, 'flag7', f.flag7, '[^:]*?') + ':' +
            Regexes.maybeCapture(capture, 'flag8', f.flag8, '[^:]*?') + ':' +
            Regexes.maybeCapture(capture, 'flag9', f.flag9, '[^:]*?') + ':' +
            Regexes.maybeCapture(capture, 'flag10', f.flag10, '[^:]*?') + ':' +
            Regexes.maybeCapture(capture, 'flag11', f.flag11, '[^:]*?') + ':' +
            Regexes.maybeCapture(capture, 'flag12', f.flag12, '[^:]*?') + ':' +
            Regexes.maybeCapture(capture, 'flag13', f.flag13, '[^:]*?') + ':' +
            Regexes.maybeCapture(capture, 'flag14', f.flag13, '[^:]*?') + ':' +
            Regexes.optional(Regexes.maybeCapture(capture, 'targetHp', f.targetHp, '\\y{Float}')) + ':' +
            Regexes.optional(Regexes.maybeCapture(capture, 'targetMaxHp', f.targetMaxHp, '\\y{Float}')) + ':' +
            Regexes.optional(Regexes.maybeCapture(capture, 'targetMp', f.targetMp, '\\y{Float}')) + ':' +
            Regexes.optional(Regexes.maybeCapture(capture, 'targetMaxMp', f.targetMaxMp, '\\y{Float}')) + ':' +
            Regexes.optional('\\y{Float}') + ':' + // Target TP
            Regexes.optional('\\y{Float}') + ':' + // Target Max TP
            Regexes.optional(Regexes.maybeCapture(capture, 'targetX', f.targetX, '\\y{Float}')) + ':' +
            Regexes.optional(Regexes.maybeCapture(capture, 'targetY', f.targetY, '\\y{Float}')) + ':' +
            Regexes.optional(Regexes.maybeCapture(capture, 'targetZ', f.targetZ, '\\y{Float}')) + ':' +
            Regexes.optional(Regexes.maybeCapture(capture, 'targetHeading', f.targetHeading, '\\y{Float}')) + ':' +
            Regexes.maybeCapture(capture, 'hp', f.hp, '\\y{Float}') + ':' +
            Regexes.maybeCapture(capture, 'maxHp', f.maxHp, '\\y{Float}') + ':' +
            Regexes.maybeCapture(capture, 'mp', f.mp, '\\y{Float}') + ':' +
            Regexes.maybeCapture(capture, 'maxMp', f.maxMp, '\\y{Float}') + ':' +
            '\\y{Float}:' + // Source TP
            '\\y{Float}:' + // Source Max TP
            Regexes.maybeCapture(capture, 'x', f.x, '\\y{Float}') + ':' +
            Regexes.maybeCapture(capture, 'y', f.y, '\\y{Float}') + ':' +
            Regexes.maybeCapture(capture, 'z', f.z, '\\y{Float}') + ':' +
            Regexes.maybeCapture(capture, 'heading', f.heading, '\\y{Float}') + ':' +
            '.*?$'; // Unknown last field
        return Regexes.parse(str);
    }
    /**
     * fields: targetId, target, id, capture
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#1b-networktargeticon-head-markers
     */
    static headMarker(f) {
        if (typeof f === 'undefined')
            f = {};
        Regexes.validateParams(f, 'headMarker', headMarkerParams);
        const capture = Regexes.trueIfUndefined(f.capture);
        const str = Regexes.maybeCapture(capture, 'timestamp', '\\y{Timestamp}') +
            ' 1B:' +
            Regexes.maybeCapture(capture, 'targetId', f.targetId, '\\y{ObjectId}') + ':' +
            Regexes.maybeCapture(capture, 'target', f.target, '[^:]*?') + ':....:....:' +
            Regexes.maybeCapture(capture, 'id', f.id, '....') + ':';
        return Regexes.parse(str);
    }
    // fields: name, capture
    // matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#03-addcombatant
    static addedCombatant(f) {
        if (typeof f === 'undefined')
            f = {};
        Regexes.validateParams(f, 'addedCombatant', addedCombatantParams);
        const capture = Regexes.trueIfUndefined(f.capture);
        const str = Regexes.maybeCapture(capture, 'timestamp', '\\y{Timestamp}') +
            ' 03:\\y{ObjectId}:Added new combatant ' +
            Regexes.maybeCapture(capture, 'name', f.name, '.*?') + '\\.';
        return Regexes.parse(str);
    }
    /**
     * fields: id, name, hp, x, y, z, npcId, capture
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#03-addcombatant
     */
    static addedCombatantFull(f) {
        if (typeof f === 'undefined')
            f = {};
        Regexes.validateParams(f, 'addedCombatantFull', addedCombatantFullParams);
        const capture = Regexes.trueIfUndefined(f.capture);
        const str = Regexes.maybeCapture(capture, 'timestamp', '\\y{Timestamp}') +
            ' 03:' + Regexes.maybeCapture(capture, 'id', f.id, '\\y{ObjectId}') +
            ':Added new combatant ' + Regexes.maybeCapture(capture, 'name', f.name, '[^:]*?') +
            '\\. {2}Job: ' + Regexes.maybeCapture(capture, 'job', f.job, '[^:]*?') +
            ' Level: ' + Regexes.maybeCapture(capture, 'level', f.level, '[^:]*?') +
            ' Max HP: ' + Regexes.maybeCapture(capture, 'hp', f.hp, '[0-9]+') + '\.' +
            '.*?Pos: \\(' +
            Regexes.maybeCapture(capture, 'x', f.x, '\\y{Float}') + ',' +
            Regexes.maybeCapture(capture, 'y', f.y, '\\y{Float}') + ',' +
            Regexes.maybeCapture(capture, 'z', f.z, '\\y{Float}') + '\\)' +
            '(?: \\(' + Regexes.maybeCapture(capture, 'npcId', f.npcId, '.*?') + '\\))?\\.';
        return Regexes.parse(str);
    }
    /**
     * fields: id, name, hp, capture
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#04-removecombatant
     */
    static removingCombatant(f) {
        if (typeof f === 'undefined')
            f = {};
        Regexes.validateParams(f, 'removingCombatant', removingCombatantParams);
        const capture = Regexes.trueIfUndefined(f.capture);
        const str = Regexes.maybeCapture(capture, 'timestamp', '\\y{Timestamp}') +
            ' 04:' + Regexes.maybeCapture(capture, 'id', '\\y{ObjectId}') +
            ':Removing combatant ' +
            Regexes.maybeCapture(capture, 'name', f.name, '.*?') + '\\.' +
            '.*?Max HP: ' + Regexes.maybeCapture(capture, 'hp', f.hp, '[0-9]+') + '\.' +
            Regexes.optional('.*?Pos: \\(' +
                Regexes.maybeCapture(capture, 'x', f.x, '\\y{Float}') + ',' +
                Regexes.maybeCapture(capture, 'y', f.y, '\\y{Float}') + ',' +
                Regexes.maybeCapture(capture, 'z', f.z, '\\y{Float}') + '\\)');
        return Regexes.parse(str);
    }
    // fields: targetId, target, effect, source, duration, capture
    // matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#1a-networkbuff
    static gainsEffect(f) {
        if (typeof f === 'undefined')
            f = {};
        Regexes.validateParams(f, 'gainsEffect', gainsEffectParams);
        const capture = Regexes.trueIfUndefined(f.capture);
        const str = Regexes.maybeCapture(capture, 'timestamp', '\\y{Timestamp}') +
            ' 1A:' +
            Regexes.maybeCapture(capture, 'targetId', f.targetId, '\\y{ObjectId}') + ':' +
            Regexes.maybeCapture(capture, 'target', f.target, '.*?') +
            ' gains the effect of ' +
            Regexes.maybeCapture(capture, 'effect', f.effect, '.*?') +
            ' from ' +
            Regexes.maybeCapture(capture, 'source', f.source, '.*?') +
            ' for ' +
            Regexes.maybeCapture(capture, 'duration', f.duration, '\\y{Float}') +
            ' Seconds\\.';
        return Regexes.parse(str);
    }
    /**
     * Prefer gainsEffect over this function unless you really need extra data.
     * fields: targetId, target, job, hp, maxHp, mp, maxMp, x, y, z, heading,
     *         data0, data1, data2, data3, data4
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#26-networkstatuseffects
     */
    static statusEffectExplicit(f) {
        if (typeof f === 'undefined')
            f = {};
        Regexes.validateParams(f, 'statusEffectExplicit', statusEffectExplicitParams);
        const capture = Regexes.trueIfUndefined(f.capture);
        const kField = '.*?:';
        const str = Regexes.maybeCapture(capture, 'timestamp', '\\y{Timestamp}') +
            ' 26:' +
            Regexes.maybeCapture(capture, 'targetId', f.targetId, '\\y{ObjectId}') + ':' +
            Regexes.maybeCapture(capture, 'target', f.target, '[^:]*?') + ':' +
            '[0-9A-F]{0,6}' + Regexes.maybeCapture(capture, 'job', f.job, '[0-9A-F]{0,2}') + ':' +
            Regexes.maybeCapture(capture, 'hp', f.hp, '\\y{Float}') + ':' +
            Regexes.maybeCapture(capture, 'maxHp', f.maxHp, '\\y{Float}') + ':' +
            Regexes.maybeCapture(capture, 'mp', f.mp, '\\y{Float}') + ':' +
            Regexes.maybeCapture(capture, 'maxMp', f.maxMp, '\\y{Float}') + ':' +
            kField + // tp lol
            kField + // max tp extra lol
            // x, y, z heading may be blank
            Regexes.optional(Regexes.maybeCapture(capture, 'x', f.x, '\\y{Float}')) + ':' +
            Regexes.optional(Regexes.maybeCapture(capture, 'y', f.y, '\\y{Float}')) + ':' +
            Regexes.optional(Regexes.maybeCapture(capture, 'z', f.z, '\\y{Float}')) + ':' +
            Regexes.optional(Regexes.maybeCapture(capture, 'heading', f.heading, '\\y{Float}')) + ':' +
            Regexes.maybeCapture(capture, 'data0', f.data0, '[^:]*?') + ':' +
            Regexes.maybeCapture(capture, 'data1', f.data1, '[^:]*?') + ':' +
            // data2, 3, 4 may not exist and the line may terminate.
            Regexes.optional(Regexes.maybeCapture(capture, 'data2', f.data2, '[^:]*?') + ':') +
            Regexes.optional(Regexes.maybeCapture(capture, 'data3', f.data3, '[^:]*?') + ':') +
            Regexes.optional(Regexes.maybeCapture(capture, 'data4', f.data4, '[^:]*?') + ':');
        return Regexes.parse(str);
    }
    /**
     * fields: targetId, target, effect, source, capture
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#1e-networkbuffremove
     */
    static losesEffect(f) {
        if (typeof f === 'undefined')
            f = {};
        Regexes.validateParams(f, 'losesEffect', losesEffectParams);
        const capture = Regexes.trueIfUndefined(f.capture);
        const str = Regexes.maybeCapture(capture, 'timestamp', '\\y{Timestamp}') +
            ' 1E:' +
            Regexes.maybeCapture(capture, 'targetId', f.targetId, '\\y{ObjectId}') + ':' +
            Regexes.maybeCapture(capture, 'target', f.target, '.*?') +
            ' loses the effect of ' +
            Regexes.maybeCapture(capture, 'effect', f.effect, '.*?') +
            ' from ' +
            Regexes.maybeCapture(capture, 'source', f.source, '.*?') + '\\.';
        return Regexes.parse(str);
    }
    /**
     * fields: source, sourceId, target, targetId, id, capture
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#23-networktether
     */
    static tether(f) {
        if (typeof f === 'undefined')
            f = {};
        Regexes.validateParams(f, 'tether', tetherParams);
        const capture = Regexes.trueIfUndefined(f.capture);
        const str = Regexes.maybeCapture(capture, 'timestamp', '\\y{Timestamp}') +
            ' 23:' +
            Regexes.maybeCapture(capture, 'sourceId', f.sourceId, '\\y{ObjectId}') + ':' +
            Regexes.maybeCapture(capture, 'source', f.source, '[^:]*?') + ':' +
            Regexes.maybeCapture(capture, 'targetId', f.targetId, '\\y{ObjectId}') + ':' +
            Regexes.maybeCapture(capture, 'target', f.target, '[^:]*?') +
            ':....:....:' +
            Regexes.maybeCapture(capture, 'id', f.id, '....') + ':';
        return Regexes.parse(str);
    }
    /**
     * 'target' was defeated by 'source'
     * fields: target, source, capture
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#19-networkdeath
     */
    static wasDefeated(f) {
        if (typeof f === 'undefined')
            f = {};
        Regexes.validateParams(f, 'wasDefeated', wasDefeatedParams);
        const capture = Regexes.trueIfUndefined(f.capture);
        const str = Regexes.maybeCapture(capture, 'timestamp', '\\y{Timestamp}') +
            ' 19:' +
            Regexes.maybeCapture(capture, 'target', f.target, '.*?') +
            ' was defeated by ' +
            Regexes.maybeCapture(capture, 'source', f.source, '.*?') + '\\.';
        return Regexes.parse(str);
    }
    /**
     * fields: name, hp, capture
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#0d-combatanthp
     */
    static hasHP(f) {
        if (typeof f === 'undefined')
            f = {};
        Regexes.validateParams(f, 'hasHP', hasHPParams);
        const capture = Regexes.trueIfUndefined(f.capture);
        const str = Regexes.maybeCapture(capture, 'timestamp', '\\y{Timestamp}') +
            ' 0D:' +
            Regexes.maybeCapture(capture, 'name', f.name, '.*?') +
            ' HP at ' +
            Regexes.maybeCapture(capture, 'hp', f.hp, '\\d+') + '%';
        return Regexes.parse(str);
    }
    /**
     * fields: code, line, capture
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#00-logline
     */
    static echo(f) {
        if (typeof f === 'undefined')
            f = {};
        Regexes.validateParams(f, 'echo', echoParams);
        return Regexes.gameLog({
            line: f.line,
            capture: f.capture,
            code: '0038',
        });
    }
    /**
     * fields: code, line, name, capture
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#00-logline
     */
    static dialog(f) {
        if (typeof f === 'undefined')
            f = {};
        Regexes.validateParams(f, 'dialog', dialogParams);
        const capture = Regexes.trueIfUndefined(f.capture);
        const str = Regexes.maybeCapture(capture, 'timestamp', '\\y{Timestamp}') +
            ' 00:' +
            Regexes.maybeCapture(capture, 'code', '0044') + ':' +
            Regexes.maybeCapture(capture, 'name', f.name, '.*?') + ':' +
            Regexes.maybeCapture(capture, 'line', f.line, '.*') + '$';
        return Regexes.parse(str);
    }
    /**
     * fields: code, line, capture
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#00-logline
     */
    static message(f) {
        if (typeof f === 'undefined')
            f = {};
        Regexes.validateParams(f, 'message', messageParams);
        return Regexes.gameLog({
            line: f.line,
            capture: f.capture,
            code: '0839',
        });
    }
    /**
     * fields: code, line, capture
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#00-logline
     */
    static gameLog(f) {
        if (typeof f === 'undefined')
            f = {};
        Regexes.validateParams(f, 'gameLog', gameLogParams);
        const capture = Regexes.trueIfUndefined(f.capture);
        const str = Regexes.maybeCapture(capture, 'timestamp', '\\y{Timestamp}') +
            ' 00:' +
            Regexes.maybeCapture(capture, 'code', f.code, '....') + ':' +
            Regexes.maybeCapture(capture, 'line', f.line, '.*') + '$';
        return Regexes.parse(str);
    }
    /**
     * fields: code, name, line, capture
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#00-logline
     * Some game log lines have names in them, but not all.  All network log lines for these
     * have empty fields, but these get dropped by the ACT FFXV plugin.
     */
    static gameNameLog(f) {
        if (typeof f === 'undefined')
            f = {};
        Regexes.validateParams(f, 'gameNameLog', gameNameLogParams);
        const capture = Regexes.trueIfUndefined(f.capture);
        const str = Regexes.maybeCapture(capture, 'timestamp', '\\y{Timestamp}') +
            ' 00:' +
            Regexes.maybeCapture(capture, 'code', f.code, '....') + ':' +
            Regexes.maybeCapture(capture, 'name', f.name, '[^:]*') + ':' +
            Regexes.maybeCapture(capture, 'line', f.line, '.*') + '$';
        return Regexes.parse(str);
    }
    /**
     * fields: job, strength, dexterity, vitality, intelligence, mind, piety, attackPower,
     *         directHit, criticalHit, attackMagicPotency, healMagicPotency, determination,
     *         skillSpeed, spellSpeed, tenacity, capture
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#0c-playerstats
     */
    static statChange(f) {
        if (typeof f === 'undefined')
            f = {};
        Regexes.validateParams(f, 'statChange', statChangeParams);
        const capture = Regexes.trueIfUndefined(f.capture);
        const str = Regexes.maybeCapture(capture, 'timestamp', '\\y{Timestamp}') +
            ' 0C:Player Stats: ' +
            Regexes.maybeCapture(capture, 'job', f.job, '\\d+') + ':' +
            Regexes.maybeCapture(capture, 'strength', f.strength, '\\d+') + ':' +
            Regexes.maybeCapture(capture, 'dexterity', f.dexterity, '\\d+') + ':' +
            Regexes.maybeCapture(capture, 'vitality', f.vitality, '\\d+') + ':' +
            Regexes.maybeCapture(capture, 'intelligence', f.intelligence, '\\d+') + ':' +
            Regexes.maybeCapture(capture, 'mind', f.mind, '\\d+') + ':' +
            Regexes.maybeCapture(capture, 'piety', f.piety, '\\d+') + ':' +
            Regexes.maybeCapture(capture, 'attackPower', f.attackPower, '\\d+') + ':' +
            Regexes.maybeCapture(capture, 'directHit', f.directHit, '\\d+') + ':' +
            Regexes.maybeCapture(capture, 'criticalHit', f.criticalHit, '\\d+') + ':' +
            Regexes.maybeCapture(capture, 'attackMagicPotency', f.attackMagicPotency, '\\d+') + ':' +
            Regexes.maybeCapture(capture, 'healMagicPotency', f.healMagicPotency, '\\d+') + ':' +
            Regexes.maybeCapture(capture, 'determination', f.determination, '\\d+') + ':' +
            Regexes.maybeCapture(capture, 'skillSpeed', f.skillSpeed, '\\d+') + ':' +
            Regexes.maybeCapture(capture, 'spellSpeed', f.spellSpeed, '\\d+') +
            ':0:' +
            Regexes.maybeCapture(capture, 'tenacity', f.tenacity, '\\d+');
        return Regexes.parse(str);
    }
    /**
     * fields: name, capture
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#01-changezone
     */
    static changeZone(f) {
        if (typeof f === 'undefined')
            f = {};
        Regexes.validateParams(f, 'changeZone', changeZoneParams);
        const capture = Regexes.trueIfUndefined(f.capture);
        const str = Regexes.maybeCapture(capture, 'timestamp', '\\y{Timestamp}') +
            ' 01:Changed Zone to ' +
            Regexes.maybeCapture(capture, 'name', f.name, '.*?') + '\\.';
        return Regexes.parse(str);
    }
    /**
     * fields: instance, command, data0, data1, data2, data3
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#21-network6d-actor-control-lines
     */
    static network6d(f) {
        if (typeof f === 'undefined')
            f = {};
        Regexes.validateParams(f, 'network6d', network6dParams);
        const capture = Regexes.trueIfUndefined(f.capture);
        const str = Regexes.maybeCapture(capture, 'timestamp', '\\y{Timestamp}') +
            ' 21:' +
            Regexes.maybeCapture(capture, 'instance', f.instance, '.*?') + ':' +
            Regexes.maybeCapture(capture, 'command', f.command, '.*?') + ':' +
            Regexes.maybeCapture(capture, 'data0', f.data0, '.*?') + ':' +
            Regexes.maybeCapture(capture, 'data1', f.data1, '.*?') + ':' +
            Regexes.maybeCapture(capture, 'data2', f.data2, '.*?') + ':' +
            Regexes.maybeCapture(capture, 'data3', f.data3, '.*?') + '$';
        return Regexes.parse(str);
    }
    /**
     * Helper function for building named capture group
     */
    static maybeCapture(capture, name, value, defaultValue) {
        if (!value)
            value = defaultValue;
        value = Regexes.anyOf(value);
        return capture ? Regexes.namedCapture(name, value) : value;
    }
    static optional(str) {
        return `(?:${str})?`;
    }
    // Creates a named regex capture group named |name| for the match |value|.
    static namedCapture(name, value) {
        if (name.includes('>'))
            console.error('"' + name + '" contains ">".');
        if (name.includes('<'))
            console.error('"' + name + '" contains ">".');
        return '(?<' + name + '>' + value + ')';
    }
    /**
     * Convenience for turning multiple args into a unioned regular expression.
     * anyOf(x, y, z) or anyOf([x, y, z]) do the same thing, and return (?:x|y|z).
     * anyOf(x) or anyOf(x) on its own simplifies to just x.
     * args may be strings or RegExp, although any additional markers to RegExp
     * like /insensitive/i are dropped.
     */
    static anyOf(...args) {
        const anyOfArray = (array) => {
            return `(?:${array.map((elem) => elem instanceof RegExp ? elem.source : elem).join('|')})`;
        };
        let array = [];
        if (args.length === 1) {
            if (Array.isArray(args[0]))
                array = args[0];
            else if (args[0])
                array = [args[0]];
            else
                array = [];
        }
        else {
            // TODO: more accurate type instead of `as` cast
            array = args;
        }
        return anyOfArray(array);
    }
    static parse(regexpString) {
        const kCactbotCategories = {
            Timestamp: '^.{14}',
            NetTimestamp: '.{33}',
            NetField: '(?:[^|]*\\|)',
            LogType: '[0-9A-Fa-f]{2}',
            AbilityCode: '[0-9A-Fa-f]{1,8}',
            ObjectId: '[0-9A-F]{8}',
            // Matches any character name (including empty strings which the FFXIV
            // ACT plugin can generate when unknown).
            Name: '(?:[^\\s:|]+(?: [^\\s:|]+)?|)',
            // Floats can have comma as separator in FFXIV plugin output: https://github.com/ravahn/FFXIV_ACT_Plugin/issues/137
            Float: '-?[0-9]+(?:[.,][0-9]+)?(?:E-?[0-9]+)?',
        };
        // All regexes in cactbot are case insensitive.
        // This avoids headaches as things like `Vice and Vanity` turns into
        // `Vice And Vanity`, especially for French and German.  It appears to
        // have a ~20% regex parsing overhead, but at least they work.
        let modifiers = 'i';
        if (regexpString instanceof RegExp) {
            modifiers += (regexpString.global ? 'g' : '') +
                (regexpString.multiline ? 'm' : '');
            regexpString = regexpString.source;
        }
        regexpString = regexpString.replace(/\\y\{(.*?)\}/g, (match, group) => {
            return kCactbotCategories[group] || match;
        });
        return new RegExp(regexpString, modifiers);
    }
    // Like Regex.Regexes.parse, but force global flag.
    static parseGlobal(regexpString) {
        const regex = Regexes.parse(regexpString);
        let modifiers = 'gi';
        if (regexpString instanceof RegExp)
            modifiers += (regexpString.multiline ? 'm' : '');
        return new RegExp(regex.source, modifiers);
    }
    static trueIfUndefined(value) {
        if (typeof (value) === 'undefined')
            return true;
        return !!value;
    }
    static validateParams(f, funcName, params) {
        if (f === null)
            return;
        if (typeof f !== 'object')
            return;
        const keys = Object.keys(f);
        for (let k = 0; k < keys.length; ++k) {
            const key = keys[k];
            if (key && !params.includes(key)) {
                throw new Error(`${funcName}: invalid parameter '${key}'.  ` +
                    `Valid params: ${JSON.stringify(params)}`);
            }
        }
    }
}

;// CONCATENATED MODULE: ./resources/netregexes.ts

// Differences from Regexes:
// * may have more fields
// * AddedCombatant npc id is broken up into npcNameId and npcBaseId
// * gameLog always splits name into its own field (but previously wouldn't)
const separator = '\\|';
const matchDefault = '[^|]*';
// If NetRegexes.setFlagTranslationsNeeded is set to true, then any
// regex created that requires a translation will begin with this string
// and match the magicStringRegex.  This is maybe a bit goofy, but is
// a pretty straightforward way to mark regexes for translations.
// If issue #1306 is ever resolved, we can remove this.
const magicTranslationString = `^^`;
const magicStringRegex = /^\^\^/;
const keysThatRequireTranslation = [
    'ability',
    'name',
    'source',
    'target',
    'line',
];
const parseHelper = (params, funcName, fields) => {
    var _a, _b, _c, _d, _e, _f;
    params = params !== null && params !== void 0 ? params : {};
    const validFields = [];
    for (const value of Object.values(fields)) {
        if (typeof value !== 'object')
            continue;
        validFields.push(value.field);
    }
    Regexes.validateParams(params, funcName, ['capture', ...validFields]);
    // Find the last key we care about, so we can shorten the regex if needed.
    const capture = Regexes.trueIfUndefined(params.capture);
    const fieldKeys = Object.keys(fields);
    let maxKey;
    if (capture) {
        maxKey = fieldKeys[fieldKeys.length - 1];
    }
    else {
        maxKey = 0;
        for (const key of fieldKeys) {
            const value = (_a = fields[key]) !== null && _a !== void 0 ? _a : {};
            if (typeof value !== 'object')
                continue;
            const fieldName = (_b = fields[key]) === null || _b === void 0 ? void 0 : _b.field;
            if (fieldName && fieldName in params)
                maxKey = key;
        }
    }
    // For testing, it's useful to know if this is a regex that requires
    // translation.  We test this by seeing if there are any specified
    // fields, and if so, inserting a magic string that we can detect.
    // This lets us differentiate between "regex that should be translated"
    // e.g. a regex with `target` specified, and "regex that shouldn't"
    // e.g. a gains effect with just effectId specified.
    const transParams = Object.keys(params).filter((k) => keysThatRequireTranslation.includes(k));
    const needsTranslations = NetRegexes.flagTranslationsNeeded && transParams.length > 0;
    // Build the regex from the fields.
    let str = needsTranslations ? magicTranslationString : '^';
    let lastKey = -1;
    for (const _key in fields) {
        const key = parseInt(_key);
        // Fill in blanks.
        const missingFields = key - lastKey - 1;
        if (missingFields === 1)
            str += '\\y{NetField}';
        else if (missingFields > 1)
            str += `\\y{NetField}{${missingFields}}`;
        lastKey = key;
        const value = fields[key];
        if (typeof value !== 'object')
            throw new Error(`${funcName}: invalid value: ${JSON.stringify(value)}`);
        const fieldName = (_c = fields[key]) === null || _c === void 0 ? void 0 : _c.field;
        const fieldValue = (_f = (_e = (_d = fields[key]) === null || _d === void 0 ? void 0 : _d.value) === null || _e === void 0 ? void 0 : _e.toString()) !== null && _f !== void 0 ? _f : matchDefault;
        if (fieldName) {
            str += Regexes.maybeCapture(
            // more accurate type instead of `as` cast
            // maybe this function needs a refactoring
            capture, fieldName, params[fieldName], fieldValue) +
                separator;
        }
        else {
            str += fieldValue + separator;
        }
        // Stop if we're not capturing and don't care about future fields.
        if (key >= (maxKey !== null && maxKey !== void 0 ? maxKey : 0))
            break;
    }
    return Regexes.parse(str);
};
class NetRegexes {
    static setFlagTranslationsNeeded(value) {
        NetRegexes.flagTranslationsNeeded = value;
    }
    static doesNetRegexNeedTranslation(regex) {
        // Need to `setFlagTranslationsNeeded` before calling this function.
        console.assert(NetRegexes.flagTranslationsNeeded);
        const str = typeof regex === 'string' ? regex : regex.source;
        return !!magicStringRegex.exec(str);
    }
    /**
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#14-networkstartscasting
     */
    static startsUsing(params) {
        return parseHelper(params, 'startsUsing', {
            0: { field: 'type', value: '20' },
            1: { field: 'timestamp' },
            2: { field: 'sourceId' },
            3: { field: 'source' },
            4: { field: 'id' },
            5: { field: 'ability' },
            6: { field: 'targetId' },
            7: { field: 'target' },
            8: { field: 'castTime' },
        });
    }
    /**
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#15-networkability
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#16-networkaoeability
     */
    static ability(params) {
        return parseHelper(params, 'ability', {
            0: { field: 'type', value: '2[12]' },
            1: { field: 'timestamp' },
            2: { field: 'sourceId' },
            3: { field: 'source' },
            4: { field: 'id' },
            5: { field: 'ability' },
            6: { field: 'targetId' },
            7: { field: 'target' },
        });
    }
    /**
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#15-networkability
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#16-networkaoeability
     */
    static abilityFull(params) {
        return parseHelper(params, 'abilityFull', {
            0: { field: 'type', value: '2[12]' },
            1: { field: 'timestamp' },
            2: { field: 'sourceId' },
            3: { field: 'source' },
            4: { field: 'id' },
            5: { field: 'ability' },
            6: { field: 'targetId' },
            7: { field: 'target' },
            8: { field: 'flags' },
            9: { field: 'damage' },
            24: { field: 'targetCurrentHp' },
            25: { field: 'targetMaxHp' },
            40: { field: 'x' },
            41: { field: 'y' },
            42: { field: 'z' },
            43: { field: 'heading' },
        });
    }
    /**
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#1b-networktargeticon-head-markers
     */
    static headMarker(params) {
        return parseHelper(params, 'headMarker', {
            0: { field: 'type', value: '27' },
            1: { field: 'timestamp' },
            2: { field: 'targetId' },
            3: { field: 'target' },
            6: { field: 'id' },
        });
    }
    /**
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#03-addcombatant
     */
    static addedCombatant(params) {
        return parseHelper(params, 'addedCombatant', {
            0: { field: 'type', value: '03' },
            1: { field: 'timestamp' },
            2: { field: 'id' },
            3: { field: 'name' },
        });
    }
    /**
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#03-addcombatant
     */
    static addedCombatantFull(params) {
        return parseHelper(params, 'addedCombatantFull', {
            0: { field: 'type', value: '03' },
            1: { field: 'timestamp' },
            2: { field: 'id' },
            3: { field: 'name' },
            4: { field: 'job' },
            5: { field: 'level' },
            6: { field: 'ownerId' },
            8: { field: 'world' },
            9: { field: 'npcNameId' },
            10: { field: 'npcBaseId' },
            11: { field: 'currentHp' },
            12: { field: 'hp' },
            17: { field: 'x' },
            18: { field: 'y' },
            19: { field: 'z' },
            20: { field: 'heading' },
        });
    }
    /**
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#04-removecombatant
     */
    static removingCombatant(params) {
        return parseHelper(params, 'removingCombatant', {
            0: { field: 'type', value: '04' },
            1: { field: 'timestamp' },
            2: { field: 'id' },
            3: { field: 'name' },
            12: { field: 'hp' },
        });
    }
    /**
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#1a-networkbuff
     */
    static gainsEffect(params) {
        return parseHelper(params, 'gainsEffect', {
            0: { field: 'type', value: '26' },
            1: { field: 'timestamp' },
            2: { field: 'effectId' },
            3: { field: 'effect' },
            4: { field: 'duration' },
            5: { field: 'sourceId' },
            6: { field: 'source' },
            7: { field: 'targetId' },
            8: { field: 'target' },
            9: { field: 'count' },
        });
    }
    /**
     * Prefer gainsEffect over this function unless you really need extra data.
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#26-networkstatuseffects
     */
    static statusEffectExplicit(params) {
        return parseHelper(params, 'statusEffectExplicit', {
            0: { field: 'type', value: '38' },
            1: { field: 'timestamp' },
            2: { field: 'targetId' },
            3: { field: 'target' },
            5: { field: 'hp' },
            6: { field: 'maxHp' },
            11: { field: 'x' },
            12: { field: 'y' },
            13: { field: 'z' },
            14: { field: 'heading' },
            15: { field: 'data0' },
            16: { field: 'data1' },
            17: { field: 'data2' },
            18: { field: 'data3' },
            19: { field: 'data4' },
        });
    }
    /**
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#1e-networkbuffremove
     */
    static losesEffect(params) {
        return parseHelper(params, 'losesEffect', {
            0: { field: 'type', value: '30' },
            1: { field: 'timestamp' },
            2: { field: 'effectId' },
            3: { field: 'effect' },
            5: { field: 'sourceId' },
            6: { field: 'source' },
            7: { field: 'targetId' },
            8: { field: 'target' },
            9: { field: 'count' },
        });
    }
    /**
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#23-networktether
     */
    static tether(params) {
        return parseHelper(params, 'tether', {
            0: { field: 'type', value: '35' },
            1: { field: 'timestamp' },
            2: { field: 'sourceId' },
            3: { field: 'source' },
            4: { field: 'targetId' },
            5: { field: 'target' },
            8: { field: 'id' },
        });
    }
    /**
     * 'target' was defeated by 'source'
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#19-networkdeath
     */
    static wasDefeated(params) {
        return parseHelper(params, 'wasDefeated', {
            0: { field: 'type', value: '25' },
            1: { field: 'timestamp' },
            2: { field: 'targetId' },
            3: { field: 'target' },
            4: { field: 'sourceId' },
            5: { field: 'source' },
        });
    }
    /**
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#00-logline
     */
    static echo(params) {
        if (typeof params === 'undefined')
            params = {};
        Regexes.validateParams(params, 'echo', ['type', 'timestamp', 'code', 'name', 'line', 'capture']);
        params.code = '0038';
        return NetRegexes.gameLog(params);
    }
    /**
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#00-logline
     */
    static dialog(params) {
        if (typeof params === 'undefined')
            params = {};
        Regexes.validateParams(params, 'dialog', ['type', 'timestamp', 'code', 'name', 'line', 'capture']);
        params.code = '0044';
        return NetRegexes.gameLog(params);
    }
    /**
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#00-logline
     */
    static message(params) {
        if (typeof params === 'undefined')
            params = {};
        Regexes.validateParams(params, 'message', ['type', 'timestamp', 'code', 'name', 'line', 'capture']);
        params.code = '0839';
        return NetRegexes.gameLog(params);
    }
    /**
     * fields: code, name, line, capture
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#00-logline
     */
    static gameLog(params) {
        return parseHelper(params, 'gameLog', {
            0: { field: 'type', value: '00' },
            1: { field: 'timestamp' },
            2: { field: 'code' },
            3: { field: 'name' },
            4: { field: 'line' },
        });
    }
    /**
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#00-logline
     */
    static gameNameLog(params) {
        // for compat with Regexes.
        return NetRegexes.gameLog(params);
    }
    /**
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#0c-playerstats
     */
    static statChange(params) {
        return parseHelper(params, 'statChange', {
            0: { field: 'type', value: '12' },
            1: { field: 'timestamp' },
            2: { field: 'job' },
            3: { field: 'strength' },
            4: { field: 'dexterity' },
            5: { field: 'vitality' },
            6: { field: 'intelligence' },
            7: { field: 'mind' },
            8: { field: 'piety' },
            9: { field: 'attackPower' },
            10: { field: 'directHit' },
            11: { field: 'criticalHit' },
            12: { field: 'attackMagicPotency' },
            13: { field: 'healMagicPotency' },
            14: { field: 'determination' },
            15: { field: 'skillSpeed' },
            16: { field: 'spellSpeed' },
            18: { field: 'tenacity' },
        });
    }
    /**
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#01-changezone
     */
    static changeZone(params) {
        return parseHelper(params, 'changeZone', {
            0: { field: 'type', value: '01' },
            1: { field: 'timestamp' },
            2: { field: 'id' },
            3: { field: 'name' },
        });
    }
    /**
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#21-network6d-actor-control-lines
     */
    static network6d(params) {
        return parseHelper(params, 'network6d', {
            0: { field: 'type', value: '33' },
            1: { field: 'timestamp' },
            2: { field: 'instance' },
            3: { field: 'command' },
            4: { field: 'data0' },
            5: { field: 'data1' },
            6: { field: 'data2' },
            7: { field: 'data3' },
        });
    }
    /**
     * matches: https://github.com/quisquous/cactbot/blob/main/docs/LogGuide.md#22-networknametoggle
     */
    static nameToggle(params) {
        return parseHelper(params, 'nameToggle', {
            0: { field: 'type', value: '34' },
            1: { field: 'timestamp' },
            2: { field: 'id' },
            3: { field: 'name' },
            6: { field: 'toggle' },
        });
    }
}
NetRegexes.flagTranslationsNeeded = false;

;// CONCATENATED MODULE: ./resources/translations.ts


// Fill in LocaleRegex so that things like LocaleRegex.countdownStart.de is a valid regex.
const localeLines = {
    countdownStart: {
        en: 'Battle commencing in (?<time>\\y{Float}) seconds! \\((?<player>.*?)\\)',
        de: 'Noch (?<time>\\y{Float}) Sekunden bis Kampfbeginn! \\((?<player>.*?)\\)',
        fr: 'Début du combat dans (?<time>\\y{Float}) secondes[ ]?! \\((?<player>.*?)\\)',
        ja: '戦闘開始まで(?<time>\\y{Float})秒！ \\((?<player>.*?)\\)',
        cn: '距离战斗开始还有(?<time>\\y{Float})秒！ （(?<player>.*?)）',
        ko: '전투 시작 (?<time>\\y{Float})초 전! \\((?<player>.*?)\\)',
    },
    countdownEngage: {
        en: 'Engage!',
        de: 'Start!',
        fr: 'À l\'attaque[ ]?!',
        ja: '戦闘開始！',
        cn: '战斗开始！',
        ko: '전투 시작!',
    },
    countdownCancel: {
        en: 'Countdown canceled by (?<player>\\y{Name})',
        de: '(?<player>\\y{Name}) hat den Countdown abgebrochen',
        fr: 'Le compte à rebours a été interrompu par (?<player>\\y{Name})[ ]?\\.',
        ja: '(?<player>\\y{Name})により、戦闘開始カウントがキャンセルされました。',
        cn: '(?<player>\\y{Name})取消了战斗开始倒计时。',
        ko: '(?<player>\\y{Name}) 님이 초읽기를 취소했습니다\\.',
    },
    areaSeal: {
        en: '(?<area>.*?) will be sealed off in (?<time>\\y{Float}) seconds!',
        de: 'Noch (?<time>\\y{Float}) Sekunden, bis sich (?<area>.*?) schließt',
        fr: 'Fermeture (?<area>.*?) dans (?<time>\\y{Float}) secondes[ ]?\\.',
        ja: '(?<area>.*?)の封鎖まであと(?<time>\\y{Float})秒',
        cn: '距(?<area>.*?)被封锁还有(?<time>\\y{Float})秒',
        ko: '(?<time>\\y{Float})초 후에 (?<area>.*?)(이|가) 봉쇄됩니다\\.',
    },
    areaUnseal: {
        en: '(?<area>.*?) is no longer sealed.',
        de: '(?<area>.*?) öffnet sich erneut.',
        fr: 'Ouverture (?<area>.*?)[ ]?!',
        ja: '(?<area>.*?)の封鎖が解かれた……',
        cn: '(?<area>.*?)的封锁解除了',
        ko: '(?<area>.*?)의 봉쇄가 해제되었습니다\\.',
    },
    // Recipe name always start with \ue0bb
    // HQ icon is \ue03c
    craftingStart: {
        en: 'You begin synthesizing (?<count>(an?|\\d+) )?\ue0bb(?<recipe>.*)\\.',
        de: 'Du hast begonnen, durch Synthese (?<count>(ein(e|es|em|er)?|\\d+) )?\ue0bb(?<recipe>.*) herzustellen\\.',
        fr: 'Vous commencez à fabriquer (?<count>(une?|\\d+) )?\ue0bb(?<recipe>.*)\\.',
        ja: '(?<player>\\y{Name})は\ue0bb(?<recipe>.*)(×(?<count>\\d+))?の製作を開始した。',
        cn: '(?<player>\\y{Name})开始制作“\ue0bb(?<recipe>.*)”(×(?<count>\\d+))?。',
        ko: '\ue0bb(?<recipe>.*)(×(?<count>\\d+)개)? 제작을 시작합니다\\.',
    },
    trialCraftingStart: {
        en: 'You begin trial synthesis of \ue0bb(?<recipe>.*)\\.',
        de: 'Du hast mit der Testsynthese von \ue0bb(?<recipe>.*) begonnen\\.',
        fr: 'Vous commencez une synthèse d\'essai pour une? \ue0bb(?<recipe>.*)\\.',
        ja: '(?<player>\\y{Name})は\ue0bb(?<recipe>.*)の製作練習を開始した。',
        cn: '(?<player>\\y{Name})开始练习制作\ue0bb(?<recipe>.*)。',
        ko: '\ue0bb(?<recipe>.*) 제작 연습을 시작합니다\\.',
    },
    craftingFinish: {
        en: 'You synthesize (?<count>(an?|\\d+) )?\ue0bb(?<recipe>.*)(\ue03c)?\\.',
        de: 'Du hast erfolgreich (?<count>(ein(e|es|em|er)?|\\d+) )?(?<recipe>.*)(\ue03c)? hergestellt\\.',
        fr: 'Vous fabriquez (?<count>(une?|\\d+) )?\ue0bb(?<recipe>.*)(\ue03c)?\\.',
        ja: '(?<player>\\y{Name})は\ue0bb(?<recipe>.*)(\ue03c)?(×(?<count>\\d+))?を完成させた！',
        cn: '(?<player>\\y{Name})制作“\ue0bb(?<recipe>.*)(\ue03c)?”(×(?<count>\\d+))?成功！',
        ko: '(?<player>\\y{Name}) 님이 \ue0bb(?<recipe>.*)(\ue03c)?(×(?<count>\\d+)개)?(을|를) 완성했습니다!',
    },
    trialCraftingFinish: {
        en: 'Your trial synthesis of \ue0bb(?<recipe>.*) proved a success!',
        de: 'Die Testsynthese von \ue0bb(?<recipe>.*) war erfolgreich!',
        fr: 'Votre synthèse d\'essai pour fabriquer \ue0bb(?<recipe>.*) a été couronnée de succès!',
        ja: '(?<player>\\y{Name})は\ue0bb(?<recipe>.*)の製作練習に成功した！',
        cn: '(?<player>\\y{Name})练习制作\ue0bb(?<recipe>.*)成功了！',
        ko: '\ue0bb(?<recipe>.*) 제작 연습에 성공했습니다!',
    },
    craftingFail: {
        en: 'Your synthesis fails!',
        de: 'Deine Synthese ist fehlgeschlagen!',
        fr: 'La synthèse échoue\\.{3}',
        ja: '(?<player>\\y{Name})は製作に失敗した……',
        cn: '(?<player>\\y{Name})制作失败了……',
        ko: '제작에 실패했습니다……\\.',
    },
    trialCraftingFail: {
        en: 'Your trial synthesis of \ue0bb(?<recipe>.*) failed\\.{3}',
        de: 'Die Testsynthese von \ue0bb(?<recipe>.*) ist fehlgeschlagen\\.{3}',
        fr: 'Votre synthèse d\'essai pour fabriquer \ue0bb(?<recipe>.*) s\'est soldée par un échec\\.{3}',
        ja: '(?<player>\\y{Name})は\ue0bb(?<recipe>.*)の製作練習に失敗した……',
        cn: '(?<player>\\y{Name})练习制作\ue0bb(?<recipe>.*)失败了……',
        ko: '\ue0bb(?<recipe>.*) 제작 연습에 실패했습니다……\\.',
    },
    craftingCancel: {
        en: 'You cancel the synthesis\\.',
        de: 'Du hast die Synthese abgebrochen\\.',
        fr: 'La synthèse est annulée\\.',
        ja: '(?<player>\\y{Name})は製作を中止した。',
        cn: '(?<player>\\y{Name})中止了制作作业。',
        ko: '제작을 중지했습니다\\.',
    },
    trialCraftingCancel: {
        en: 'You abandoned trial synthesis\\.',
        de: 'Testsynthese abgebrochen\\.',
        fr: 'Vous avez interrompu la synthèse d\'essai\\.',
        ja: '(?<player>\\y{Name})は製作練習を中止した。',
        cn: '(?<player>\\y{Name})停止了练习。',
        ko: '제작 연습을 중지했습니다\\.',
    },
};
class RegexSet {
    get localeRegex() {
        if (this.regexes)
            return this.regexes;
        this.regexes = this.buildLocaleRegexes(localeLines, (s) => Regexes.gameLog({ line: s + '.*?' }));
        return this.regexes;
    }
    get localeNetRegex() {
        if (this.netRegexes)
            return this.netRegexes;
        this.netRegexes = this.buildLocaleRegexes(localeLines, (s) => NetRegexes.gameLog({ line: s + '[^|]*?' }));
        return this.netRegexes;
    }
    buildLocaleRegexes(locales, builder) {
        return Object.fromEntries(Object
            .entries(locales)
            .map(([key, lines]) => [key, this.buildLocaleRegex(lines, builder)]));
    }
    buildLocaleRegex(lines, builder) {
        const regexEn = builder(lines.en);
        return {
            en: regexEn,
            de: lines.de ? builder(lines.de) : regexEn,
            fr: lines.fr ? builder(lines.fr) : regexEn,
            ja: lines.ja ? builder(lines.ja) : regexEn,
            cn: lines.cn ? builder(lines.cn) : regexEn,
            ko: lines.ko ? builder(lines.ko) : regexEn,
        };
    }
}
const regexSet = new RegexSet();
const LocaleRegex = regexSet.localeRegex;
const LocaleNetRegex = regexSet.localeNetRegex;

;// CONCATENATED MODULE: ./ui/raidboss/emulator/EmulatorCommon.ts


class EmulatorCommon {
    static cloneData(data, exclude = ['options', 'party']) {
        const ret = {};
        // Use extra logic for top-level extend for property exclusion
        // This cut the execution time of this code from 41,000ms to 50ms when parsing a 12 minute pull
        for (const i in data) {
            if (exclude.includes(i))
                continue;
            if (typeof data[i] === 'object')
                ret[i] = EmulatorCommon._cloneData(data[i]);
            else
                // Assignment of any to any. See DataType definition above for reasoning.
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                ret[i] = data[i];
        }
        return ret;
    }
    static _cloneData(data) {
        if (typeof data === 'object') {
            if (Array.isArray(data)) {
                const ret = [];
                for (let i = 0; i < data.length; ++i)
                    ret[i] = EmulatorCommon._cloneData(data[i]);
                return ret;
            }
            if (data === null)
                return null;
            if (data instanceof RegExp)
                return new RegExp(data);
            const ret = {};
            for (const i in data)
                ret[i] = EmulatorCommon._cloneData(data[i]);
            return ret;
        }
        return data;
    }
    static timeToString(time, includeMillis = true) {
        const negative = time < 0 ? '-' : '';
        time = Math.abs(time);
        const millisNum = time % 1000;
        const secsNum = ((time % (60 * 1000)) - millisNum) / 1000;
        // Milliseconds
        const millis = `00${millisNum}`.substr(-3);
        const secs = `0${secsNum}`.substr(-2);
        const mins = `0${((((time % (60 * 60 * 1000)) - millisNum) / 1000) - secsNum) / 60}`.substr(-2);
        return negative + mins + ':' + secs + (includeMillis ? '.' + millis : '');
    }
    static timeToDateString(time) {
        return this.dateObjectToDateString(new Date(time));
    }
    static dateObjectToDateString(date) {
        const year = date.getFullYear();
        const month = EmulatorCommon.zeroPad((date.getMonth() + 1).toString());
        const day = EmulatorCommon.zeroPad(date.getDate().toString());
        return `${year}-${month}-${day}`;
    }
    static timeToTimeString(time, includeMillis = false) {
        return this.dateObjectToTimeString(new Date(time), includeMillis);
    }
    static dateObjectToTimeString(date, includeMillis = false) {
        const hour = EmulatorCommon.zeroPad(date.getHours().toString());
        const minute = EmulatorCommon.zeroPad(date.getMinutes().toString());
        const second = EmulatorCommon.zeroPad(date.getSeconds().toString());
        let ret = `${hour}:${minute}:${second}`;
        if (includeMillis)
            ret = ret + `.${date.getMilliseconds()}`;
        return ret;
    }
    static msToDuration(ms) {
        const tmp = EmulatorCommon.timeToString(ms, false);
        return tmp.replace(':', 'm') + 's';
    }
    static dateTimeToString(time, includeMillis = false) {
        const date = new Date(time);
        return `${this.dateObjectToDateString(date)} ${this.dateObjectToTimeString(date, includeMillis)}`;
    }
    static zeroPad(str, len = 2) {
        return ('' + str).padStart(len, '0');
    }
    static properCase(str) {
        return str.replace(/([^\W_]+[^\s-]*) */g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
    static spacePadLeft(str, len) {
        return str.padStart(len, ' ');
    }
    static doesLineMatch(line, regexes) {
        if (regexes instanceof RegExp)
            return regexes.exec(line);
        for (const langStr in regexes) {
            const lang = langStr;
            const res = regexes[lang].exec(line);
            if (res) {
                if (res.groups)
                    res.groups.language = lang;
                return res;
            }
        }
        return null;
    }
    static matchStart(line) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        let res;
        // Currently all of these regexes have groups if they match at all,
        // but be robust to that changing in the future.
        res = EmulatorCommon.doesLineMatch(line, EmulatorCommon.countdownRegexes);
        if (res) {
            return {
                StartIn: (parseInt((_b = (_a = res.groups) === null || _a === void 0 ? void 0 : _a.time) !== null && _b !== void 0 ? _b : '0') * 1000).toString(),
                StartType: 'Countdown',
                language: (_d = (_c = res.groups) === null || _c === void 0 ? void 0 : _c.language) !== null && _d !== void 0 ? _d : undefined,
            };
        }
        res = EmulatorCommon.doesLineMatch(line, EmulatorCommon.sealRegexes);
        if (res) {
            return {
                StartIn: '0',
                StartType: 'Seal',
                language: (_f = (_e = res.groups) === null || _e === void 0 ? void 0 : _e.language) !== null && _f !== void 0 ? _f : undefined,
            };
        }
        res = EmulatorCommon.doesLineMatch(line, EmulatorCommon.engageRegexes);
        if (res) {
            return {
                StartIn: '0',
                StartType: 'Engage',
                language: (_h = (_g = res.groups) === null || _g === void 0 ? void 0 : _g.language) !== null && _h !== void 0 ? _h : undefined,
            };
        }
    }
    static matchEnd(line) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        let res;
        // Currently all of these regexes have groups if they match at all,
        // but be robust to that changing in the future.
        res = EmulatorCommon.doesLineMatch(line, EmulatorCommon.winRegex);
        if (res) {
            return {
                EndType: 'Win',
                language: (_b = (_a = res.groups) === null || _a === void 0 ? void 0 : _a.language) !== null && _b !== void 0 ? _b : undefined,
            };
        }
        res = EmulatorCommon.doesLineMatch(line, EmulatorCommon.wipeRegex);
        if (res) {
            return {
                EndType: 'Wipe',
                language: (_d = (_c = res.groups) === null || _c === void 0 ? void 0 : _c.language) !== null && _d !== void 0 ? _d : undefined,
            };
        }
        res = EmulatorCommon.doesLineMatch(line, EmulatorCommon.cactbotWipeRegex);
        if (res) {
            return {
                EndType: 'Cactbot Wipe',
                language: (_f = (_e = res.groups) === null || _e === void 0 ? void 0 : _e.language) !== null && _f !== void 0 ? _f : undefined,
            };
        }
        res = EmulatorCommon.doesLineMatch(line, EmulatorCommon.unsealRegexes);
        if (res) {
            return {
                EndType: 'Unseal',
                language: (_h = (_g = res.groups) === null || _g === void 0 ? void 0 : _g.language) !== null && _h !== void 0 ? _h : undefined,
            };
        }
    }
}
EmulatorCommon.sealRegexes = LocaleNetRegex.areaSeal;
EmulatorCommon.engageRegexes = LocaleNetRegex.countdownEngage;
EmulatorCommon.countdownRegexes = LocaleNetRegex.countdownStart;
EmulatorCommon.unsealRegexes = LocaleNetRegex.areaUnseal;
EmulatorCommon.wipeRegex = NetRegexes.network6d({ command: '40000010' });
EmulatorCommon.winRegex = NetRegexes.network6d({ command: '40000003' });
EmulatorCommon.cactbotWipeRegex = NetRegexes.echo({ line: 'cactbot wipe.*?' });

;// CONCATENATED MODULE: ./resources/not_reached.ts
// Helper Error for TypeScript situations where the programmer thinks they
// know better than TypeScript that some situation will never occur.
// The intention here is that the programmer does not expect a particular
// bit of code to happen, and so has not written careful error handling.
// If it does occur, at least there will be an error and we can figure out why.
// This is preferable to casting or disabling TypeScript altogether in order to
// avoid syntax errors.
// One common example is a regex, where if the regex matches then all of the
// (non-optional) regex groups will also be valid, but TypeScript doesn't know.
class UnreachableCode extends Error {
    constructor() {
        super('This code shouldn\'t be reached');
    }
}

;// CONCATENATED MODULE: ./ui/raidboss/emulator/data/Combatant.ts

class Combatant {
    constructor(id, name) {
        this.name = '';
        this.server = '';
        this.states = {};
        this.significantStates = [];
        this.latestTimestamp = -1;
        this.id = id;
        this.setName(name);
    }
    setName(name) {
        var _a, _b, _c;
        // Sometimes network lines arrive after the combatant has been cleared
        // from memory in the client, so the network line will have a valid ID
        // but the name will be blank. Since we're tracking the name for the
        // entire fight and not on a state-by-state basis, we don't want to
        // blank out a name in this case.
        // If a combatant actually has a blank name, that's still allowed by
        // the constructor.
        if (name === '')
            return;
        const parts = name.split('(');
        this.name = (_a = parts[0]) !== null && _a !== void 0 ? _a : '';
        if (parts.length > 1)
            this.server = (_c = (_b = parts[1]) === null || _b === void 0 ? void 0 : _b.replace(/\)$/, '')) !== null && _c !== void 0 ? _c : '';
    }
    hasState(timestamp) {
        return this.states[timestamp] !== undefined;
    }
    pushState(timestamp, state) {
        this.states[timestamp] = state;
        this.latestTimestamp = timestamp;
        if (!this.significantStates.includes(timestamp))
            this.significantStates.push(timestamp);
    }
    nextSignificantState(timestamp) {
        var _a;
        // Shortcut out if this is significant or if there's no higher significant state
        const index = this.significantStates.indexOf(timestamp);
        const lastSignificantStateIndex = this.significantStates.length - 1;
        // If timestamp is a significant state already, and it's not the last one, return the next
        if (index >= 0 && index < lastSignificantStateIndex)
            return this.getStateByIndex(index + 1);
        // If timestamp is the last significant state or the timestamp is past the last significant
        // state, return the last significant state
        else if (index === lastSignificantStateIndex ||
            timestamp > ((_a = this.significantStates[lastSignificantStateIndex]) !== null && _a !== void 0 ? _a : 0))
            return this.getStateByIndex(lastSignificantStateIndex);
        for (let i = 0; i < this.significantStates.length; ++i) {
            const stateIndex = this.significantStates[i];
            if (stateIndex && stateIndex > timestamp)
                return this.getStateByIndex(i);
        }
        return this.getStateByIndex(this.significantStates.length - 1);
    }
    pushPartialState(timestamp, props) {
        var _a;
        if (this.states[timestamp] === undefined) {
            // Clone the last state before this timestamp
            const stateTimestamp = (_a = this.significantStates
                .filter((s) => s < timestamp)
                .sort((a, b) => b - a)[0]) !== null && _a !== void 0 ? _a : this.significantStates[0];
            if (stateTimestamp === undefined)
                throw new UnreachableCode();
            const state = this.states[stateTimestamp];
            if (!state)
                throw new UnreachableCode();
            this.states[timestamp] = state.partialClone(props);
        }
        else {
            const state = this.states[timestamp];
            if (!state)
                throw new UnreachableCode();
            this.states[timestamp] = state.partialClone(props);
        }
        this.latestTimestamp = Math.max(this.latestTimestamp, timestamp);
        const lastSignificantStateTimestamp = this.significantStates[this.significantStates.length - 1];
        if (!lastSignificantStateTimestamp)
            throw new UnreachableCode();
        const oldStateJSON = JSON.stringify(this.states[lastSignificantStateTimestamp]);
        const newStateJSON = JSON.stringify(this.states[timestamp]);
        if (lastSignificantStateTimestamp !== timestamp && newStateJSON !== oldStateJSON)
            this.significantStates.push(timestamp);
    }
    getState(timestamp) {
        const stateByTimestamp = this.states[timestamp];
        if (stateByTimestamp)
            return stateByTimestamp;
        const initialTimestamp = this.significantStates[0];
        if (initialTimestamp === undefined)
            throw new UnreachableCode();
        if (timestamp < initialTimestamp)
            return this.getStateByIndex(0);
        let i = 0;
        for (; i < this.significantStates.length; ++i) {
            const prevTimestamp = this.significantStates[i];
            if (prevTimestamp === undefined)
                throw new UnreachableCode();
            if (prevTimestamp > timestamp)
                return this.getStateByIndex(i - 1);
        }
        return this.getStateByIndex(i - 1);
    }
    // Should only be called when `index` is valid.
    getStateByIndex(index) {
        const stateIndex = this.significantStates[index];
        if (stateIndex === undefined)
            throw new UnreachableCode();
        const state = this.states[stateIndex];
        if (state === undefined)
            throw new UnreachableCode();
        return state;
    }
}

;// CONCATENATED MODULE: ./ui/raidboss/emulator/data/CombatantJobSearch.ts
class CombatantJobSearch {
    static getJob(abilityId) {
        for (const [key, value] of Object.entries(CombatantJobSearch.abilities)) {
            if (value === null || value === void 0 ? void 0 : value.includes(abilityId))
                return key;
        }
    }
}
CombatantJobSearch.abilityMatchRegex = /[a-fA-F0-9]{1,4}/i;
CombatantJobSearch.abilities = {
    PLD: [
        12959, 12961, 12964, 12967, 12968, 12969, 12970, 12971, 12972, 12973, 12974, 12975,
        12976, 12978, 12980, 12981, 12982, 12983, 12984, 12985, 12986, 12987, 12988, 12989,
        12991, 12992, 12993, 12994, 12996, 13000, 13001, 13006, 14480, 16457, 16458, 16459,
        16460, 16461, 17669, 17671, 17672, 17691, 17692, 17693, 17694, 17866, 18050, 27, 29,
        30, 3538, 3539, 3540, 3541, 3542, 4284, 4285, 4286, 50207, 50209, 50246, 50260, 50261,
        50262, 50263, 50264, 7382, 7383, 7384, 7385, 8746, 8749, 8750, 8751, 8752, 8754, 8755,
        8756,
    ],
    WAR: [
        16462, 16463, 16464, 16465, 17695, 17696, 17697, 17698, 17889, 3549, 3550, 3551, 3552,
        4289, 4290, 4291, 49, 50157, 50218, 50249, 50265, 50266, 50267, 50268, 50269, 51, 52,
        7386, 7387, 7388, 7389, 8758, 8761, 8762, 8763, 8764, 8765, 8767, 8768,
    ],
    DRK: [
        16466, 16467, 16468, 16469, 16470, 16471, 16472, 17700, 17701, 17702, 3617, 3621, 3623,
        3624, 3625, 3629, 3632, 3634, 3636, 3638, 3639, 3640, 3641, 3643, 4303, 4304, 4305, 4306,
        4307, 4308, 4309, 4310, 4311, 4312, 4680, 50158, 50159, 50271, 50272, 50319, 7390, 7391,
        7392, 7393, 8769, 8772, 8773, 8775, 8776, 8777, 8778, 8779,
    ],
    GNB: [
        17703, 17704, 17705, 17706, 17707, 17708, 17709, 17710, 17711, 17712, 17713, 17714,
        17716, 17717, 17890, 17891, 16137, 50320, 16138, 16139, 16140, 16141, 16142, 16143,
        16144, 16145, 16162, 50257, 16148, 16149, 16151, 16152, 50258, 16153, 16154, 16146,
        16147, 16150, 16159, 16160, 16161, 16155, 16156, 16157, 16158, 16163, 16164, 16165,
        50259,
    ],
    WHM: [
        12958, 12962, 12965, 12997, 13002, 13003, 13004, 13005, 131, 136, 137, 139, 140, 14481,
        1584, 16531, 16532, 16533, 16534, 16535, 16536, 17688, 17689, 17690, 17789, 17790, 17791,
        17793, 17794, 17832, 3568, 3569, 3570, 3571, 4296, 4297, 50181, 50182, 50196, 50307,
        50308, 50309, 50310, 7430, 7431, 7432, 7433, 8895, 8896, 8900, 9621, 127, 133,
    ],
    SCH: [
        16537, 16538, 16539, 16540, 16541, 16542, 16543, 16544, 16545, 16546, 16547, 16548, 16550,
        16551, 166, 167, 17215, 17216, 17795, 17796, 17797, 17798, 17802, 17864, 17865, 17869,
        17870, 17990, 185, 186, 188, 189, 190, 3583, 3584, 3585, 3586, 3587, 4300, 50184, 50214,
        50311, 50312, 50313, 50324, 7434, 7435, 7436, 7437, 7438, 7869, 802, 803, 805, 8904, 8905,
        8909, 9622,
    ],
    AST: [
        10027, 10028, 10029, 16552, 16553, 16554, 16555, 16556, 16557, 16558, 16559, 17055, 17151,
        17152, 17804, 17805, 17806, 17807, 17809, 17991, 3590, 3593, 3594, 3595, 3596, 3598, 3599,
        3600, 3601, 3603, 3604, 3605, 3606, 3608, 3610, 3612, 3613, 3614, 3615, 4301, 4302, 4401,
        4402, 4403, 4404, 4405, 4406, 4677, 4678, 4679, 50122, 50124, 50125, 50186, 50187, 50188,
        50189, 50314, 50315, 50316, 7439, 7440, 7441, 7442, 7443, 7444, 7445, 7448, 8324, 8913,
        8914, 8916, 9629,
    ],
    MNK: [
        12960, 12963, 12966, 12977, 12979, 12990, 12995, 12998, 12999, 14476, 14478, 16473, 16474,
        16475, 16476, 17674, 17675, 17676, 17677, 17719, 17720, 17721, 17722, 17723, 17724, 17725,
        17726, 3543, 3545, 3546, 3547, 4262, 4287, 4288, 50160, 50161, 50245, 50273, 50274, 63, 70,
        71, 7394, 7395, 7396, 74, 8780, 8781, 8782, 8783, 8784, 8785, 8787, 8789, 8925,
    ],
    DRG: [
        16477, 16478, 16479, 16480, 17728, 17729, 3553, 3554, 3555, 3556, 3557, 4292, 4293, 50162,
        50163, 50247, 50275, 50276, 7397, 7398, 7399, 7400, 86, 8791, 8792, 8793, 8794, 8795,
        8796, 8797, 8798, 8799, 8802, 8803, 8804, 8805, 8806, 92, 94, 95, 96, 9640, 75, 78,
    ],
    NIN: [
        16488, 16489, 16491, 16492, 16493, 17413, 17414, 17415, 17416, 17417, 17418, 17419, 17420,
        17732, 17733, 17734, 17735, 17736, 17737, 17738, 17739, 2246, 2259, 2260, 2261, 2262,
        2263, 2264, 2265, 2266, 2267, 2268, 2269, 2270, 2271, 2272, 3563, 3566, 4295, 50165,
        50166, 50167, 50250, 50279, 50280, 7401, 7402, 7403, 8807, 8808, 8809, 8810, 8812, 8814,
        8815, 8816, 8820, 9461,
    ],
    SAM: [
        16481, 16482, 16483, 16484, 16485, 16486, 16487, 17740, 17741, 17742, 17743, 17744, 50208,
        50215, 50277, 50278, 7477, 7478, 7479, 7480, 7481, 7482, 7483, 7484, 7485, 7486, 7487,
        7488, 7489, 7490, 7491, 7492, 7493, 7494, 7495, 7496, 7497, 7498, 7499, 7501, 7502, 7855,
        7857, 7867, 8821, 8822, 8823, 8824, 8825, 8826, 8828, 8829, 8830, 8831, 8833,
    ],
    BRD: [
        10023, 114, 116, 117, 118, 13007, 14479, 16494, 16495, 16496, 17678, 17679, 17680, 17681,
        17682, 17745, 17747, 3558, 3559, 3560, 3561, 3562, 4294, 50168, 50169, 50282, 50283, 50284,
        50285, 50286, 50287, 7404, 7405, 7406, 7407, 7408, 7409, 8836, 8837, 8838, 8839, 8841,
        8842, 8843, 8844, 9625, 106,
    ],
    MCH: [
        16497, 16498, 16499, 16500, 16501, 16502, 16503, 16504, 16766, 16889, 17206, 17209, 17749,
        17750, 17751, 17752, 17753, 17754, 2864, 2866, 2868, 2870, 2872, 2873, 2874, 2876, 2878,
        2890, 4276, 4675, 4676, 50117, 50119, 50288, 50289, 50290, 50291, 50292, 50293, 50294,
        7410, 7411, 7412, 7413, 7414, 7415, 7416, 7418, 8848, 8849, 8850, 8851, 8853, 8855,
    ],
    DNC: [
        17756, 17757, 17758, 17759, 17760, 17761, 17762, 17763, 17764, 17765, 17766, 17767,
        17768, 17769, 17770, 17771, 17772, 17773, 17824, 17825, 17826, 17827, 17828, 17829,
        18076, 15989, 15990, 15993, 15997, 15999, 16000, 16001, 16002, 16003, 16191, 16192,
        15991, 15994, 16007, 50252, 15995, 15992, 15996, 16008, 16010, 50251, 16015, 16012,
        16006, 18073, 50253, 16011, 16009, 50254, 15998, 16004, 16193, 16194, 16195, 16196,
        16013, 16005, 50255, 50256, 16014,
    ],
    BLM: [
        14477, 153, 154, 158, 159, 162, 16505, 16506, 16507, 17683, 17684, 17685, 17686, 17687,
        17774, 17775, 3573, 3574, 3575, 3576, 3577, 4298, 50171, 50172, 50173, 50174, 50295,
        50296, 50297, 50321, 50322, 7419, 7420, 7421, 7422, 8858, 8859, 8860, 8861, 8862, 8863,
        8864, 8865, 8866, 8867, 8869, 9637, 149, 155, 141, 152,
    ],
    SMN: [
        16510, 16511, 16513, 16514, 16515, 16516, 16517, 16518, 16519, 16522, 16523, 16549,
        16795, 16796, 16797, 16798, 16799, 16800, 16801, 16802, 16803, 17777, 17778, 17779,
        17780, 17781, 17782, 17783, 17784, 17785, 180, 184, 3578, 3579, 3580, 3581, 3582, 4299,
        50176, 50177, 50178, 50213, 50217, 50298, 50299, 50300, 50301, 50302, 7423, 7424, 7425,
        7426, 7427, 7428, 7429, 7449, 7450, 787, 788, 791, 792, 794, 796, 797, 798, 800, 801,
        8872, 8873, 8874, 8877, 8878, 8879, 8880, 8881, 9014, 9432,
    ],
    RDM: [
        10025, 16524, 16525, 16526, 16527, 16528, 16529, 16530, 17786, 17787, 17788, 50195,
        50200, 50201, 50216, 50303, 50304, 50305, 50306, 7503, 7504, 7505, 7506, 7507, 7509,
        7510, 7511, 7512, 7513, 7514, 7515, 7516, 7517, 7518, 7519, 7520, 7521, 7523, 7524,
        7525, 7526, 7527, 7528, 7529, 7530, 8882, 8883, 8884, 8885, 8887, 8888, 8889, 8890,
        8891, 8892, 9433, 9434,
    ],
    BLU: [
        11715, 11383, 11384, 11385, 11386, 11387, 11388, 11389, 11390, 11391, 11392, 11393,
        11394, 11395, 11396, 11397, 11398, 11399, 11400, 11401, 11402, 11403, 11404, 11405,
        11406, 11407, 11408, 11409, 11410, 11411, 11412, 11413, 11414, 11415, 11416, 11417,
        11418, 11419, 11420, 11421, 11422, 11423, 11424, 11425, 11426, 11427, 11428, 11429,
        11430, 11431, 50219, 50220, 50221, 50222, 50223, 50224,
    ],
};

;// CONCATENATED MODULE: ./ui/raidboss/emulator/data/CombatantState.ts
class CombatantState {
    constructor(posX, posY, posZ, heading, targetable, hp, maxHp, mp, maxMp) {
        this.posX = posX;
        this.posY = posY;
        this.posZ = posZ;
        this.heading = heading;
        this.targetable = targetable;
        this.hp = hp;
        this.maxHp = maxHp;
        this.mp = mp;
        this.maxMp = maxMp;
    }
    partialClone(props) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return new CombatantState((_a = props.posX) !== null && _a !== void 0 ? _a : this.posX, (_b = props.posY) !== null && _b !== void 0 ? _b : this.posY, (_c = props.posZ) !== null && _c !== void 0 ? _c : this.posZ, (_d = props.heading) !== null && _d !== void 0 ? _d : this.heading, (_e = props.targetable) !== null && _e !== void 0 ? _e : this.targetable, (_f = props.hp) !== null && _f !== void 0 ? _f : this.hp, (_g = props.maxHp) !== null && _g !== void 0 ? _g : this.maxHp, (_h = props.mp) !== null && _h !== void 0 ? _h : this.mp, (_j = props.maxMp) !== null && _j !== void 0 ? _j : this.maxMp);
    }
    toPluginState() {
        return {
            PosX: this.posX,
            PosY: this.posY,
            PosZ: this.posZ,
            Heading: this.heading,
            CurrentHP: this.hp,
            MaxHP: this.maxHp,
            CurrentMP: this.mp,
            MaxMP: this.maxMp,
        };
    }
}

;// CONCATENATED MODULE: ./resources/pet_names.ts
// Auto-generated from gen_pet_names.py
// DO NOT EDIT THIS FILE DIRECTLY
const data = {
    'cn': [
        '绿宝石兽',
        '黄宝石兽',
        '伊弗利特之灵',
        '泰坦之灵',
        '迦楼罗之灵',
        '朝日小仙女',
        '夕月小仙女',
        '车式浮空炮塔',
        '象式浮空炮塔',
        '亚灵神巴哈姆特',
        '亚灵神不死鸟',
        '炽天使',
        '月长宝石兽',
        '英雄的掠影',
        '后式自走人偶',
        '分身',
    ],
    'de': [
        'Smaragd-Karfunkel',
        'Topas-Karfunkel',
        'Ifrit-Egi',
        'Titan-Egi',
        'Garuda-Egi',
        'Eos',
        'Selene',
        'Selbstschuss-Gyrocopter TURM',
        'Selbstschuss-Gyrocopter LÄUFER',
        'Demi-Bahamut',
        'Demi-Phönix',
        'Seraph',
        'Mondstein-Karfunkel',
        'Schattenschemen',
        'Automaton DAME',
        'Gedoppeltes Ich',
    ],
    'en': [
        'Emerald Carbuncle',
        'Topaz Carbuncle',
        'Ifrit-Egi',
        'Titan-Egi',
        'Garuda-Egi',
        'Eos',
        'Selene',
        'Rook Autoturret',
        'Bishop Autoturret',
        'Demi-Bahamut',
        'Demi-Phoenix',
        'Seraph',
        'Moonstone Carbuncle',
        'Esteem',
        'Automaton Queen',
        'Bunshin',
    ],
    'fr': [
        'Carbuncle émeraude',
        'Carbuncle topaze',
        'Ifrit-Egi',
        'Titan-Egi',
        'Garuda-Egi',
        'Eos',
        'Selene',
        'Auto-tourelle Tour',
        'Auto-tourelle Fou',
        'Demi-Bahamut',
        'Demi-Phénix',
        'Séraphin',
        'Carbuncle hécatolite',
        'Estime',
        'Automate Reine',
        'Ombre',
    ],
    'ja': [
        'カーバンクル・エメラルド',
        'カーバンクル・トパーズ',
        'イフリート・エギ',
        'タイタン・エギ',
        'ガルーダ・エギ',
        'フェアリー・エオス',
        'フェアリー・セレネ',
        'オートタレット・ルーク',
        'オートタレット・ビショップ',
        'デミ・バハムート',
        'デミ・フェニックス',
        'セラフィム',
        'カーバンクル・ムーンストーン',
        '英雄の影身',
        'オートマトン・クイーン',
        '分身',
    ],
    'ko': [
        '카벙클 에메랄드',
        '카벙클 토파즈',
        '이프리트 에기',
        '타이탄 에기',
        '가루다 에기',
        '요정 에오스',
        '요정 셀레네',
        '자동포탑 룩',
        '자동포탑 비숍',
        '데미바하무트',
        '데미피닉스',
        '세라핌',
        '카벙클 문스톤',
        '영웅의 환영',
        '자동인형 퀸',
        '분신',
    ],
};
/* harmony default export */ const pet_names = (data);

;// CONCATENATED MODULE: ./ui/raidboss/emulator/data/network_log_converter/LineEvent.ts

const fields = {
    event: 0,
    timestamp: 1,
};
/**
 * Generic class to track an FFXIV log line
 */
class LineEvent {
    constructor(repo, networkLine, parts) {
        var _a, _b, _c;
        this.networkLine = networkLine;
        this.offset = 0;
        this.invalid = false;
        this.index = 0;
        this.decEvent = parseInt((_a = parts[fields.event]) !== null && _a !== void 0 ? _a : '0');
        this.hexEvent = EmulatorCommon.zeroPad(this.decEvent.toString(16).toUpperCase());
        this.timestamp = new Date((_b = parts[fields.timestamp]) !== null && _b !== void 0 ? _b : '0').getTime();
        this.checksum = (_c = parts.slice(-1)[0]) !== null && _c !== void 0 ? _c : '';
        repo.updateTimestamp(this.timestamp);
        this.convertedLine = this.prefix() + (parts.join(':')).replace('|', ':');
    }
    prefix() {
        return '[' + EmulatorCommon.timeToTimeString(this.timestamp, true) + '] ' + this.hexEvent + ':';
    }
    static isDamageHallowed(damage) {
        return (parseInt(damage, 16) & parseInt('1000', 16)) > 0;
    }
    static isDamageBig(damage) {
        return (parseInt(damage, 16) & parseInt('4000', 16)) > 0;
    }
    static calculateDamage(damage) {
        if (LineEvent.isDamageHallowed(damage))
            return 0;
        damage = EmulatorCommon.zeroPad(damage, 8);
        const parts = [
            damage.substr(0, 2),
            damage.substr(2, 2),
            damage.substr(4, 2),
            damage.substr(6, 2),
        ];
        if (!LineEvent.isDamageBig(damage))
            return parseInt(parts.slice(0, 2).reverse().join(''), 16);
        return parseInt((parts[3] + parts[0]) +
            (parseInt(parts[1], 16) - parseInt(parts[3], 16)).toString(16), 16);
    }
}
const isLineEventSource = (line) => {
    return 'isSource' in line;
};
const isLineEventTarget = (line) => {
    return 'isTarget' in line;
};
const isLineEventJobLevel = (line) => {
    return 'isJobLevel' in line;
};
const isLineEventAbility = (line) => {
    return 'isAbility' in line;
};

;// CONCATENATED MODULE: ./ui/raidboss/emulator/data/CombatantTracker.ts





class CombatantTracker {
    constructor(logLines, language) {
        this.combatants = {};
        this.partyMembers = [];
        this.enemies = [];
        this.others = [];
        this.pets = [];
        this.initialStates = {};
        this.language = language;
        this.firstTimestamp = Number.MAX_SAFE_INTEGER;
        this.lastTimestamp = 0;
        this.initialize(logLines);
        // Clear initialStates after we initialize, we don't need it anymore
        this.initialStates = {};
    }
    initialize(logLines) {
        var _a, _b, _c, _d, _e, _f, _g;
        // First pass: Get list of combatants, figure out where they
        // start at if possible
        for (const line of logLines) {
            this.firstTimestamp = Math.min(this.firstTimestamp, line.timestamp);
            this.lastTimestamp = Math.max(this.lastTimestamp, line.timestamp);
            if (isLineEventSource(line))
                this.addCombatantFromLine(line);
            if (isLineEventTarget(line))
                this.addCombatantFromTargetLine(line);
        }
        // Between passes: Create our initial combatant states
        for (const id in this.initialStates) {
            const state = (_a = this.initialStates[id]) !== null && _a !== void 0 ? _a : {};
            (_b = this.combatants[id]) === null || _b === void 0 ? void 0 : _b.pushState(this.firstTimestamp, new CombatantState(Number(state.posX), Number(state.posY), Number(state.posZ), Number(state.heading), (_c = state.targetable) !== null && _c !== void 0 ? _c : false, Number(state.hp), Number(state.maxHp), Number(state.mp), Number(state.maxMp)));
        }
        // Second pass: Analyze combatant information for tracking
        const eventTracker = {};
        for (const line of logLines) {
            if (isLineEventSource(line)) {
                const state = this.extractStateFromLine(line);
                if (state) {
                    eventTracker[line.id] = (_d = eventTracker[line.id]) !== null && _d !== void 0 ? _d : 0;
                    ++eventTracker[line.id];
                    (_e = this.combatants[line.id]) === null || _e === void 0 ? void 0 : _e.pushPartialState(line.timestamp, state);
                }
            }
            if (isLineEventTarget(line)) {
                const state = this.extractStateFromTargetLine(line);
                if (state) {
                    eventTracker[line.targetId] = (_f = eventTracker[line.targetId]) !== null && _f !== void 0 ? _f : 0;
                    ++eventTracker[line.targetId];
                    (_g = this.combatants[line.targetId]) === null || _g === void 0 ? void 0 : _g.pushPartialState(line.timestamp, state);
                }
            }
        }
        // Figure out party/enemy/other status
        const petNames = pet_names[this.language];
        this.others = this.others.filter((ID) => {
            var _a, _b, _c, _d, _e;
            if (((_a = this.combatants[ID]) === null || _a === void 0 ? void 0 : _a.job) !== undefined &&
                ((_b = this.combatants[ID]) === null || _b === void 0 ? void 0 : _b.job) !== 'NONE' &&
                ID.startsWith('1')) {
                this.partyMembers.push(ID);
                return false;
            }
            else if (petNames.includes((_d = (_c = this.combatants[ID]) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : '')) {
                this.pets.push(ID);
                return false;
            }
            else if (((_e = eventTracker[ID]) !== null && _e !== void 0 ? _e : 0) > 0) {
                this.enemies.push(ID);
                return false;
            }
            return true;
        });
        // Main combatant is the one that took the most actions
        this.mainCombatantID = this.enemies.sort((l, r) => {
            var _a, _b;
            return ((_a = eventTracker[r]) !== null && _a !== void 0 ? _a : 0) - ((_b = eventTracker[l]) !== null && _b !== void 0 ? _b : 0);
        })[0];
    }
    addCombatantFromLine(line) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        const combatant = this.initCombatant(line.id, line.name);
        const initState = (_a = this.initialStates[line.id]) !== null && _a !== void 0 ? _a : {};
        const extractedState = (_b = this.extractStateFromLine(line)) !== null && _b !== void 0 ? _b : {};
        initState.posX = (_c = initState.posX) !== null && _c !== void 0 ? _c : extractedState.posX;
        initState.posY = (_d = initState.posY) !== null && _d !== void 0 ? _d : extractedState.posY;
        initState.posZ = (_e = initState.posZ) !== null && _e !== void 0 ? _e : extractedState.posZ;
        initState.heading = (_f = initState.heading) !== null && _f !== void 0 ? _f : extractedState.heading;
        initState.targetable = (_g = initState.targetable) !== null && _g !== void 0 ? _g : extractedState.targetable;
        initState.hp = (_h = initState.hp) !== null && _h !== void 0 ? _h : extractedState.hp;
        initState.maxHp = (_j = initState.maxHp) !== null && _j !== void 0 ? _j : extractedState.maxHp;
        initState.mp = (_k = initState.mp) !== null && _k !== void 0 ? _k : extractedState.mp;
        initState.maxMp = (_l = initState.maxMp) !== null && _l !== void 0 ? _l : extractedState.maxMp;
        if (isLineEventJobLevel(line)) {
            combatant.job = (_o = (_m = this.combatants[line.id]) === null || _m === void 0 ? void 0 : _m.job) !== null && _o !== void 0 ? _o : line.job;
            combatant.level = (_q = (_p = this.combatants[line.id]) === null || _p === void 0 ? void 0 : _p.level) !== null && _q !== void 0 ? _q : line.level;
        }
        if (isLineEventAbility(line)) {
            if (!combatant.job && !line.id.startsWith('4') && line.abilityId !== undefined)
                combatant.job = CombatantJobSearch.getJob(line.abilityId);
        }
    }
    addCombatantFromTargetLine(line) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        this.initCombatant(line.targetId, line.targetName);
        const initState = (_a = this.initialStates[line.targetId]) !== null && _a !== void 0 ? _a : {};
        const extractedState = (_b = this.extractStateFromTargetLine(line)) !== null && _b !== void 0 ? _b : {};
        initState.posX = (_c = initState.posX) !== null && _c !== void 0 ? _c : extractedState.posX;
        initState.posY = (_d = initState.posY) !== null && _d !== void 0 ? _d : extractedState.posY;
        initState.posZ = (_e = initState.posZ) !== null && _e !== void 0 ? _e : extractedState.posZ;
        initState.heading = (_f = initState.heading) !== null && _f !== void 0 ? _f : extractedState.heading;
        initState.hp = (_g = initState.hp) !== null && _g !== void 0 ? _g : extractedState.hp;
        initState.maxHp = (_h = initState.maxHp) !== null && _h !== void 0 ? _h : extractedState.maxHp;
        initState.mp = (_j = initState.mp) !== null && _j !== void 0 ? _j : extractedState.mp;
        initState.maxMp = (_k = initState.maxMp) !== null && _k !== void 0 ? _k : extractedState.maxMp;
    }
    extractStateFromLine(line) {
        const state = {};
        if (line.x !== undefined)
            state.posX = line.x;
        if (line.y !== undefined)
            state.posY = line.y;
        if (line.z !== undefined)
            state.posZ = line.z;
        if (line.heading !== undefined)
            state.heading = line.heading;
        if (line.targetable !== undefined)
            state.targetable = line.targetable;
        if (line.hp !== undefined)
            state.hp = line.hp;
        if (line.maxHp !== undefined)
            state.maxHp = line.maxHp;
        if (line.mp !== undefined)
            state.mp = line.mp;
        if (line.maxMp !== undefined)
            state.maxMp = line.maxMp;
        return state;
    }
    extractStateFromTargetLine(line) {
        const state = {};
        if (line.targetX !== undefined)
            state.posX = line.targetX;
        if (line.targetY !== undefined)
            state.posY = line.targetY;
        if (line.targetZ !== undefined)
            state.posZ = line.targetZ;
        if (line.targetHeading !== undefined)
            state.heading = line.targetHeading;
        if (line.targetHp !== undefined)
            state.hp = line.targetHp;
        if (line.targetMaxHp !== undefined)
            state.maxHp = line.targetMaxHp;
        if (line.targetMp !== undefined)
            state.mp = line.targetMp;
        if (line.targetMaxMp !== undefined)
            state.maxMp = line.targetMaxMp;
        return state;
    }
    initCombatant(id, name) {
        let combatant = this.combatants[id];
        if (combatant === undefined) {
            combatant = this.combatants[id] = new Combatant(id, name);
            this.others.push(id);
            this.initialStates[id] = {
                targetable: true,
            };
        }
        else if (combatant.name === '') {
            combatant.setName(name);
        }
        return combatant;
    }
    getMainCombatantName() {
        var _a, _b;
        if (this.mainCombatantID)
            return (_b = (_a = this.combatants[this.mainCombatantID]) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'Unknown';
        return 'Unknown';
    }
}

;// CONCATENATED MODULE: ./ui/raidboss/emulator/data/network_log_converter/LogRepository.ts
class LogRepository {
    constructor() {
        this.Combatants = {};
        this.firstTimestamp = Number.MAX_SAFE_INTEGER;
    }
    updateTimestamp(timestamp) {
        this.firstTimestamp = Math.min(this.firstTimestamp, timestamp);
    }
    updateCombatant(id, c) {
        id = id.toUpperCase();
        if (id && id.length) {
            let combatant = this.Combatants[id];
            if (combatant === undefined) {
                combatant = {
                    name: c.name,
                    job: c.job,
                    spawn: c.spawn,
                    despawn: c.despawn,
                };
                this.Combatants[id] = combatant;
            }
            else {
                combatant.name = c.name || combatant.name;
                combatant.job = c.job || combatant.job;
                combatant.spawn = Math.min(combatant.spawn, c.spawn);
                combatant.despawn = Math.max(combatant.despawn, c.despawn);
            }
        }
    }
    resolveName(id, name, fallbackId = null, fallbackName = null) {
        var _a, _b;
        let ret = name;
        if (fallbackId !== null) {
            if (id === 'E0000000' && ret === '') {
                if (fallbackId.startsWith('4'))
                    ret = fallbackName !== null && fallbackName !== void 0 ? fallbackName : '';
                else
                    ret = 'Unknown';
            }
        }
        if (ret === '')
            ret = (_b = (_a = this.Combatants[id]) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '';
        return ret;
    }
}

;// CONCATENATED MODULE: ./ui/raidboss/emulator/EventBus.ts
/**
 * This is a base class that classes can extend to inherit event bus capabilities.
 * This allows other classes to listen for events with the `on` function.
 * The inheriting class can fire those events with the `dispatch` function.
 */
class EventBus {
    constructor() {
        this.listeners = {};
    }
    /**
     * Subscribe to an event
     *
     * @param event The event(s) to subscribe to, space separated
     * @param callback The callback to invoke
     * @param scope Optional. The scope to apply the function against
     * @returns The callbacks registered to the event(s)
     */
    on(event, callback, scope) {
        var _a, _b;
        var _c;
        const events = event.split(' ');
        const ret = [];
        scope = scope !== null && scope !== void 0 ? scope : (typeof window === 'undefined' ? {} : window);
        for (const event of events) {
            const events = (_a = (_c = this.listeners)[event]) !== null && _a !== void 0 ? _a : (_c[event] = []);
            if (callback !== undefined)
                events.push({ event: event, scope: scope, callback: callback });
            ret.push(...((_b = this.listeners[event]) !== null && _b !== void 0 ? _b : []));
        }
        return ret;
    }
    /**
     * Dispatch an event to any subscribers
     *
     * @param event The event to dispatch
     * @param eventArguments The event arguments to pass to listeners
     * @returns A promise that can be await'd or ignored
     */
    async dispatch(event, ...eventArguments) {
        var _a;
        if (this.listeners[event] === undefined)
            return;
        for (const l of (_a = this.listeners[event]) !== null && _a !== void 0 ? _a : []) {
            const res = l.callback.apply(l.scope, eventArguments);
            await Promise.resolve(res);
        }
    }
}

;// CONCATENATED MODULE: ./ui/raidboss/emulator/data/network_log_converter/LineEvent0x00.ts

const LineEvent0x00_fields = {
    type: 2,
    speaker: 3,
};
// Chat event
class LineEvent0x00 extends LineEvent {
    constructor(repo, line, parts) {
        var _a, _b;
        super(repo, line, parts);
        this.type = (_a = parts[LineEvent0x00_fields.type]) !== null && _a !== void 0 ? _a : '';
        this.speaker = (_b = parts[LineEvent0x00_fields.speaker]) !== null && _b !== void 0 ? _b : '';
        this.message = parts.slice(4, -1).join('|');
        // The exact reason for this check isn't clear anymore but may be related to
        // https://github.com/ravahn/FFXIV_ACT_Plugin/issues/250
        if (this.message.split('\u001f\u001f').length > 1)
            this.invalid = true;
        this.convertedLine =
            this.prefix() + this.type + ':' +
                // If speaker is blank, it's excluded from the converted line
                (this.speaker !== '' ? this.speaker + ':' : '') +
                this.message.trim();
        this.convertedLine = LineEvent00.replaceChatSymbols(this.convertedLine);
    }
    static replaceChatSymbols(line) {
        for (const rep of LineEvent00.chatSymbolReplacements)
            line = line.replace(rep.Search, rep.Replace);
        return line;
    }
}
LineEvent0x00.chatSymbolReplacements = [
    {
        Search: /:\uE06F/g,
        Replace: ':⇒',
        Type: 'Symbol',
    },
    {
        Search: / \uE0BB\uE05C/g,
        Replace: ' ',
        Type: 'Positive Effect',
    },
    {
        Search: / \uE0BB\uE05B/g,
        Replace: ' ',
        Type: 'Negative Effect',
    },
];
class LineEvent00 extends LineEvent0x00 {
}

;// CONCATENATED MODULE: ./ui/raidboss/emulator/data/network_log_converter/LineEvent0x01.ts


const LineEvent0x01_fields = {
    zoneId: 2,
    zoneName: 3,
};
// Zone change event
class LineEvent0x01 extends LineEvent {
    constructor(repo, networkLine, parts) {
        var _a, _b;
        super(repo, networkLine, parts);
        this.zoneId = (_a = parts[LineEvent0x01_fields.zoneId]) !== null && _a !== void 0 ? _a : '';
        this.zoneName = (_b = parts[LineEvent0x01_fields.zoneName]) !== null && _b !== void 0 ? _b : '';
        this.zoneNameProperCase = EmulatorCommon.properCase(this.zoneName);
        this.convertedLine = this.prefix() +
            'Changed Zone to ' + this.zoneName + '.';
        this.properCaseConvertedLine = this.prefix() +
            'Changed Zone to ' + this.zoneNameProperCase + '.';
    }
}
class LineEvent01 extends LineEvent0x01 {
}

;// CONCATENATED MODULE: ./ui/raidboss/emulator/data/network_log_converter/LineEvent0x02.ts

const LineEvent0x02_fields = {
    id: 2,
    name: 3,
};
// Player change event
class LineEvent0x02 extends LineEvent {
    constructor(repo, line, parts) {
        var _a, _b, _c;
        super(repo, line, parts);
        this.id = (_b = (_a = parts[LineEvent0x02_fields.id]) === null || _a === void 0 ? void 0 : _a.toUpperCase()) !== null && _b !== void 0 ? _b : '';
        this.name = (_c = parts[LineEvent0x02_fields.name]) !== null && _c !== void 0 ? _c : '';
        this.convertedLine = this.prefix() + 'Changed primary player to ' + this.name + '.';
    }
}
class LineEvent02 extends LineEvent0x02 {
}

;// CONCATENATED MODULE: ./resources/overlay_plugin_api.ts
// OverlayPlugin API setup
let inited = false;
let wsUrl = null;
let ws = null;
let queue = [];
let rseqCounter = 0;
const responsePromises = {};
const subscribers = {};
const sendMessage = (msg, cb) => {
    if (ws) {
        if (queue)
            queue.push(msg);
        else
            ws.send(JSON.stringify(msg));
    }
    else {
        if (queue)
            queue.push([msg, cb]);
        else
            window.OverlayPluginApi.callHandler(JSON.stringify(msg), cb);
    }
};
const processEvent = (msg) => {
    init();
    const subs = subscribers[msg.type];
    subs === null || subs === void 0 ? void 0 : subs.forEach((sub) => sub(msg));
};
const dispatchOverlayEvent = processEvent;
const addOverlayListener = (event, cb) => {
    var _a;
    init();
    if (!subscribers[event]) {
        subscribers[event] = [];
        if (!queue) {
            sendMessage({
                call: 'subscribe',
                events: [event],
            });
        }
    }
    (_a = subscribers[event]) === null || _a === void 0 ? void 0 : _a.push(cb);
};
const removeOverlayListener = (event, cb) => {
    init();
    if (subscribers[event]) {
        const list = subscribers[event];
        const pos = list === null || list === void 0 ? void 0 : list.indexOf(cb);
        if (pos && pos > -1)
            list === null || list === void 0 ? void 0 : list.splice(pos, 1);
    }
};
const callOverlayHandlerInternal = (_msg) => {
    init();
    const msg = {
        ..._msg,
        rseq: 0,
    };
    let p;
    if (ws) {
        msg.rseq = rseqCounter++;
        p = new Promise((resolve) => {
            responsePromises[msg.rseq] = resolve;
        });
        sendMessage(msg);
    }
    else {
        p = new Promise((resolve) => {
            sendMessage(msg, (data) => {
                resolve(data === null ? null : JSON.parse(data));
            });
        });
    }
    return p;
};
let callOverlayHandlerOverride;
const callOverlayHandler = (_msg) => {
    init();
    if (callOverlayHandlerOverride) {
        return callOverlayHandlerOverride(_msg);
    }
    return callOverlayHandlerInternal(_msg);
};
const setCallOverlayHandlerOverride = (override) => {
    callOverlayHandlerOverride = override;
    return callOverlayHandlerInternal;
};
const init = () => {
    if (inited)
        return;
    if (typeof window !== 'undefined') {
        wsUrl = /[\?&]OVERLAY_WS=([^&]+)/.exec(window.location.href);
        if (wsUrl) {
            const connectWs = function () {
                ws = new WebSocket(wsUrl === null || wsUrl === void 0 ? void 0 : wsUrl[1]);
                ws.addEventListener('error', (e) => {
                    console.error(e);
                });
                ws.addEventListener('open', () => {
                    console.log('Connected!');
                    const q = queue !== null && queue !== void 0 ? queue : [];
                    queue = null;
                    sendMessage({
                        call: 'subscribe',
                        events: Object.keys(subscribers),
                    });
                    for (const msg of q) {
                        if (!Array.isArray(msg))
                            sendMessage(msg);
                    }
                });
                ws.addEventListener('message', (_msg) => {
                    var _a;
                    try {
                        const msg = JSON.parse(_msg.data);
                        if (msg.rseq !== undefined && responsePromises[msg.rseq]) {
                            (_a = responsePromises[msg.rseq]) === null || _a === void 0 ? void 0 : _a.call(responsePromises, msg);
                            delete responsePromises[msg.rseq];
                        }
                        else {
                            processEvent(msg);
                        }
                    }
                    catch (e) {
                        console.error('Invalid message received: ', _msg);
                        return;
                    }
                });
                ws.addEventListener('close', () => {
                    queue = null;
                    console.log('Trying to reconnect...');
                    // Don't spam the server with retries.
                    setTimeout(() => {
                        connectWs();
                    }, 300);
                });
            };
            connectWs();
        }
        else {
            const waitForApi = function () {
                if (!window.OverlayPluginApi || !window.OverlayPluginApi.ready) {
                    setTimeout(waitForApi, 300);
                    return;
                }
                const q = queue !== null && queue !== void 0 ? queue : [];
                queue = null;
                window.__OverlayCallback = processEvent;
                sendMessage({
                    call: 'subscribe',
                    events: Object.keys(subscribers),
                });
                for (const item of q) {
                    if (Array.isArray(item))
                        sendMessage(item[0], item[1]);
                }
            };
            waitForApi();
        }
        // Here the OverlayPlugin API is registered to the window object,
        // but this is mainly for backwards compatibility.For cactbot's built-in files,
        // it is recommended to use the various functions exported in resources/overlay_plugin_api.ts.
        window.addOverlayListener = addOverlayListener;
        window.removeOverlayListener = removeOverlayListener;
        window.callOverlayHandler = callOverlayHandler;
        window.dispatchOverlayEvent = dispatchOverlayEvent;
    }
    inited = true;
};

;// CONCATENATED MODULE: ./resources/util.ts

// TODO: it'd be nice to not repeat job names, but at least Record enforces that all are set.
const nameToJobEnum = {
    NONE: 0,
    GLA: 1,
    PGL: 2,
    MRD: 3,
    LNC: 4,
    ARC: 5,
    CNJ: 6,
    THM: 7,
    CRP: 8,
    BSM: 9,
    ARM: 10,
    GSM: 11,
    LTW: 12,
    WVR: 13,
    ALC: 14,
    CUL: 15,
    MIN: 16,
    BTN: 17,
    FSH: 18,
    PLD: 19,
    MNK: 20,
    WAR: 21,
    DRG: 22,
    BRD: 23,
    WHM: 24,
    BLM: 25,
    ACN: 26,
    SMN: 27,
    SCH: 28,
    ROG: 29,
    NIN: 30,
    MCH: 31,
    DRK: 32,
    AST: 33,
    SAM: 34,
    RDM: 35,
    BLU: 36,
    GNB: 37,
    DNC: 38,
};
const allJobs = Object.keys(nameToJobEnum);
const allRoles = ['tank', 'healer', 'dps', 'crafter', 'gatherer', 'none'];
const tankJobs = ['GLA', 'PLD', 'MRD', 'WAR', 'DRK', 'GNB'];
const healerJobs = ['CNJ', 'WHM', 'SCH', 'AST'];
const meleeDpsJobs = ['PGL', 'MNK', 'LNC', 'DRG', 'ROG', 'NIN', 'SAM'];
const rangedDpsJobs = ['ARC', 'BRD', 'DNC', 'MCH'];
const casterDpsJobs = ['BLU', 'RDM', 'BLM', 'SMN', 'ACN', 'THM'];
const dpsJobs = [...meleeDpsJobs, ...rangedDpsJobs, ...casterDpsJobs];
const craftingJobs = ['CRP', 'BSM', 'ARM', 'GSM', 'LTW', 'WVR', 'ALC', 'CUL'];
const gatheringJobs = ['MIN', 'BTN', 'FSH'];
const stunJobs = ['BLU', ...tankJobs, ...meleeDpsJobs];
const silenceJobs = ['BLU', ...tankJobs, ...rangedDpsJobs];
const sleepJobs = ['BLM', 'BLU', ...healerJobs];
const feintJobs = [...meleeDpsJobs];
const addleJobs = [...casterDpsJobs];
const cleanseJobs = ['BLU', 'BRD', ...healerJobs];
const jobToRoleMap = (() => {
    const addToMap = (map, jobs, role) => {
        jobs.forEach((job) => map.set(job, role));
    };
    const map = new Map([['NONE', 'none']]);
    addToMap(map, tankJobs, 'tank');
    addToMap(map, healerJobs, 'healer');
    addToMap(map, dpsJobs, 'dps');
    addToMap(map, craftingJobs, 'crafter');
    addToMap(map, gatheringJobs, 'gatherer');
    return map;
})();
const watchCombatantMap = [];
const shouldCancelWatch = (params, entry) => {
    if (entry.cancel)
        return true;
    if (params.maxDuration !== undefined && Date.now() - entry.start > params.maxDuration)
        return true;
    return false;
};
const watchCombatant = (params, func) => {
    return new Promise((res, rej) => {
        var _a;
        const delay = (_a = params.delay) !== null && _a !== void 0 ? _a : 1000;
        const call = {
            call: 'getCombatants',
        };
        if (params.ids)
            call.ids = params.ids;
        if (params.names)
            call.names = params.names;
        if (params.props)
            call.props = params.props;
        const entry = {
            cancel: false,
            start: Date.now(),
        };
        watchCombatantMap.push(entry);
        const checkFunc = () => {
            if (shouldCancelWatch(params, entry)) {
                rej();
                return;
            }
            void callOverlayHandler(call).then((response) => {
                if (entry.cancel) {
                    rej();
                    return;
                }
                if (func(response))
                    res(true);
                else
                    window.setTimeout(checkFunc, delay);
            });
        };
        window.setTimeout(checkFunc, delay);
    });
};
const Util = {
    jobEnumToJob: (id) => {
        const job = allJobs.find((job) => nameToJobEnum[job] === id);
        return job !== null && job !== void 0 ? job : 'NONE';
    },
    jobToJobEnum: (job) => nameToJobEnum[job],
    jobToRole: (job) => {
        const role = jobToRoleMap.get(job);
        return role !== null && role !== void 0 ? role : 'none';
    },
    getAllRoles: () => allRoles,
    isTankJob: (job) => tankJobs.includes(job),
    isHealerJob: (job) => healerJobs.includes(job),
    isMeleeDpsJob: (job) => meleeDpsJobs.includes(job),
    isRangedDpsJob: (job) => rangedDpsJobs.includes(job),
    isCasterDpsJob: (job) => casterDpsJobs.includes(job),
    isDpsJob: (job) => dpsJobs.includes(job),
    isCraftingJob: (job) => craftingJobs.includes(job),
    isGatheringJob: (job) => gatheringJobs.includes(job),
    isCombatJob: (job) => {
        return !craftingJobs.includes(job) && !gatheringJobs.includes(job);
    },
    canStun: (job) => stunJobs.includes(job),
    canSilence: (job) => silenceJobs.includes(job),
    canSleep: (job) => sleepJobs.includes(job),
    canCleanse: (job) => cleanseJobs.includes(job),
    canFeint: (job) => feintJobs.includes(job),
    canAddle: (job) => addleJobs.includes(job),
    watchCombatant: watchCombatant,
    clearWatchCombatants: () => {
        while (watchCombatantMap.length > 0) {
            const watch = watchCombatantMap.pop();
            if (watch)
                watch.cancel = true;
        }
    },
};
/* harmony default export */ const util = (Util);

;// CONCATENATED MODULE: ./ui/raidboss/emulator/data/network_log_converter/LineEvent0x03.ts



const LineEvent0x03_fields = {
    id: 2,
    name: 3,
    jobIdHex: 4,
    levelString: 5,
    ownerId: 6,
    worldId: 7,
    worldName: 8,
    npcNameId: 9,
    npcBaseId: 10,
    currentHp: 11,
    maxHpString: 14,
    currentMp: 13,
    maxMpString: 14,
    currentTp: 15,
    maxTp: 16,
    xString: 17,
    yString: 18,
    zString: 19,
    heading: 20,
};
// Added combatant event
class LineEvent0x03 extends LineEvent {
    constructor(repo, line, parts) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
        super(repo, line, parts);
        this.isSource = true;
        this.isJobLevel = true;
        this.id = (_b = (_a = parts[LineEvent0x03_fields.id]) === null || _a === void 0 ? void 0 : _a.toUpperCase()) !== null && _b !== void 0 ? _b : '';
        this.name = (_c = parts[LineEvent0x03_fields.name]) !== null && _c !== void 0 ? _c : '';
        this.jobIdHex = (_e = (_d = parts[LineEvent0x03_fields.jobIdHex]) === null || _d === void 0 ? void 0 : _d.toUpperCase()) !== null && _e !== void 0 ? _e : '';
        this.jobId = parseInt(this.jobIdHex, 16);
        this.job = util.jobEnumToJob(this.jobId);
        this.levelString = (_f = parts[LineEvent0x03_fields.levelString]) !== null && _f !== void 0 ? _f : '';
        this.level = parseFloat(this.levelString);
        this.ownerId = (_h = (_g = parts[LineEvent0x03_fields.ownerId]) === null || _g === void 0 ? void 0 : _g.toUpperCase()) !== null && _h !== void 0 ? _h : '';
        this.worldId = (_j = parts[LineEvent0x03_fields.worldId]) !== null && _j !== void 0 ? _j : '';
        this.worldName = (_k = parts[LineEvent0x03_fields.worldName]) !== null && _k !== void 0 ? _k : '';
        this.npcNameId = (_l = parts[LineEvent0x03_fields.npcNameId]) !== null && _l !== void 0 ? _l : '';
        this.npcBaseId = (_m = parts[LineEvent0x03_fields.npcBaseId]) !== null && _m !== void 0 ? _m : '';
        this.hp = parseFloat((_o = parts[LineEvent0x03_fields.currentHp]) !== null && _o !== void 0 ? _o : '');
        this.maxHpString = (_p = parts[LineEvent0x03_fields.maxHpString]) !== null && _p !== void 0 ? _p : '';
        this.maxHp = parseFloat(this.maxHpString);
        this.mp = parseFloat((_q = parts[LineEvent0x03_fields.currentMp]) !== null && _q !== void 0 ? _q : '');
        this.maxMpString = (_r = parts[LineEvent0x03_fields.maxMpString]) !== null && _r !== void 0 ? _r : '';
        this.maxMp = parseFloat(this.maxMpString);
        this.tp = parseFloat((_s = parts[LineEvent0x03_fields.currentTp]) !== null && _s !== void 0 ? _s : '');
        this.maxTp = parseFloat((_t = parts[LineEvent0x03_fields.maxTp]) !== null && _t !== void 0 ? _t : '');
        this.xString = (_u = parts[LineEvent0x03_fields.xString]) !== null && _u !== void 0 ? _u : '';
        this.x = parseFloat(this.xString);
        this.yString = (_v = parts[LineEvent0x03_fields.yString]) !== null && _v !== void 0 ? _v : '';
        this.y = parseFloat(this.yString);
        this.zString = (_w = parts[LineEvent0x03_fields.zString]) !== null && _w !== void 0 ? _w : '';
        this.z = parseFloat(this.zString);
        this.heading = parseFloat((_x = parts[LineEvent0x03_fields.heading]) !== null && _x !== void 0 ? _x : '');
        repo.updateCombatant(this.id, {
            name: this.name,
            spawn: this.timestamp,
            despawn: this.timestamp,
            job: this.jobIdHex,
        });
        let combatantName = this.name;
        if (this.worldName !== '')
            combatantName = combatantName + '(' + this.worldName + ')';
        this.convertedLine = this.prefix() + this.id.toUpperCase() +
            ':Added new combatant ' + combatantName +
            '.  Job: ' + this.job +
            ' Level: ' + this.levelString +
            ' Max HP: ' + this.maxHpString +
            ' Max MP: ' + this.maxMpString +
            ' Pos: (' + this.xString + ',' + this.yString + ',' + this.zString + ')';
        // This last part is guesswork for the area between 9 and 10.
        const unknownValue = this.npcNameId +
            EmulatorCommon.zeroPad(this.npcBaseId, 8 + Math.max(0, 6 - this.npcNameId.length));
        if (unknownValue !== '00000000000000')
            this.convertedLine += ' (' + unknownValue + ')';
        this.convertedLine += '.';
    }
}
class LineEvent03 extends LineEvent0x03 {
}

;// CONCATENATED MODULE: ./ui/raidboss/emulator/data/network_log_converter/LineEvent0x04.ts

// Removed combatant event
// Extend the add combatant event to reduce duplicate code since they're
// the same from a data perspective
class LineEvent0x04 extends LineEvent0x03 {
    constructor(repo, line, parts) {
        super(repo, line, parts);
        this.convertedLine = this.prefix() + this.id.toUpperCase() +
            ':Removing combatant ' + this.name +
            '. Max MP: ' + this.maxMpString +
            '. Pos: (' + this.xString + ',' + this.yString + ',' + this.zString + ')';
    }
}
class LineEvent04 extends LineEvent0x04 {
}

;// CONCATENATED MODULE: ./ui/raidboss/emulator/data/network_log_converter/LineEvent0x0C.ts

const LineEvent0x0C_fields = {
    class: 2,
    strength: 3,
    dexterity: 4,
    vitality: 5,
    intelligence: 6,
    mind: 7,
    piety: 8,
    attackPower: 9,
    directHit: 10,
    criticalHit: 11,
    attackMagicPotency: 12,
    healMagicPotency: 13,
    determination: 14,
    skillSpeed: 15,
    spellSpeed: 16,
    tenacity: 18,
};
// Player stats event
class LineEvent0x0C extends LineEvent {
    constructor(repo, line, parts) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        super(repo, line, parts);
        this.class = (_a = parts[LineEvent0x0C_fields.class]) !== null && _a !== void 0 ? _a : '';
        this.strength = (_b = parts[LineEvent0x0C_fields.strength]) !== null && _b !== void 0 ? _b : '';
        this.dexterity = (_c = parts[LineEvent0x0C_fields.dexterity]) !== null && _c !== void 0 ? _c : '';
        this.vitality = (_d = parts[LineEvent0x0C_fields.vitality]) !== null && _d !== void 0 ? _d : '';
        this.intelligence = (_e = parts[LineEvent0x0C_fields.intelligence]) !== null && _e !== void 0 ? _e : '';
        this.mind = (_f = parts[LineEvent0x0C_fields.mind]) !== null && _f !== void 0 ? _f : '';
        this.piety = (_g = parts[LineEvent0x0C_fields.piety]) !== null && _g !== void 0 ? _g : '';
        this.attackPower = (_h = parts[LineEvent0x0C_fields.attackPower]) !== null && _h !== void 0 ? _h : '';
        this.directHit = (_j = parts[LineEvent0x0C_fields.directHit]) !== null && _j !== void 0 ? _j : '';
        this.criticalHit = (_k = parts[LineEvent0x0C_fields.criticalHit]) !== null && _k !== void 0 ? _k : '';
        this.attackMagicPotency = (_l = parts[LineEvent0x0C_fields.attackMagicPotency]) !== null && _l !== void 0 ? _l : '';
        this.healMagicPotency = (_m = parts[LineEvent0x0C_fields.healMagicPotency]) !== null && _m !== void 0 ? _m : '';
        this.determination = (_o = parts[LineEvent0x0C_fields.determination]) !== null && _o !== void 0 ? _o : '';
        this.skillSpeed = (_p = parts[LineEvent0x0C_fields.skillSpeed]) !== null && _p !== void 0 ? _p : '';
        this.spellSpeed = (_q = parts[LineEvent0x0C_fields.spellSpeed]) !== null && _q !== void 0 ? _q : '';
        this.tenacity = (_r = parts[LineEvent0x0C_fields.tenacity]) !== null && _r !== void 0 ? _r : '';
        this.convertedLine = this.prefix() +
            'Player Stats: ' + parts.slice(2, parts.length - 1).join(':').replace(/\|/g, ':');
    }
}
class LineEvent12 extends LineEvent0x0C {
}

;// CONCATENATED MODULE: ./ui/raidboss/emulator/data/network_log_converter/LineEvent0x14.ts


const LineEvent0x14_fields = {
    id: 2,
    name: 3,
    abilityId: 4,
    abilityName: 5,
    targetId: 6,
    targetName: 7,
    duration: 8,
};
// Ability use event
class LineEvent0x14 extends LineEvent {
    constructor(repo, line, parts) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        super(repo, line, parts);
        this.isSource = true;
        this.isTarget = true;
        this.isAbility = true;
        this.id = (_b = (_a = parts[LineEvent0x14_fields.id]) === null || _a === void 0 ? void 0 : _a.toUpperCase()) !== null && _b !== void 0 ? _b : '';
        this.name = (_c = parts[LineEvent0x14_fields.name]) !== null && _c !== void 0 ? _c : '';
        this.abilityIdHex = (_e = (_d = parts[LineEvent0x14_fields.abilityId]) === null || _d === void 0 ? void 0 : _d.toUpperCase()) !== null && _e !== void 0 ? _e : '';
        this.abilityId = parseInt(this.abilityIdHex);
        this.abilityName = (_f = parts[LineEvent0x14_fields.abilityName]) !== null && _f !== void 0 ? _f : '';
        this.targetId = (_h = (_g = parts[LineEvent0x14_fields.targetId]) === null || _g === void 0 ? void 0 : _g.toUpperCase()) !== null && _h !== void 0 ? _h : '';
        this.targetName = (_j = parts[LineEvent0x14_fields.targetName]) !== null && _j !== void 0 ? _j : '';
        this.duration = (_k = parts[LineEvent0x14_fields.duration]) !== null && _k !== void 0 ? _k : '';
        repo.updateCombatant(this.id, {
            job: undefined,
            name: this.name,
            spawn: this.timestamp,
            despawn: this.timestamp,
        });
        repo.updateCombatant(this.targetId, {
            job: undefined,
            name: this.targetName,
            spawn: this.timestamp,
            despawn: this.timestamp,
        });
        const target = this.targetName.length === 0 ? 'Unknown' : this.targetName;
        this.convertedLine = this.prefix() + this.abilityIdHex +
            ':' + this.name +
            ' starts using ' + this.abilityName +
            ' on ' + target + '.';
        this.properCaseConvertedLine = this.prefix() + this.abilityIdHex +
            ':' + EmulatorCommon.properCase(this.name) +
            ' starts using ' + this.abilityName +
            ' on ' + EmulatorCommon.properCase(target) + '.';
    }
}
class LineEvent20 extends LineEvent0x14 {
}

;// CONCATENATED MODULE: ./ui/raidboss/emulator/data/network_log_converter/LineEvent0x15.ts

const LineEvent0x15_fields = {
    id: 2,
    name: 3,
    flags: 8,
    damage: 9,
    abilityId: 4,
    abilityName: 5,
    targetId: 6,
    targetName: 7,
    targetHp: 24,
    targetMaxHp: 25,
    targetMp: 26,
    targetMaxMp: 27,
    targetX: 30,
    targetY: 31,
    targetZ: 32,
    targetHeading: 33,
    sourceHp: 34,
    sourceMaxHp: 35,
    sourceMp: 36,
    sourceMaxMp: 37,
    x: 40,
    y: 41,
    z: 42,
    heading: 43,
};
// Ability hit single target event
class LineEvent0x15 extends LineEvent {
    constructor(repo, line, parts) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2;
        super(repo, line, parts);
        this.isSource = true;
        this.isTarget = true;
        this.isAbility = true;
        this.id = (_b = (_a = parts[LineEvent0x15_fields.id]) === null || _a === void 0 ? void 0 : _a.toUpperCase()) !== null && _b !== void 0 ? _b : '';
        this.name = (_c = parts[LineEvent0x15_fields.name]) !== null && _c !== void 0 ? _c : '';
        this.flags = (_d = parts[LineEvent0x15_fields.flags]) !== null && _d !== void 0 ? _d : '';
        const fieldOffset = this.flags === '3F' ? 2 : 0;
        this.damage = LineEvent.calculateDamage((_e = parts[LineEvent0x15_fields.damage + fieldOffset]) !== null && _e !== void 0 ? _e : '');
        this.abilityId = parseInt((_g = (_f = parts[LineEvent0x15_fields.abilityId]) === null || _f === void 0 ? void 0 : _f.toUpperCase()) !== null && _g !== void 0 ? _g : '');
        this.abilityName = (_h = parts[LineEvent0x15_fields.abilityName]) !== null && _h !== void 0 ? _h : '';
        this.targetId = (_k = (_j = parts[LineEvent0x15_fields.targetId]) === null || _j === void 0 ? void 0 : _j.toUpperCase()) !== null && _k !== void 0 ? _k : '';
        this.targetName = (_l = parts[LineEvent0x15_fields.targetName]) !== null && _l !== void 0 ? _l : '';
        this.targetHp = parseInt((_m = parts[LineEvent0x15_fields.targetHp + fieldOffset]) !== null && _m !== void 0 ? _m : '');
        this.targetMaxHp = parseInt((_o = parts[LineEvent0x15_fields.targetMaxHp + fieldOffset]) !== null && _o !== void 0 ? _o : '');
        this.targetMp = parseInt((_p = parts[LineEvent0x15_fields.targetMp + fieldOffset]) !== null && _p !== void 0 ? _p : '');
        this.targetMaxMp = parseInt((_q = parts[LineEvent0x15_fields.targetMaxMp + fieldOffset]) !== null && _q !== void 0 ? _q : '');
        this.targetX = parseFloat((_r = parts[LineEvent0x15_fields.targetX + fieldOffset]) !== null && _r !== void 0 ? _r : '');
        this.targetY = parseFloat((_s = parts[LineEvent0x15_fields.targetY + fieldOffset]) !== null && _s !== void 0 ? _s : '');
        this.targetZ = parseFloat((_t = parts[LineEvent0x15_fields.targetZ + fieldOffset]) !== null && _t !== void 0 ? _t : '');
        this.targetHeading = parseFloat((_u = parts[LineEvent0x15_fields.targetHeading + fieldOffset]) !== null && _u !== void 0 ? _u : '');
        this.hp = parseInt((_v = parts[LineEvent0x15_fields.sourceHp + fieldOffset]) !== null && _v !== void 0 ? _v : '');
        this.maxHp = parseInt((_w = parts[LineEvent0x15_fields.sourceMaxHp + fieldOffset]) !== null && _w !== void 0 ? _w : '');
        this.mp = parseInt((_x = parts[LineEvent0x15_fields.sourceMp + fieldOffset]) !== null && _x !== void 0 ? _x : '');
        this.maxMp = parseInt((_y = parts[LineEvent0x15_fields.sourceMaxMp + fieldOffset]) !== null && _y !== void 0 ? _y : '');
        this.x = parseFloat((_z = parts[LineEvent0x15_fields.x + fieldOffset]) !== null && _z !== void 0 ? _z : '');
        this.y = parseFloat((_0 = parts[LineEvent0x15_fields.y + fieldOffset]) !== null && _0 !== void 0 ? _0 : '');
        this.z = parseFloat((_1 = parts[LineEvent0x15_fields.z + fieldOffset]) !== null && _1 !== void 0 ? _1 : '');
        this.heading = parseFloat((_2 = parts[LineEvent0x15_fields.heading + fieldOffset]) !== null && _2 !== void 0 ? _2 : '');
        repo.updateCombatant(this.id, {
            job: undefined,
            name: this.name,
            spawn: this.timestamp,
            despawn: this.timestamp,
        });
        repo.updateCombatant(this.targetId, {
            job: undefined,
            name: this.targetName,
            spawn: this.timestamp,
            despawn: this.timestamp,
        });
    }
}
class LineEvent21 extends LineEvent0x15 {
}

;// CONCATENATED MODULE: ./ui/raidboss/emulator/data/network_log_converter/LineEvent0x16.ts

// Ability hit multiple/no target event
// Duplicate of 0x15 as far as data
class LineEvent0x16 extends LineEvent0x15 {
    constructor(repo, line, parts) {
        super(repo, line, parts);
    }
}
class LineEvent22 extends LineEvent0x16 {
}

;// CONCATENATED MODULE: ./ui/raidboss/emulator/data/network_log_converter/LineEvent0x17.ts

const LineEvent0x17_fields = {
    id: 2,
    name: 3,
    abilityId: 4,
    abilityName: 5,
    reason: 6,
};
// Cancel ability event
class LineEvent0x17 extends LineEvent {
    constructor(repo, line, parts) {
        var _a, _b, _c, _d, _e, _f, _g;
        super(repo, line, parts);
        this.isSource = true;
        this.isAbility = true;
        this.id = (_b = (_a = parts[LineEvent0x17_fields.id]) === null || _a === void 0 ? void 0 : _a.toUpperCase()) !== null && _b !== void 0 ? _b : '';
        this.name = (_c = parts[LineEvent0x17_fields.name]) !== null && _c !== void 0 ? _c : '';
        this.abilityId = parseInt((_e = (_d = parts[LineEvent0x17_fields.abilityId]) === null || _d === void 0 ? void 0 : _d.toUpperCase()) !== null && _e !== void 0 ? _e : '');
        this.abilityName = (_f = parts[LineEvent0x17_fields.abilityName]) !== null && _f !== void 0 ? _f : '';
        this.reason = (_g = parts[LineEvent0x17_fields.reason]) !== null && _g !== void 0 ? _g : '';
    }
}
class LineEvent23 extends LineEvent0x17 {
}

;// CONCATENATED MODULE: ./ui/raidboss/emulator/data/network_log_converter/LineEvent0x18.ts


const LineEvent0x18_fields = {
    id: 2,
    name: 3,
    type: 4,
    effectId: 5,
    damage: 6,
    currentHp: 7,
    maxHp: 8,
    currentMp: 9,
    maxMp: 10,
    currentTp: 11,
    maxTp: 12,
    x: 13,
    y: 14,
    z: 15,
    heading: 16,
};
// DoT/HoT event
class LineEvent0x18 extends LineEvent {
    constructor(repo, line, parts) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        super(repo, line, parts);
        this.isSource = true;
        this.id = (_b = (_a = parts[LineEvent0x18_fields.id]) === null || _a === void 0 ? void 0 : _a.toUpperCase()) !== null && _b !== void 0 ? _b : '';
        this.name = (_c = parts[LineEvent0x18_fields.name]) !== null && _c !== void 0 ? _c : '';
        this.type = (_d = parts[LineEvent0x18_fields.type]) !== null && _d !== void 0 ? _d : '';
        this.effectId = (_f = (_e = parts[LineEvent0x18_fields.effectId]) === null || _e === void 0 ? void 0 : _e.toUpperCase()) !== null && _f !== void 0 ? _f : '';
        this.damage = parseInt((_g = parts[LineEvent0x18_fields.damage]) !== null && _g !== void 0 ? _g : '', 16);
        this.hp = parseInt((_h = parts[LineEvent0x18_fields.currentHp]) !== null && _h !== void 0 ? _h : '');
        this.maxHp = parseInt((_j = parts[LineEvent0x18_fields.maxHp]) !== null && _j !== void 0 ? _j : '');
        this.mp = parseInt((_k = parts[LineEvent0x18_fields.currentMp]) !== null && _k !== void 0 ? _k : '');
        this.maxMp = parseInt((_l = parts[LineEvent0x18_fields.maxMp]) !== null && _l !== void 0 ? _l : '');
        this.tp = parseInt((_m = parts[LineEvent0x18_fields.currentTp]) !== null && _m !== void 0 ? _m : '');
        this.maxTp = parseInt((_o = parts[LineEvent0x18_fields.maxTp]) !== null && _o !== void 0 ? _o : '');
        this.x = parseFloat((_p = parts[LineEvent0x18_fields.x]) !== null && _p !== void 0 ? _p : '');
        this.y = parseFloat((_q = parts[LineEvent0x18_fields.y]) !== null && _q !== void 0 ? _q : '');
        this.z = parseFloat((_r = parts[LineEvent0x18_fields.z]) !== null && _r !== void 0 ? _r : '');
        this.heading = parseFloat((_s = parts[LineEvent0x18_fields.heading]) !== null && _s !== void 0 ? _s : '');
        repo.updateCombatant(this.id, {
            job: undefined,
            name: this.name,
            spawn: this.timestamp,
            despawn: this.timestamp,
        });
        let effectName = '';
        const resolvedName = repo.resolveName(this.id, this.name);
        if (this.effectId in LineEvent0x18.showEffectNamesFor)
            effectName = (_t = LineEvent0x18.showEffectNamesFor[this.effectId]) !== null && _t !== void 0 ? _t : '';
        let effectPart = '';
        if (effectName)
            effectPart = effectName + ' ';
        this.convertedLine = this.prefix() + effectPart + this.type +
            ' Tick on ' + resolvedName +
            ' for ' + this.damage.toString() + ' damage.';
        this.properCaseConvertedLine = this.prefix() + effectPart + this.type +
            ' Tick on ' + EmulatorCommon.properCase(resolvedName) +
            ' for ' + this.damage.toString() + ' damage.';
    }
}
LineEvent0x18.showEffectNamesFor = {
    '4C4': 'Excognition',
    '35D': 'Wildfire',
    '1F5': 'Doton',
    '2ED': 'Salted Earth',
    '4B5': 'Flamethrower',
    '2E3': 'Asylum',
    '777': 'Asylum',
    '798': 'Sacred Soil',
    '4C7': 'Fey Union',
    '742': 'Nascent Glint',
};
class LineEvent24 extends LineEvent0x18 {
}

;// CONCATENATED MODULE: ./ui/raidboss/emulator/data/network_log_converter/LineEvent0x19.ts


const LineEvent0x19_fields = {
    id: 2,
    name: 3,
    targetId: 4,
    targetName: 5,
};
// Combatant defeated event
class LineEvent0x19 extends LineEvent {
    constructor(repo, line, parts) {
        var _a, _b, _c, _d, _e, _f;
        super(repo, line, parts);
        this.id = (_b = (_a = parts[LineEvent0x19_fields.id]) === null || _a === void 0 ? void 0 : _a.toUpperCase()) !== null && _b !== void 0 ? _b : '';
        this.name = (_c = parts[LineEvent0x19_fields.name]) !== null && _c !== void 0 ? _c : '';
        this.targetId = (_e = (_d = parts[LineEvent0x19_fields.targetId]) === null || _d === void 0 ? void 0 : _d.toUpperCase()) !== null && _e !== void 0 ? _e : '';
        this.targetName = (_f = parts[LineEvent0x19_fields.targetName]) !== null && _f !== void 0 ? _f : '';
        repo.updateCombatant(this.id, {
            job: undefined,
            name: this.name,
            spawn: this.timestamp,
            despawn: this.timestamp,
        });
        repo.updateCombatant(this.targetId, {
            job: undefined,
            name: this.targetName,
            spawn: this.timestamp,
            despawn: this.timestamp,
        });
        let resolvedName = undefined;
        let resolvedTargetName = undefined;
        if (this.id !== '00')
            resolvedName = repo.resolveName(this.id, this.name);
        if (this.targetId !== '00')
            resolvedTargetName = repo.resolveName(this.targetId, this.targetName);
        const defeatedName = (resolvedName !== null && resolvedName !== void 0 ? resolvedName : this.name);
        const killerName = (resolvedTargetName !== null && resolvedTargetName !== void 0 ? resolvedTargetName : this.targetName);
        this.convertedLine = this.prefix() + defeatedName +
            ' was defeated by ' + killerName + '.';
        this.properCaseConvertedLine = this.prefix() + EmulatorCommon.properCase(defeatedName) +
            ' was defeated by ' + EmulatorCommon.properCase(killerName) + '.';
    }
}
class LineEvent25 extends LineEvent0x19 {
}

;// CONCATENATED MODULE: ./ui/raidboss/emulator/data/network_log_converter/LineEvent0x1A.ts


const LineEvent0x1A_fields = {
    abilityId: 2,
    abilityName: 3,
    durationString: 4,
    id: 5,
    name: 6,
    targetId: 7,
    targetName: 8,
    stacks: 9,
    targetHp: 10,
    sourceHp: 11,
};
// Gain status effect event
// Deliberately don't flag this as LineEventSource or LineEventTarget
// because 0x1A line values aren't accurate
class LineEvent0x1A extends LineEvent {
    constructor(repo, line, parts) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        super(repo, line, parts);
        this.isAbility = true;
        this.abilityId = parseInt((_b = (_a = parts[LineEvent0x1A_fields.abilityId]) === null || _a === void 0 ? void 0 : _a.toUpperCase()) !== null && _b !== void 0 ? _b : '');
        this.abilityName = (_c = parts[LineEvent0x1A_fields.abilityName]) !== null && _c !== void 0 ? _c : '';
        this.durationString = (_d = parts[LineEvent0x1A_fields.durationString]) !== null && _d !== void 0 ? _d : '';
        this.durationFloat = parseFloat(this.durationString);
        this.id = (_f = (_e = parts[LineEvent0x1A_fields.id]) === null || _e === void 0 ? void 0 : _e.toUpperCase()) !== null && _f !== void 0 ? _f : '';
        this.name = (_g = parts[LineEvent0x1A_fields.name]) !== null && _g !== void 0 ? _g : '';
        this.targetId = (_j = (_h = parts[LineEvent0x1A_fields.targetId]) === null || _h === void 0 ? void 0 : _h.toUpperCase()) !== null && _j !== void 0 ? _j : '';
        this.targetName = (_k = parts[LineEvent0x1A_fields.targetName]) !== null && _k !== void 0 ? _k : '';
        this.stacks = parseInt((_l = parts[LineEvent0x1A_fields.stacks]) !== null && _l !== void 0 ? _l : '0');
        this.targetHp = parseInt((_m = parts[LineEvent0x1A_fields.targetHp]) !== null && _m !== void 0 ? _m : '');
        this.hp = parseInt((_o = parts[LineEvent0x1A_fields.sourceHp]) !== null && _o !== void 0 ? _o : '');
        repo.updateCombatant(this.id, {
            name: this.name,
            spawn: this.timestamp,
            despawn: this.timestamp,
            job: undefined,
        });
        repo.updateCombatant(this.targetId, {
            name: this.targetName,
            spawn: this.timestamp,
            despawn: this.timestamp,
            job: undefined,
        });
        this.resolvedName = repo.resolveName(this.id, this.name);
        this.resolvedTargetName = repo.resolveName(this.targetId, this.targetName);
        this.fallbackResolvedTargetName =
            repo.resolveName(this.id, this.name, this.targetId, this.targetName);
        let stackCountText = '';
        if (this.stacks > 0 && this.stacks < 20 &&
            LineEvent0x1A.showStackCountFor.includes(this.abilityId))
            stackCountText = ' (' + this.stacks.toString() + ')';
        this.convertedLine = this.prefix() + this.targetId +
            ':' + this.targetName +
            ' gains the effect of ' + this.abilityName +
            ' from ' + this.fallbackResolvedTargetName +
            ' for ' + this.durationString + ' Seconds.' + stackCountText;
        this.properCaseConvertedLine = this.prefix() + this.targetId +
            ':' + EmulatorCommon.properCase(this.targetName) +
            ' gains the effect of ' + this.abilityName +
            ' from ' + EmulatorCommon.properCase(this.fallbackResolvedTargetName) +
            ' for ' + this.durationString + ' Seconds.' + stackCountText;
    }
}
LineEvent0x1A.showStackCountFor = [
    304,
    406,
    350,
    714,
    505,
    1239,
    1297,
];
class LineEvent26 extends LineEvent0x1A {
}

;// CONCATENATED MODULE: ./ui/raidboss/emulator/data/network_log_converter/LineEvent0x1B.ts

const LineEvent0x1B_fields = {
    targetId: 2,
    targetName: 3,
    headmarkerId: 6,
};
// Head marker event
class LineEvent0x1B extends LineEvent {
    constructor(repo, line, parts) {
        var _a, _b, _c, _d;
        super(repo, line, parts);
        this.isSource = true;
        this.id = (_b = (_a = parts[LineEvent0x1B_fields.targetId]) === null || _a === void 0 ? void 0 : _a.toUpperCase()) !== null && _b !== void 0 ? _b : '';
        this.name = (_c = parts[LineEvent0x1B_fields.targetName]) !== null && _c !== void 0 ? _c : '';
        this.headmarkerId = (_d = parts[LineEvent0x1B_fields.headmarkerId]) !== null && _d !== void 0 ? _d : '';
    }
}
class LineEvent27 extends LineEvent0x1B {
}

;// CONCATENATED MODULE: ./ui/raidboss/emulator/data/network_log_converter/LineEvent0x1C.ts

const LineEvent0x1C_fields = {
    operation: 2,
    waymark: 3,
    id: 4,
    name: 5,
    x: 6,
    y: 7,
    z: 8,
};
// Floor waymarker event
class LineEvent0x1C extends LineEvent {
    constructor(repo, line, parts) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        super(repo, line, parts);
        this.operation = (_a = parts[LineEvent0x1C_fields.operation]) !== null && _a !== void 0 ? _a : '';
        this.waymark = (_b = parts[LineEvent0x1C_fields.waymark]) !== null && _b !== void 0 ? _b : '';
        this.id = (_d = (_c = parts[LineEvent0x1C_fields.id]) === null || _c === void 0 ? void 0 : _c.toUpperCase()) !== null && _d !== void 0 ? _d : '';
        this.name = (_e = parts[LineEvent0x1C_fields.name]) !== null && _e !== void 0 ? _e : '';
        this.x = (_f = parts[LineEvent0x1C_fields.x]) !== null && _f !== void 0 ? _f : '';
        this.y = (_g = parts[LineEvent0x1C_fields.y]) !== null && _g !== void 0 ? _g : '';
        this.z = (_h = parts[LineEvent0x1C_fields.z]) !== null && _h !== void 0 ? _h : '';
    }
}
class LineEvent28 extends LineEvent0x1C {
}

;// CONCATENATED MODULE: ./ui/raidboss/emulator/data/network_log_converter/LineEvent0x1D.ts

const LineEvent0x1D_fields = {
    operation: 2,
    waymark: 3,
    id: 4,
    name: 5,
    targetId: 6,
    targetName: 7,
};
// Waymarker
class LineEvent0x1D extends LineEvent {
    constructor(repo, line, parts) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        super(repo, line, parts);
        this.operation = (_a = parts[LineEvent0x1D_fields.operation]) !== null && _a !== void 0 ? _a : '';
        this.waymark = (_b = parts[LineEvent0x1D_fields.waymark]) !== null && _b !== void 0 ? _b : '';
        this.id = (_d = (_c = parts[LineEvent0x1D_fields.id]) === null || _c === void 0 ? void 0 : _c.toUpperCase()) !== null && _d !== void 0 ? _d : '';
        this.name = (_e = parts[LineEvent0x1D_fields.name]) !== null && _e !== void 0 ? _e : '';
        this.targetId = (_g = (_f = parts[LineEvent0x1D_fields.targetId]) === null || _f === void 0 ? void 0 : _f.toUpperCase()) !== null && _g !== void 0 ? _g : '';
        this.targetName = (_h = parts[LineEvent0x1D_fields.targetName]) !== null && _h !== void 0 ? _h : '';
    }
}
class LineEvent29 extends LineEvent0x1D {
}

;// CONCATENATED MODULE: ./ui/raidboss/emulator/data/network_log_converter/LineEvent0x1E.ts


// Lose status effect event
// Extend the gain status event to reduce duplicate code since they're
// the same from a data perspective
class LineEvent0x1E extends LineEvent0x1A {
    constructor(repo, line, parts) {
        super(repo, line, parts);
        let stackCountText = '';
        if (this.stacks > 0 && this.stacks < 20 &&
            LineEvent0x1A.showStackCountFor.includes(this.abilityId))
            stackCountText = ' (' + this.stacks.toString() + ')';
        this.convertedLine = this.prefix() + this.targetId +
            ':' + this.targetName +
            ' loses the effect of ' + this.abilityName +
            ' from ' + this.fallbackResolvedTargetName +
            ' for ' + this.durationString + ' Seconds.' + stackCountText;
        this.properCaseConvertedLine = this.prefix() + this.targetId +
            ':' + EmulatorCommon.properCase(this.targetName) +
            ' loses the effect of ' + this.abilityName +
            ' from ' + EmulatorCommon.properCase(this.fallbackResolvedTargetName) +
            ' for ' + this.durationString + ' Seconds.' + stackCountText;
    }
}
class LineEvent30 extends LineEvent0x1E {
}

;// CONCATENATED MODULE: ./ui/raidboss/emulator/data/network_log_converter/LineEvent0x1F.ts


const splitFunc = (s) => [
    s.substr(6, 2),
    s.substr(4, 2),
    s.substr(2, 2),
    s.substr(0, 2),
];
const LineEvent0x1F_fields = {
    id: 2,
    dataBytes1: 3,
    dataBytes2: 4,
    dataBytes3: 5,
    dataBytes4: 6,
};
// Job gauge event
class LineEvent0x1F extends LineEvent {
    constructor(repo, line, parts) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        super(repo, line, parts);
        this.id = (_b = (_a = parts[LineEvent0x1F_fields.id]) === null || _a === void 0 ? void 0 : _a.toUpperCase()) !== null && _b !== void 0 ? _b : '';
        this.dataBytes1 = EmulatorCommon.zeroPad((_c = parts[LineEvent0x1F_fields.dataBytes1]) !== null && _c !== void 0 ? _c : '');
        this.dataBytes2 = EmulatorCommon.zeroPad((_d = parts[LineEvent0x1F_fields.dataBytes2]) !== null && _d !== void 0 ? _d : '');
        this.dataBytes3 = EmulatorCommon.zeroPad((_e = parts[LineEvent0x1F_fields.dataBytes3]) !== null && _e !== void 0 ? _e : '');
        this.dataBytes4 = EmulatorCommon.zeroPad((_f = parts[LineEvent0x1F_fields.dataBytes4]) !== null && _f !== void 0 ? _f : '');
        this.jobGaugeBytes = [
            ...splitFunc(this.dataBytes1),
            ...splitFunc(this.dataBytes2),
            ...splitFunc(this.dataBytes3),
            ...splitFunc(this.dataBytes4),
        ];
        this.name = ((_g = repo.Combatants[this.id]) === null || _g === void 0 ? void 0 : _g.name) || '';
        repo.updateCombatant(this.id, {
            name: (_h = repo.Combatants[this.id]) === null || _h === void 0 ? void 0 : _h.name,
            spawn: this.timestamp,
            despawn: this.timestamp,
            job: (_j = this.jobGaugeBytes[0]) === null || _j === void 0 ? void 0 : _j.toUpperCase(),
        });
        this.convertedLine = this.prefix() +
            this.id + ':' + this.name +
            ':' + this.dataBytes1 +
            ':' + this.dataBytes2 +
            ':' + this.dataBytes3 +
            ':' + this.dataBytes4;
        this.properCaseConvertedLine = this.prefix() +
            this.id + ':' + (EmulatorCommon.properCase(this.name)) +
            ':' + this.dataBytes1 +
            ':' + this.dataBytes2 +
            ':' + this.dataBytes3 +
            ':' + this.dataBytes4;
    }
}
class LineEvent31 extends LineEvent0x1F {
}

;// CONCATENATED MODULE: ./ui/raidboss/emulator/data/network_log_converter/LineEvent0x22.ts

const LineEvent0x22_fields = {
    id: 2,
    name: 3,
    targetId: 4,
    targetName: 5,
    targetable: 6,
};
// Nameplate toggle
class LineEvent0x22 extends LineEvent {
    constructor(repo, line, parts) {
        var _a, _b, _c, _d, _e, _f, _g;
        super(repo, line, parts);
        this.isSource = true;
        this.id = (_b = (_a = parts[LineEvent0x22_fields.id]) === null || _a === void 0 ? void 0 : _a.toUpperCase()) !== null && _b !== void 0 ? _b : '';
        this.name = (_c = parts[LineEvent0x22_fields.name]) !== null && _c !== void 0 ? _c : '';
        this.targetId = (_e = (_d = parts[LineEvent0x22_fields.targetId]) === null || _d === void 0 ? void 0 : _d.toUpperCase()) !== null && _e !== void 0 ? _e : '';
        this.targetName = (_f = parts[LineEvent0x22_fields.targetName]) !== null && _f !== void 0 ? _f : '';
        this.targetable = !!parseInt((_g = parts[LineEvent0x22_fields.targetable]) !== null && _g !== void 0 ? _g : '', 16);
    }
}
class LineEvent34 extends LineEvent0x22 {
}

;// CONCATENATED MODULE: ./ui/raidboss/emulator/data/network_log_converter/LineEvent0x23.ts

const LineEvent0x23_fields = {
    id: 2,
    name: 3,
    targetId: 4,
    targetName: 5,
    tetherId: 8,
};
// Tether event
class LineEvent0x23 extends LineEvent {
    constructor(repo, line, parts) {
        var _a, _b, _c, _d, _e, _f, _g;
        super(repo, line, parts);
        this.id = (_b = (_a = parts[LineEvent0x23_fields.id]) === null || _a === void 0 ? void 0 : _a.toUpperCase()) !== null && _b !== void 0 ? _b : '';
        this.name = (_c = parts[LineEvent0x23_fields.name]) !== null && _c !== void 0 ? _c : '';
        this.targetId = (_e = (_d = parts[LineEvent0x23_fields.targetId]) === null || _d === void 0 ? void 0 : _d.toUpperCase()) !== null && _e !== void 0 ? _e : '';
        this.targetName = (_f = parts[LineEvent0x23_fields.targetName]) !== null && _f !== void 0 ? _f : '';
        this.tetherId = (_g = parts[LineEvent0x23_fields.tetherId]) !== null && _g !== void 0 ? _g : '';
    }
}
class LineEvent35 extends LineEvent0x23 {
}

;// CONCATENATED MODULE: ./ui/raidboss/emulator/data/network_log_converter/LineEvent0x24.ts

const LineEvent0x24_fields = {
    valueHex: 2,
    bars: 3,
};
// Limit gauge event
class LineEvent0x24 extends LineEvent {
    constructor(repo, line, parts) {
        var _a, _b;
        super(repo, line, parts);
        this.valueHex = (_a = parts[LineEvent0x24_fields.valueHex]) !== null && _a !== void 0 ? _a : '';
        this.valueDec = parseInt(this.valueHex, 16);
        this.bars = (_b = parts[LineEvent0x24_fields.bars]) !== null && _b !== void 0 ? _b : '';
        this.convertedLine = this.prefix() + 'Limit Break: ' + this.valueHex;
    }
}
class LineEvent36 extends LineEvent0x24 {
}

;// CONCATENATED MODULE: ./ui/raidboss/emulator/data/network_log_converter/LineEvent0x25.ts

const LineEvent0x25_fields = {
    id: 2,
    name: 3,
    sequenceId: 4,
    currentHp: 5,
    maxHp: 6,
    currentMp: 7,
    maxMp: 8,
    currentTp: 9,
    maxTp: 10,
    x: 11,
    y: 12,
    z: 13,
    heading: 14,
};
// Action sync event
class LineEvent0x25 extends LineEvent {
    constructor(repo, line, parts) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        super(repo, line, parts);
        this.isSource = true;
        this.id = (_b = (_a = parts[LineEvent0x25_fields.id]) === null || _a === void 0 ? void 0 : _a.toUpperCase()) !== null && _b !== void 0 ? _b : '';
        this.name = (_c = parts[LineEvent0x25_fields.name]) !== null && _c !== void 0 ? _c : '';
        this.sequenceId = (_d = parts[LineEvent0x25_fields.sequenceId]) !== null && _d !== void 0 ? _d : '';
        this.hp = parseInt((_e = parts[LineEvent0x25_fields.currentHp]) !== null && _e !== void 0 ? _e : '');
        this.maxHp = parseInt((_f = parts[LineEvent0x25_fields.maxHp]) !== null && _f !== void 0 ? _f : '');
        this.mp = parseInt((_g = parts[LineEvent0x25_fields.currentMp]) !== null && _g !== void 0 ? _g : '');
        this.maxMp = parseInt((_h = parts[LineEvent0x25_fields.maxMp]) !== null && _h !== void 0 ? _h : '');
        this.tp = parseInt((_j = parts[LineEvent0x25_fields.currentTp]) !== null && _j !== void 0 ? _j : '');
        this.maxTp = parseInt((_k = parts[LineEvent0x25_fields.maxTp]) !== null && _k !== void 0 ? _k : '');
        this.x = parseFloat((_l = parts[LineEvent0x25_fields.x]) !== null && _l !== void 0 ? _l : '');
        this.y = parseFloat((_m = parts[LineEvent0x25_fields.y]) !== null && _m !== void 0 ? _m : '');
        this.z = parseFloat((_o = parts[LineEvent0x25_fields.z]) !== null && _o !== void 0 ? _o : '');
        this.heading = parseFloat((_p = parts[LineEvent0x25_fields.heading]) !== null && _p !== void 0 ? _p : '');
    }
}
class LineEvent37 extends LineEvent0x25 {
}

;// CONCATENATED MODULE: ./ui/raidboss/emulator/data/network_log_converter/LineEvent0x26.ts



const LineEvent0x26_fields = {
    id: 2,
    name: 3,
    jobLevelData: 4,
    currentHp: 5,
    maxHp: 6,
    currentMp: 7,
    maxMp: 8,
    currentTp: 9,
    maxTp: 10,
    x: 11,
    y: 12,
    z: 13,
    heading: 14,
};
// Network status effect event
class LineEvent0x26 extends LineEvent {
    constructor(repo, line, parts) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        super(repo, line, parts);
        this.isSource = true;
        this.isJobLevel = true;
        this.id = (_b = (_a = parts[LineEvent0x26_fields.id]) === null || _a === void 0 ? void 0 : _a.toUpperCase()) !== null && _b !== void 0 ? _b : '';
        this.name = (_c = parts[LineEvent0x26_fields.name]) !== null && _c !== void 0 ? _c : '';
        this.jobLevelData = (_d = parts[LineEvent0x26_fields.jobLevelData]) !== null && _d !== void 0 ? _d : '';
        this.hp = parseInt((_e = parts[LineEvent0x26_fields.currentHp]) !== null && _e !== void 0 ? _e : '');
        this.maxHp = parseInt((_f = parts[LineEvent0x26_fields.maxHp]) !== null && _f !== void 0 ? _f : '');
        this.mp = parseInt((_g = parts[LineEvent0x26_fields.currentMp]) !== null && _g !== void 0 ? _g : '');
        this.maxMp = parseInt((_h = parts[LineEvent0x26_fields.maxMp]) !== null && _h !== void 0 ? _h : '');
        this.tp = parseInt((_j = parts[LineEvent0x26_fields.currentTp]) !== null && _j !== void 0 ? _j : '');
        this.maxTp = parseInt((_k = parts[LineEvent0x26_fields.maxTp]) !== null && _k !== void 0 ? _k : '');
        this.x = parseFloat((_l = parts[LineEvent0x26_fields.x]) !== null && _l !== void 0 ? _l : '');
        this.y = parseFloat((_m = parts[LineEvent0x26_fields.y]) !== null && _m !== void 0 ? _m : '');
        this.z = parseFloat((_o = parts[LineEvent0x26_fields.z]) !== null && _o !== void 0 ? _o : '');
        this.heading = parseFloat((_p = parts[LineEvent0x26_fields.heading]) !== null && _p !== void 0 ? _p : '');
        const padded = EmulatorCommon.zeroPad(this.jobLevelData, 8);
        this.jobIdHex = padded.substr(6, 2).toUpperCase();
        this.jobId = parseInt(this.jobIdHex, 16);
        this.job = util.jobEnumToJob(this.jobId);
        this.level = parseInt(padded.substr(4, 2), 16);
    }
}
class LineEvent38 extends LineEvent0x26 {
}

;// CONCATENATED MODULE: ./ui/raidboss/emulator/data/network_log_converter/LineEvent0x27.ts

const LineEvent0x27_fields = {
    id: 2,
    name: 3,
    currentHp: 4,
    maxHp: 5,
    currentMp: 6,
    maxMp: 7,
    currentTp: 8,
    maxTp: 9,
    x: 10,
    y: 11,
    z: 12,
    heading: 13,
};
// Network update hp event
class LineEvent0x27 extends LineEvent {
    constructor(repo, line, parts) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        super(repo, line, parts);
        this.isSource = true;
        this.id = (_b = (_a = parts[LineEvent0x27_fields.id]) === null || _a === void 0 ? void 0 : _a.toUpperCase()) !== null && _b !== void 0 ? _b : '';
        this.name = (_c = parts[LineEvent0x27_fields.name]) !== null && _c !== void 0 ? _c : '';
        this.hp = parseInt((_d = parts[LineEvent0x27_fields.currentHp]) !== null && _d !== void 0 ? _d : '');
        this.maxHp = parseInt((_e = parts[LineEvent0x27_fields.maxHp]) !== null && _e !== void 0 ? _e : '');
        this.mp = parseInt((_f = parts[LineEvent0x27_fields.currentMp]) !== null && _f !== void 0 ? _f : '');
        this.maxMp = parseInt((_g = parts[LineEvent0x27_fields.maxMp]) !== null && _g !== void 0 ? _g : '');
        this.tp = parseInt((_h = parts[LineEvent0x27_fields.currentTp]) !== null && _h !== void 0 ? _h : '');
        this.maxTp = parseInt((_j = parts[LineEvent0x27_fields.maxTp]) !== null && _j !== void 0 ? _j : '');
        this.x = parseFloat((_k = parts[LineEvent0x27_fields.x]) !== null && _k !== void 0 ? _k : '');
        this.y = parseFloat((_l = parts[LineEvent0x27_fields.y]) !== null && _l !== void 0 ? _l : '');
        this.z = parseFloat((_m = parts[LineEvent0x27_fields.z]) !== null && _m !== void 0 ? _m : '');
        this.heading = parseFloat((_o = parts[LineEvent0x27_fields.heading]) !== null && _o !== void 0 ? _o : '');
    }
}
class LineEvent39 extends LineEvent0x27 {
}

;// CONCATENATED MODULE: ./ui/raidboss/emulator/data/network_log_converter/ParseLine.ts

























class ParseLine {
    static parse(repo, line) {
        let ret;
        const parts = line.split('|');
        const event = parts[0];
        // Don't parse raw network packet lines
        if (!event || event === '252')
            return;
        // This is ugly, but Webpack prefers being explicit
        switch ('LineEvent' + event) {
            case 'LineEvent00':
                ret = new LineEvent00(repo, line, parts);
                break;
            case 'LineEvent01':
                ret = new LineEvent01(repo, line, parts);
                break;
            case 'LineEvent02':
                ret = new LineEvent02(repo, line, parts);
                break;
            case 'LineEvent03':
                ret = new LineEvent03(repo, line, parts);
                break;
            case 'LineEvent04':
                ret = new LineEvent04(repo, line, parts);
                break;
            case 'LineEvent12':
                ret = new LineEvent12(repo, line, parts);
                break;
            case 'LineEvent20':
                ret = new LineEvent20(repo, line, parts);
                break;
            case 'LineEvent21':
                ret = new LineEvent21(repo, line, parts);
                break;
            case 'LineEvent22':
                ret = new LineEvent22(repo, line, parts);
                break;
            case 'LineEvent23':
                ret = new LineEvent23(repo, line, parts);
                break;
            case 'LineEvent24':
                ret = new LineEvent24(repo, line, parts);
                break;
            case 'LineEvent25':
                ret = new LineEvent25(repo, line, parts);
                break;
            case 'LineEvent26':
                ret = new LineEvent26(repo, line, parts);
                break;
            case 'LineEvent27':
                ret = new LineEvent27(repo, line, parts);
                break;
            case 'LineEvent28':
                ret = new LineEvent28(repo, line, parts);
                break;
            case 'LineEvent29':
                ret = new LineEvent29(repo, line, parts);
                break;
            case 'LineEvent30':
                ret = new LineEvent30(repo, line, parts);
                break;
            case 'LineEvent31':
                ret = new LineEvent31(repo, line, parts);
                break;
            case 'LineEvent34':
                ret = new LineEvent34(repo, line, parts);
                break;
            case 'LineEvent35':
                ret = new LineEvent35(repo, line, parts);
                break;
            case 'LineEvent36':
                ret = new LineEvent36(repo, line, parts);
                break;
            case 'LineEvent37':
                ret = new LineEvent37(repo, line, parts);
                break;
            case 'LineEvent38':
                ret = new LineEvent38(repo, line, parts);
                break;
            case 'LineEvent39':
                ret = new LineEvent39(repo, line, parts);
                break;
            default:
                ret = new LineEvent(repo, line, parts);
        }
        // Also don't parse lines with a non-sane date. This is 2000-01-01 00:00:00
        if (ret && ret.timestamp < 946684800)
            return;
        // Finally, if the object marks itself as invalid, skip it
        if (ret && ret.invalid)
            return;
        return ret;
    }
}

;// CONCATENATED MODULE: ./ui/raidboss/emulator/data/NetworkLogConverter.ts



const isLineEvent = (line) => {
    return !!line;
};
class NetworkLogConverter extends EventBus {
    convertFile(data) {
        const repo = new LogRepository();
        return this.convertLines(
        // Split data into an array of separate lines, removing any blank lines.
        data.split(NetworkLogConverter.lineSplitRegex).filter((l) => l !== ''), repo);
    }
    convertLines(lines, repo) {
        let lineEvents = lines.map((l) => ParseLine.parse(repo, l)).filter(isLineEvent);
        // Call `convert` to convert the network line to non-network format and update indexing values
        lineEvents = lineEvents.map((l, i) => {
            l.index = i;
            return l;
        });
        // Sort the lines based on `${timestamp}_${index}` to handle out-of-order lines properly
        // @TODO: Remove this once underlying CombatantTracker update issues are resolved
        return lineEvents.sort((l, r) => (`${l.timestamp}_${l.index}`).localeCompare(`${r.timestamp}_${r.index}`));
    }
}
NetworkLogConverter.lineSplitRegex = /\r?\n/gm;

;// CONCATENATED MODULE: ./resources/languages.ts
const languages = ['en', 'de', 'fr', 'ja', 'cn', 'ko'];
const langMap = {
    en: {
        en: 'English',
        de: 'German',
        fr: 'French',
        ja: 'Japanese',
        cn: 'Chinese',
        ko: 'Korean',
    },
    de: {
        en: 'Englisch',
        de: 'Deutsch',
        fr: 'Französisch',
        ja: 'Japanisch',
        cn: 'Chinesisch',
        ko: 'Koreanisch',
    },
    fr: {
        en: 'Anglais',
        de: 'Allemand',
        fr: 'Français',
        ja: 'Japonais',
        cn: 'Chinois',
        ko: 'Coréen',
    },
    ja: {
        en: '英語',
        de: 'ドイツ語',
        fr: 'フランス語',
        ja: '日本語',
        cn: '中国語',
        ko: '韓国語',
    },
    cn: {
        en: '英语',
        de: '德语',
        fr: '法语',
        ja: '日语',
        cn: '中文',
        ko: '韩语',
    },
    ko: {
        en: '영어',
        de: '독일어',
        fr: '프랑스어',
        ja: '일본어',
        cn: '중국어',
        ko: '한국어',
    },
};
const isLang = (lang) => {
    const langStrs = languages;
    if (!lang)
        return false;
    return langStrs.includes(lang);
};

;// CONCATENATED MODULE: ./ui/raidboss/emulator/data/Encounter.ts








const isPetName = (name, language) => {
    if (language)
        return pet_names[language].includes(name);
    for (const lang in pet_names) {
        if (!isLang(lang))
            throw new UnreachableCode();
        if (pet_names[lang].includes(name))
            return true;
    }
    return false;
};
const isValidTimestamp = (timestamp) => {
    return timestamp > 0 && timestamp < Number.MAX_SAFE_INTEGER;
};
class Encounter {
    constructor(encounterDay, encounterZoneId, encounterZoneName, logLines) {
        this.encounterDay = encounterDay;
        this.encounterZoneId = encounterZoneId;
        this.encounterZoneName = encounterZoneName;
        this.logLines = logLines;
        this.initialOffset = Number.MAX_SAFE_INTEGER;
        this.endStatus = 'Unknown';
        this.startStatus = 'Unknown';
        this.engageAt = Number.MAX_SAFE_INTEGER;
        this.firstPlayerAbility = Number.MAX_SAFE_INTEGER;
        this.firstEnemyAbility = Number.MAX_SAFE_INTEGER;
        this.firstLineIndex = 0;
        this.startTimestamp = 0;
        this.endTimestamp = 0;
        this.duration = 0;
        this.playbackOffset = 0;
        this.language = 'en';
        this.version = Encounter.encounterVersion;
    }
    initialize() {
        const startStatuses = new Set();
        this.logLines.forEach((line, i) => {
            if (!line)
                throw new UnreachableCode();
            let res = EmulatorCommon.matchStart(line.networkLine);
            if (res) {
                this.firstLineIndex = i;
                if (res.StartType)
                    startStatuses.add(res.StartType);
                const startIn = parseInt(res.StartIn);
                if (startIn >= 0)
                    this.engageAt = Math.min(line.timestamp + startIn, this.engageAt);
            }
            else {
                res = EmulatorCommon.matchEnd(line.networkLine);
                if (res) {
                    if (res.EndType)
                        this.endStatus = res.EndType;
                }
                else if (isLineEventSource(line) && isLineEventTarget(line)) {
                    if (line.id.startsWith('1') ||
                        (line.id.startsWith('4') && isPetName(line.name, this.language))) {
                        // Player or pet ability
                        if (line.targetId.startsWith('4') && !isPetName(line.targetName, this.language)) {
                            // Targetting non player or pet
                            this.firstPlayerAbility = Math.min(this.firstPlayerAbility, line.timestamp);
                        }
                    }
                    else if (line.id.startsWith('4') && !isPetName(line.name, this.language)) {
                        // Non-player ability
                        if (line.targetId.startsWith('1') || isPetName(line.targetName, this.language)) {
                            // Targetting player or pet
                            this.firstEnemyAbility = Math.min(this.firstEnemyAbility, line.timestamp);
                        }
                    }
                }
            }
            const matchedLang = res === null || res === void 0 ? void 0 : res.language;
            if (isLang(matchedLang))
                this.language = matchedLang;
        });
        this.combatantTracker = new CombatantTracker(this.logLines, this.language);
        this.startTimestamp = this.combatantTracker.firstTimestamp;
        this.endTimestamp = this.combatantTracker.lastTimestamp;
        this.duration = this.endTimestamp - this.startTimestamp;
        if (this.initialOffset === Number.MAX_SAFE_INTEGER) {
            if (this.engageAt < Number.MAX_SAFE_INTEGER)
                this.initialOffset = this.engageAt - this.startTimestamp;
            else if (this.firstPlayerAbility < Number.MAX_SAFE_INTEGER)
                this.initialOffset = this.firstPlayerAbility - this.startTimestamp;
            else if (this.firstEnemyAbility < Number.MAX_SAFE_INTEGER)
                this.initialOffset = this.firstEnemyAbility - this.startTimestamp;
            else
                this.initialOffset = 0;
        }
        const firstLine = this.logLines[this.firstLineIndex];
        if (firstLine && firstLine.offset)
            this.playbackOffset = firstLine.offset;
        this.startStatus = [...startStatuses].sort().join(', ');
    }
    get initialTimestamp() {
        return this.startTimestamp + this.initialOffset;
    }
    shouldPersistFight() {
        return isValidTimestamp(this.firstPlayerAbility) && isValidTimestamp(this.firstEnemyAbility);
    }
    upgrade(version) {
        if (Encounter.encounterVersion <= version)
            return false;
        const repo = new LogRepository();
        const converter = new NetworkLogConverter();
        this.logLines = converter.convertLines(this.logLines.map((l) => l.networkLine), repo);
        this.version = Encounter.encounterVersion;
        this.initialize();
        return true;
    }
}
Encounter.encounterVersion = 1;

;// CONCATENATED MODULE: ./ui/raidboss/emulator/data/LogEventHandler.ts



class LogEventHandler extends EventBus {
    constructor() {
        super(...arguments);
        this.currentFight = [];
        this.currentZoneName = 'Unknown';
        this.currentZoneId = '-1';
    }
    parseLogs(logs) {
        for (const lineObj of logs) {
            this.currentFight.push(lineObj);
            lineObj.offset = lineObj.timestamp - this.currentFightStart;
            const res = EmulatorCommon.matchEnd(lineObj.networkLine);
            if (res) {
                this.endFight();
            }
            else if (lineObj instanceof LineEvent0x01) {
                this.currentZoneId = lineObj.zoneId;
                this.currentZoneName = lineObj.zoneName;
                this.endFight();
            }
        }
    }
    get currentFightStart() {
        var _a, _b;
        return (_b = (_a = this.currentFight[0]) === null || _a === void 0 ? void 0 : _a.timestamp) !== null && _b !== void 0 ? _b : 0;
    }
    get currentFightEnd() {
        var _a, _b;
        return (_b = (_a = this.currentFight.slice(-1)[0]) === null || _a === void 0 ? void 0 : _a.timestamp) !== null && _b !== void 0 ? _b : 0;
    }
    endFight() {
        if (this.currentFight.length < 2)
            return;
        const start = new Date(this.currentFightStart).toISOString();
        const end = new Date(this.currentFightEnd).toISOString();
        console.debug(`Dispatching new fight
Start: ${start}
End: ${end}
Zone: ${this.currentZoneName}
Line Count: ${this.currentFight.length}
`);
        void this.dispatch('fight', start.substr(0, 10), this.currentZoneId, this.currentZoneName, this.currentFight);
        this.currentFight = [];
    }
}

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??ruleSet[1].rules[1].use!./ui/raidboss/emulator/data/NetworkLogConverterWorker.js






onmessage = async msg => {
  const logConverter = new NetworkLogConverter();
  const localLogHandler = new LogEventHandler();
  const repo = new LogRepository(); // Listen for LogEventHandler to dispatch fights and persist them

  localLogHandler.on('fight', async (day, zoneId, zoneName, lines) => {
    const enc = new Encounter(day, zoneId, zoneName, lines);
    enc.initialize();

    if (enc.shouldPersistFight()) {
      postMessage({
        type: 'encounter',
        encounter: enc,
        name: enc.combatantTracker.getMainCombatantName()
      });
    }
  }); // Convert the message manually due to memory issues with extremely large files

  const decoder = new TextDecoder('UTF-8');
  let buf = new Uint8Array(msg.data);
  let nextOffset = 0;
  let lines = [];
  let lineCount = 0;

  for (let currentOffset = nextOffset; nextOffset < buf.length && nextOffset !== -1; currentOffset = nextOffset) {
    nextOffset = buf.indexOf(0x0A, nextOffset + 1);
    const line = decoder.decode(buf.slice(currentOffset, nextOffset)).trim();

    if (line.length) {
      ++lineCount;
      lines.push(line);
    }

    if (lines.length >= 1000) {
      lines = logConverter.convertLines(lines, repo);
      localLogHandler.parseLogs(lines);
      postMessage({
        type: 'progress',
        lines: lineCount,
        bytes: nextOffset,
        totalBytes: buf.length
      });
      lines = [];
    }
  }

  if (lines.length > 0) {
    lines = logConverter.convertLines(lines, repo);
    localLogHandler.parseLogs(lines);
    lines = [];
  }

  postMessage({
    type: 'progress',
    lines: lineCount,
    bytes: buf.length,
    totalBytes: buf.length
  });
  buf = null;
  localLogHandler.endFight();
  postMessage({
    type: 'done'
  });
};
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYWN0Ym90Ly4vcmVzb3VyY2VzL3JlZ2V4ZXMudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3Jlc291cmNlcy9uZXRyZWdleGVzLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi9yZXNvdXJjZXMvdHJhbnNsYXRpb25zLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9yYWlkYm9zcy9lbXVsYXRvci9FbXVsYXRvckNvbW1vbi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vcmVzb3VyY2VzL25vdF9yZWFjaGVkLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9yYWlkYm9zcy9lbXVsYXRvci9kYXRhL0NvbWJhdGFudC50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvcmFpZGJvc3MvZW11bGF0b3IvZGF0YS9Db21iYXRhbnRKb2JTZWFyY2gudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL3JhaWRib3NzL2VtdWxhdG9yL2RhdGEvQ29tYmF0YW50U3RhdGUudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3Jlc291cmNlcy9wZXRfbmFtZXMudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL3JhaWRib3NzL2VtdWxhdG9yL2RhdGEvbmV0d29ya19sb2dfY29udmVydGVyL0xpbmVFdmVudC50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvcmFpZGJvc3MvZW11bGF0b3IvZGF0YS9Db21iYXRhbnRUcmFja2VyLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9yYWlkYm9zcy9lbXVsYXRvci9kYXRhL25ldHdvcmtfbG9nX2NvbnZlcnRlci9Mb2dSZXBvc2l0b3J5LnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9yYWlkYm9zcy9lbXVsYXRvci9FdmVudEJ1cy50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvcmFpZGJvc3MvZW11bGF0b3IvZGF0YS9uZXR3b3JrX2xvZ19jb252ZXJ0ZXIvTGluZUV2ZW50MHgwMC50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvcmFpZGJvc3MvZW11bGF0b3IvZGF0YS9uZXR3b3JrX2xvZ19jb252ZXJ0ZXIvTGluZUV2ZW50MHgwMS50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvcmFpZGJvc3MvZW11bGF0b3IvZGF0YS9uZXR3b3JrX2xvZ19jb252ZXJ0ZXIvTGluZUV2ZW50MHgwMi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vcmVzb3VyY2VzL292ZXJsYXlfcGx1Z2luX2FwaS50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vcmVzb3VyY2VzL3V0aWwudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL3JhaWRib3NzL2VtdWxhdG9yL2RhdGEvbmV0d29ya19sb2dfY29udmVydGVyL0xpbmVFdmVudDB4MDMudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL3JhaWRib3NzL2VtdWxhdG9yL2RhdGEvbmV0d29ya19sb2dfY29udmVydGVyL0xpbmVFdmVudDB4MDQudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL3JhaWRib3NzL2VtdWxhdG9yL2RhdGEvbmV0d29ya19sb2dfY29udmVydGVyL0xpbmVFdmVudDB4MEMudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL3JhaWRib3NzL2VtdWxhdG9yL2RhdGEvbmV0d29ya19sb2dfY29udmVydGVyL0xpbmVFdmVudDB4MTQudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL3JhaWRib3NzL2VtdWxhdG9yL2RhdGEvbmV0d29ya19sb2dfY29udmVydGVyL0xpbmVFdmVudDB4MTUudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL3JhaWRib3NzL2VtdWxhdG9yL2RhdGEvbmV0d29ya19sb2dfY29udmVydGVyL0xpbmVFdmVudDB4MTYudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL3JhaWRib3NzL2VtdWxhdG9yL2RhdGEvbmV0d29ya19sb2dfY29udmVydGVyL0xpbmVFdmVudDB4MTcudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL3JhaWRib3NzL2VtdWxhdG9yL2RhdGEvbmV0d29ya19sb2dfY29udmVydGVyL0xpbmVFdmVudDB4MTgudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL3JhaWRib3NzL2VtdWxhdG9yL2RhdGEvbmV0d29ya19sb2dfY29udmVydGVyL0xpbmVFdmVudDB4MTkudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL3JhaWRib3NzL2VtdWxhdG9yL2RhdGEvbmV0d29ya19sb2dfY29udmVydGVyL0xpbmVFdmVudDB4MUEudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL3JhaWRib3NzL2VtdWxhdG9yL2RhdGEvbmV0d29ya19sb2dfY29udmVydGVyL0xpbmVFdmVudDB4MUIudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL3JhaWRib3NzL2VtdWxhdG9yL2RhdGEvbmV0d29ya19sb2dfY29udmVydGVyL0xpbmVFdmVudDB4MUMudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL3JhaWRib3NzL2VtdWxhdG9yL2RhdGEvbmV0d29ya19sb2dfY29udmVydGVyL0xpbmVFdmVudDB4MUQudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL3JhaWRib3NzL2VtdWxhdG9yL2RhdGEvbmV0d29ya19sb2dfY29udmVydGVyL0xpbmVFdmVudDB4MUUudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL3JhaWRib3NzL2VtdWxhdG9yL2RhdGEvbmV0d29ya19sb2dfY29udmVydGVyL0xpbmVFdmVudDB4MUYudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL3JhaWRib3NzL2VtdWxhdG9yL2RhdGEvbmV0d29ya19sb2dfY29udmVydGVyL0xpbmVFdmVudDB4MjIudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL3JhaWRib3NzL2VtdWxhdG9yL2RhdGEvbmV0d29ya19sb2dfY29udmVydGVyL0xpbmVFdmVudDB4MjMudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL3JhaWRib3NzL2VtdWxhdG9yL2RhdGEvbmV0d29ya19sb2dfY29udmVydGVyL0xpbmVFdmVudDB4MjQudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL3JhaWRib3NzL2VtdWxhdG9yL2RhdGEvbmV0d29ya19sb2dfY29udmVydGVyL0xpbmVFdmVudDB4MjUudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL3JhaWRib3NzL2VtdWxhdG9yL2RhdGEvbmV0d29ya19sb2dfY29udmVydGVyL0xpbmVFdmVudDB4MjYudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL3JhaWRib3NzL2VtdWxhdG9yL2RhdGEvbmV0d29ya19sb2dfY29udmVydGVyL0xpbmVFdmVudDB4MjcudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL3JhaWRib3NzL2VtdWxhdG9yL2RhdGEvbmV0d29ya19sb2dfY29udmVydGVyL1BhcnNlTGluZS50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvcmFpZGJvc3MvZW11bGF0b3IvZGF0YS9OZXR3b3JrTG9nQ29udmVydGVyLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi9yZXNvdXJjZXMvbGFuZ3VhZ2VzLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9yYWlkYm9zcy9lbXVsYXRvci9kYXRhL0VuY291bnRlci50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvcmFpZGJvc3MvZW11bGF0b3IvZGF0YS9Mb2dFdmVudEhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL3JhaWRib3NzL2VtdWxhdG9yL2RhdGEvTmV0d29ya0xvZ0NvbnZlcnRlcldvcmtlci5qcyJdLCJuYW1lcyI6WyJvbm1lc3NhZ2UiLCJtc2ciLCJsb2dDb252ZXJ0ZXIiLCJOZXR3b3JrTG9nQ29udmVydGVyIiwibG9jYWxMb2dIYW5kbGVyIiwiTG9nRXZlbnRIYW5kbGVyIiwicmVwbyIsIkxvZ1JlcG9zaXRvcnkiLCJvbiIsImRheSIsInpvbmVJZCIsInpvbmVOYW1lIiwibGluZXMiLCJlbmMiLCJFbmNvdW50ZXIiLCJpbml0aWFsaXplIiwic2hvdWxkUGVyc2lzdEZpZ2h0IiwicG9zdE1lc3NhZ2UiLCJ0eXBlIiwiZW5jb3VudGVyIiwibmFtZSIsImNvbWJhdGFudFRyYWNrZXIiLCJnZXRNYWluQ29tYmF0YW50TmFtZSIsImRlY29kZXIiLCJUZXh0RGVjb2RlciIsImJ1ZiIsIlVpbnQ4QXJyYXkiLCJkYXRhIiwibmV4dE9mZnNldCIsImxpbmVDb3VudCIsImN1cnJlbnRPZmZzZXQiLCJsZW5ndGgiLCJpbmRleE9mIiwibGluZSIsImRlY29kZSIsInNsaWNlIiwidHJpbSIsInB1c2giLCJjb252ZXJ0TGluZXMiLCJwYXJzZUxvZ3MiLCJieXRlcyIsInRvdGFsQnl0ZXMiLCJlbmRGaWdodCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFjQSxNQUFNLGlCQUFpQixHQUFHLENBQUMsV0FBVyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQVUsQ0FBQztBQUNqRyxNQUFNLGFBQWEsR0FBRyxDQUFDLFdBQVcsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQVUsQ0FBQztBQUNySCxNQUFNLGlCQUFpQixHQUFHO0lBQ3hCLFdBQVc7SUFDWCxVQUFVO0lBQ1YsUUFBUTtJQUNSLElBQUk7SUFDSixTQUFTO0lBQ1QsVUFBVTtJQUNWLFFBQVE7SUFDUixPQUFPO0lBQ1AsT0FBTztJQUNQLE9BQU87SUFDUCxPQUFPO0lBQ1AsT0FBTztJQUNQLE9BQU87SUFDUCxPQUFPO0lBQ1AsT0FBTztJQUNQLE9BQU87SUFDUCxPQUFPO0lBQ1AsT0FBTztJQUNQLFFBQVE7SUFDUixRQUFRO0lBQ1IsUUFBUTtJQUNSLFFBQVE7SUFDUixRQUFRO0lBQ1IsVUFBVTtJQUNWLGFBQWE7SUFDYixVQUFVO0lBQ1YsYUFBYTtJQUNiLFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULGVBQWU7SUFDZixJQUFJO0lBQ0osT0FBTztJQUNQLElBQUk7SUFDSixPQUFPO0lBQ1AsR0FBRztJ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QyxLQUFLLEVBQUUsUUFBUSxDQUFDLEdBQUcsR0FBRztZQUMvRCxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsR0FBRyxHQUFHO1lBQy9ELE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHLEdBQUc7WUFDL0QsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEdBQUcsR0FBRztZQUMvRCxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsR0FBRyxHQUFHO1lBQy9ELE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEdBQUc7WUFDakUsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLEdBQUcsR0FBRztZQUNqRSxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsR0FBRyxHQUFHO1lBQ2pFLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEdBQUc7WUFDakUsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLEdBQUcsR0FBRztZQUNqRSxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FB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LEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO1FBQ2xGLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSztRQUNsRixLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUs7UUFDbEYsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRTtRQUNuRixFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSztRQUNyRixLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSTtRQUNyRixJQUFJO0tBQ0w7SUFDRCxHQUFHLEVBQUU7UUFDSCxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJO1FBQ3JGLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFO1FBQ3BGLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSTtLQUN2RTtJQUNELEdBQUcsRUFBRTtRQUNILEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUk7UUFDdEYsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJO1FBQ3hGLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJO1FBQ3ZGLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUk7S0FDM0Q7SUFDRCxHQUFHLEVBQUU7UUFDSCxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUs7UUFDbEYsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO1FBQ2xGLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSztRQUNsRixLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUs7UUFDbEYsS0FBSztLQUNOO0lBQ0QsR0FBRyxFQUFFO1FBQ0gsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUs7UUFDdEYsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSztRQUN4RixLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO1FBQ25GLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUc7S0FDOUU7SUFDRCxHQUFHLEVBQUU7UUFDSCxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO1FBQ3pGLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUs7UUFDckYsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLO1FBQ3ZGLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSTtRQUN6RixJQUFJLEVBQUUsSUFBSTtLQUNYO0lBQ0QsR0FBRyxFQUFFO1FBQ0gsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSztRQUN6RixLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSTtRQUN6RixJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUk7UUFDeEYsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUs7UUFDeEYsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUk7UUFDdEYsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsR0FBRyxFQUFFO1FBQ0gsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSztRQUN6RixLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO1FBQ3pGLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRTtRQUMxRixFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSTtLQUMvRTtJQUNELEdBQUcsRUFBRTtRQUNILEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLO1FBQ3pGLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJO1FBQ3BGLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUU7S0FDbkY7SUFDRCxHQUFHLEVBQUU7UUFDSCxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO1FBQ3pGLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUk7UUFDcEYsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUs7UUFDbkYsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUk7UUFDdkYsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSTtLQUN2QjtJQUNELEdBQUcsRUFBRTtRQUNILEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUs7UUFDekYsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUk7UUFDckYsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJO1FBQ3hGLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUk7S0FDN0U7SUFDRCxHQUFHLEVBQUU7UUFDSCxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSztRQUN4RixLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSztRQUMxRixLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSTtRQUNyRixJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRztLQUM1QjtJQUNELEdBQUcsRUFBRTtRQUNILEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUs7UUFDekYsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUk7UUFDdkYsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSztRQUNyRixJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSTtLQUNuRjtJQUNELEdBQUcsRUFBRTtRQUNILEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSztRQUNsRixLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUs7UUFDbEYsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO1FBQ2xGLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSztRQUNsRixLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUs7UUFDbEYsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUs7S0FDbEM7SUFDRCxHQUFHLEVBQUU7UUFDSCxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSztRQUN0RixLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO1FBQ25GLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJO1FBQ3RGLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7S0FDdkQ7SUFDRCxHQUFHLEVBQUU7UUFDSCxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUs7UUFDbEYsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO1FBQ2xGLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJO1FBQ3RGLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUk7UUFDdEYsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztRQUNwRixJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJO0tBQzNEO0lBQ0QsR0FBRyxFQUFFO1FBQ0gsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLO1FBQ2xGLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUk7UUFDbkYsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUk7UUFDbEYsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUks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QUNQLEdBQUcsRUFBRSxFQUFFO0lBQ1AsR0FBRyxFQUFFLEVBQUU7SUFDUCxHQUFHLEVBQUUsRUFBRTtJQUNQLEdBQUcsRUFBRSxFQUFFO0lBQ1AsR0FBRyxFQUFFLEVBQUU7SUFDUCxHQUFHLEVBQUUsRUFBRTtJQUNQLEdBQUcsRUFBRSxFQUFFO0lBQ1AsR0FBRyxFQUFFLEVBQUU7SUFDUCxHQUFHLEVBQUUsRUFBRTtJQUNQLEdBQUcsRUFBRSxFQUFFO0lBQ1AsR0FBRyxFQUFFLEVBQUU7SUFDUCxHQUFHLEVBQUUsRUFBRTtJQUNQLEdBQUcsRUFBRSxFQUFFO0lBQ1AsR0FBRyxFQUFFLEVBQUU7SUFDUCxHQUFHLEVBQUUsRUFBRTtJQUNQLEdBQUcsRUFBRSxFQUFFO0lBQ1AsR0FBRyxFQUFFLEVBQUU7SUFDUCxHQUFHLEVBQUUsRUFBRTtJQUNQLEdBQUcsRUFBRSxFQUFFO0lBQ1AsR0FBRyxFQUFFLEVBQUU7SUFDUCxHQUFHLEVBQUUsRUFBRTtJQUNQLEdBQUcsRUFBRSxFQUFFO0lBQ1AsR0FBRyxFQUFFLEVBQUU7SUFDUCxHQUFHLEVBQUUsRUFBRTtDQUNSLENBQUM7QUFFRixNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBVSxDQUFDO0FBQ3BELE1BQU0sUUFBUSxHQUFHLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLENBQVcsQ0FBQztBQUVwRixNQUFNLFFBQVEsR0FBVSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDbkUsTUFBTSxVQUFVLEdBQVUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztBQUN2RCxNQUFNLFlBQVksR0FBVSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FB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VUFBVSxPQUFDLEtBQUssQ0FBQyxvQkFBTSxDQUFDLFNBQVMsQ0FBQyxtQ0FBSSxFQUFFLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsV0FBVyxTQUFHLEtBQUssQ0FBQyxvQkFBTSxDQUFDLFdBQVcsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7UUFDbkQsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxFQUFFLEdBQUcsVUFBVSxPQUFDLEtBQUssQ0FBQyxvQkFBTSxDQUFDLFNBQVMsQ0FBQyxtQ0FBSSxFQUFFLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsT0FBQyxLQUFLLENBQUMsb0JBQU0sQ0FBQyxLQUFLLENBQUMsbUNBQUksRUFBRSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLE9BQU8sU0FBRyxLQUFLLENBQUMsb0JBQU0sQ0FBQyxPQUFPLENBQUMsbUNBQUksRUFBRSxDQUFDO1FBQzNDLElBQUksQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsT0FBTyxTQUFHLEtBQUssQ0FBQyxvQkFBTSxDQUFDLE9BQU8sQ0FBQyxtQ0FBSSxFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxPQUFPLFNBQUcsS0FBSyxDQUFDLG9CQUFNLENBQUMsT0FBTyxDQUFDLG1DQUFJLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLE9BQUMsS0FBSyxDQUFDLG9CQUFNLENBQUMsT0FBTyxDQUFDLG1DQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRXZELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVB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O0FBQ0FLLGlCQUFXLENBQUM7QUFDVkMsWUFBSSxFQUFFLFVBREk7QUFFVk4sYUFBSyxFQUFFaUIsU0FGRztBQUdWVyxhQUFLLEVBQUVaLFVBSEc7QUFJVmEsa0JBQVUsRUFBRWhCLEdBQUcsQ0FBQ007QUFKTixPQUFELENBQVg7QUFNQW5CLFdBQUssR0FBRyxFQUFSO0FBQ0Q7QUFDRjs7QUFDRCxNQUFJQSxLQUFLLENBQUNtQixNQUFOLEdBQWUsQ0FBbkIsRUFBc0I7QUFDcEJuQixTQUFLLEdBQUdWLFlBQVksQ0FBQ29DLFlBQWIsQ0FBMEIxQixLQUExQixFQUFpQ04sSUFBakMsQ0FBUjtBQUNBRixtQkFBZSxDQUFDbUMsU0FBaEIsQ0FBMEIzQixLQUExQjtBQUNBQSxTQUFLLEdBQUcsRUFBUjtBQUNEOztBQUNESyxhQUFXLENBQUM7QUFDVkMsUUFBSSxFQUFFLFVBREk7QUFFVk4sU0FBSyxFQUFFaUIsU0FGRztBQUdWVyxTQUFLLEVBQUVmLEdBQUcsQ0FBQ00sTUFIRDtBQUlWVSxjQUFVLEVBQUVoQixHQUFHLENBQUNNO0FBSk4sR0FBRCxDQUFYO0FBTUFOLEtBQUcsR0FBRyxJQUFOO0FBRUFyQixpQkFBZSxDQUFDc0MsUUFBaEI7QUFFQXpCLGFBQVcsQ0FBQztBQUNWQyxRQUFJLEVBQUU7QUFESSxHQUFELENBQVg7QUFHRCxDQWhFRCxDIiwiZmlsZSI6Ik5ldHdvcmtMb2dDb252ZXJ0ZXJXb3JrZXIuYnVuZGxlLndvcmtlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgQmFzZVJlZ0V4cDxUIGV4dGVuZHMgc3RyaW5nPiBleHRlbmRzIFJlZ0V4cCB7XHJcbiAgZ3JvdXBzPzoge1xyXG4gICAgW3MgaW4gVF0/OiBzdHJpbmc7XHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgUGFyYW1zPFQgZXh0ZW5kcyBzdHJpbmc+ID1cclxuICBQYXJ0aWFsPFJlY29yZDxFeGNsdWRlPFQsICd0aW1lc3RhbXAnIHwgJ2NhcHR1cmUnPiwgc3RyaW5nIHwgc3RyaW5nW10+ICZcclxuICB7ICd0aW1lc3RhbXAnOiBzdHJpbmc7ICdjYXB0dXJlJzogYm9vbGVhbiB9PjtcclxuXHJcbmV4cG9ydCB0eXBlIFJlZ2V4PFQgZXh0ZW5kcyBzdHJpbmc+ID0gQmFzZVJlZ0V4cDxFeGNsdWRlPFQsICdjYXB0dXJlJz4+O1xyXG5cclxudHlwZSBWYWxpZFN0cmluZ09yQXJyYXkgPSBzdHJpbmcgfCBzdHJpbmdbXTtcclxuXHJcbmNvbnN0IHN0YXJ0c1VzaW5nUGFyYW1zID0gWyd0aW1lc3RhbXAnLCAnc291cmNlJywgJ2lkJywgJ2FiaWxpdHknLCAndGFyZ2V0JywgJ2NhcHR1cmUnXSBhcyBjb25zdDtcclxuY29uc3QgYWJpbGl0eVBhcmFtcyA9IFsndGltZXN0YW1wJywgJ3NvdXJjZScsICdzb3VyY2VJZCcsICdpZCcsICdhYmlsaXR5JywgJ3RhcmdldElkJywgJ3RhcmdldCcsICdjYXB0dXJlJ10gYXMgY29uc3Q7XHJcbmNvbnN0IGFiaWxpdHlGdWxsUGFyYW1zID0gW1xyXG4gICd0aW1lc3RhbXAnLFxyXG4gICdzb3VyY2VJZCcsXHJcbiAgJ3NvdXJjZScsXHJcbiAgJ2lkJyxcclxuICAnYWJpbGl0eScsXHJcbiAgJ3RhcmdldElkJyxcclxuICAndGFyZ2V0JyxcclxuICAnZmxhZ3MnLFxyXG4gICdmbGFnMCcsXHJcbiAgJ2ZsYWcxJyxcclxuICAnZmxhZzInLFxyXG4gICdmbGFnMycsXHJcbiAgJ2ZsYWc0JyxcclxuICAnZmxhZzUnLFxyXG4gICdmbGFnNicsXHJcbiAgJ2ZsYWc3JyxcclxuICAnZmxhZzgnLFxyXG4gICdmbGFnOScsXHJcbiAgJ2ZsYWcxMCcsXHJcbiAgJ2ZsYWcxMScsXHJcbiAgJ2ZsYWcxMicsXHJcbiAgJ2ZsYWcxMycsXHJcbiAgJ2ZsYWcxNCcsXHJcbiAgJ3RhcmdldEhwJyxcclxuICAndGFyZ2V0TWF4SHAnLFxyXG4gICd0YXJnZXRNcCcsXHJcbiAgJ3RhcmdldE1heE1wJyxcclxuICAndGFyZ2V0WCcsXHJcbiAgJ3RhcmdldFknLFxyXG4gICd0YXJnZXRaJyxcclxuICAndGFyZ2V0SGVhZGluZycsXHJcbiAgJ2hwJyxcclxuICAnbWF4SHAnLFxyXG4gICdtcCcsXHJcbiAgJ21heE1wJyxcclxuICAneCcsXHJcbiAgJ3knLFxyXG4gICd6JyxcclxuICAnaGVhZGluZycsXHJcbiAgJ2NhcHR1cmUnLFxyXG5dIGFzIGNvbnN0O1xyXG5jb25zdCBoZWFkTWFya2VyUGFyYW1zID0gWyd0aW1lc3RhbXAnLCAndGFyZ2V0SWQnLCAndGFyZ2V0JywgJ2lkJywgJ2NhcHR1cmUnXSBhcyBjb25zdDtcclxuY29uc3QgYWRkZWRDb21iYXRhbnRQYXJhbXMgPSBbJ3RpbWVzdGFtcCcsICduYW1lJywgJ2NhcHR1cmUnXSBhcyBjb25zdDtcclxuY29uc3QgYWRkZWRDb21iYXRhbnRGdWxsUGFyYW1zID0gW1xyXG4gICd0aW1lc3RhbXAnLFxyXG4gICdpZCcsXHJcbiAgJ25hbWUnLFxyXG4gICdqb2InLFxyXG4gICdsZXZlbCcsXHJcbiAgJ2hwJyxcclxuICAneCcsXHJcbiAgJ3knLFxyXG4gICd6JyxcclxuICAnbnBjSWQnLFxyXG4gICdjYXB0dXJlJyxcclxuXSBhcyBjb25zdDtcclxuY29uc3QgcmVtb3ZpbmdDb21iYXRhbnRQYXJhbXMgPSBbXHJcbiAgJ3RpbWVzdGFtcCcsXHJcbiAgJ2lkJyxcclxuICAnbmFtZScsXHJcbiAgJ2hwJyxcclxuICAneCcsXHJcbiAgJ3knLFxyXG4gICd6JyxcclxuICAnY2FwdHVyZScsXHJcbl0gYXMgY29uc3Q7XHJcbmNvbnN0IGdhaW5zRWZmZWN0UGFyYW1zID0gWyd0aW1lc3RhbXAnLCAndGFyZ2V0SWQnLCAndGFyZ2V0JywgJ2VmZmVjdCcsICdzb3VyY2UnLCAnZHVyYXRpb24nLCAnY2FwdHVyZSddIGFzIGNvbnN0O1xyXG5jb25zdCBzdGF0dXNFZmZlY3RFeHBsaWNpdFBhcmFtcyA9IFtcclxuICAndGltZXN0YW1wJyxcclxuICAndGFyZ2V0SWQnLFxyXG4gICd0YXJnZXQnLFxyXG4gICdqb2InLFxyXG4gICdocCcsXHJcbiAgJ21heEhwJyxcclxuICAnbXAnLFxyXG4gICdtYXhNcCcsXHJcbiAgJ3gnLFxyXG4gICd5JyxcclxuICAneicsXHJcbiAgJ2hlYWRpbmcnLFxyXG4gICdkYXRhMCcsXHJcbiAgJ2RhdGExJyxcclxuICAnZGF0YTInLFxyXG4gICdkYXRhMycsXHJcbiAgJ2RhdGE0JyxcclxuICAnY2FwdHVyZScsXHJcbl0gYXMgY29uc3Q7XHJcbmNvbnN0IGxvc2VzRWZmZWN0UGFyYW1zID0gWyd0aW1lc3RhbXAnLCAndGFyZ2V0SWQnLCAndGFyZ2V0JywgJ2VmZmVjdCcsICdzb3VyY2UnLCAnY2FwdHVyZSddIGFzIGNvbnN0O1xyXG5jb25zdCBzdGF0Q2hhbmdlUGFyYW1zID0gW1xyXG4gICd0aW1lc3RhbXAnLFxyXG4gICdqb2InLFxyXG4gICdzdHJlbmd0aCcsXHJcbiAgJ2RleHRlcml0eScsXHJcbiAgJ3ZpdGFsaXR5JyxcclxuICAnaW50ZWxsaWdlbmNlJyxcclxuICAnbWluZCcsXHJcbiAgJ3BpZXR5JyxcclxuICAnYXR0YWNrUG93ZXInLFxyXG4gICdkaXJlY3RIaXQnLFxyXG4gICdjcml0aWNhbEhpdCcsXHJcbiAgJ2F0dGFja01hZ2ljUG90ZW5jeScsXHJcbiAgJ2hlYWxNYWdpY1BvdGVuY3knLFxyXG4gICdkZXRlcm1pbmF0aW9uJyxcclxuICAnc2tpbGxTcGVlZCcsXHJcbiAgJ3NwZWxsU3BlZWQnLFxyXG4gICd0ZW5hY2l0eScsXHJcbiAgJ2NhcHR1cmUnLFxyXG5dIGFzIGNvbnN0O1xyXG5jb25zdCB0ZXRoZXJQYXJhbXMgPSBbJ3RpbWVzdGFtcCcsICdzb3VyY2UnLCAnc291cmNlSWQnLCAndGFyZ2V0JywgJ3RhcmdldElkJywgJ2lkJywgJ2NhcHR1cmUnXSBhcyBjb25zdDtcclxuY29uc3Qgd2FzRGVmZWF0ZWRQYXJhbXMgPSBbJ3RpbWVzdGFtcCcsICd0YXJnZXQnLCAnc291cmNlJywgJ2NhcHR1cmUnXSBhcyBjb25zdDtcclxuY29uc3QgaGFzSFBQYXJhbXMgPSBbJ3RpbWVzdGFtcCcsICduYW1lJywgJ2hwJywgJ2NhcHR1cmUnXSBhcyBjb25zdDtcclxuY29uc3QgZWNob1BhcmFtcyA9IFsndGltZXN0YW1wJywgJ2NvZGUnLCAnbGluZScsICdjYXB0dXJlJ10gYXMgY29uc3Q7XHJcbmNvbnN0IGRpYWxvZ1BhcmFtcyA9IFsndGltZXN0YW1wJywgJ2NvZGUnLCAnbGluZScsICduYW1lJywgJ2NhcHR1cmUnXSBhcyBjb25zdDtcclxuY29uc3QgbWVzc2FnZVBhcmFtcyA9IFsndGltZXN0YW1wJywgJ2NvZGUnLCAnbGluZScsICdjYXB0dXJlJ10gYXMgY29uc3Q7XHJcbmNvbnN0IGdhbWVMb2dQYXJhbXMgPSBbJ3RpbWVzdGFtcCcsICdjb2RlJywgJ2xpbmUnLCAnY2FwdHVyZSddIGFzIGNvbnN0O1xyXG5jb25zdCBnYW1lTmFtZUxvZ1BhcmFtcyA9IFsndGltZXN0YW1wJywgJ2NvZGUnLCAnbmFtZScsICdsaW5lJywgJ2NhcHR1cmUnXSBhcyBjb25zdDtcclxuY29uc3QgY2hhbmdlWm9uZVBhcmFtcyA9IFsndGltZXN0YW1wJywgJ25hbWUnLCAnY2FwdHVyZSddIGFzIGNvbnN0O1xyXG5jb25zdCBuZXR3b3JrNmRQYXJhbXMgPSBbJ3RpbWVzdGFtcCcsICdpbnN0YW5jZScsICdjb21tYW5kJywgJ2RhdGEwJywgJ2RhdGExJywgJ2RhdGEyJywgJ2RhdGEzJywgJ2NhcHR1cmUnXSBhcyBjb25zdDtcclxuXHJcbnR5cGUgU3RhcnRzVXNpbmdQYXJhbXMgPSB0eXBlb2Ygc3RhcnRzVXNpbmdQYXJhbXNbbnVtYmVyXTtcclxudHlwZSBBYmlsaXR5UGFyYW1zID0gdHlwZW9mIGFiaWxpdHlQYXJhbXNbbnVtYmVyXTtcclxudHlwZSBBYmlsaXR5RnVsbFBhcmFtcyA9IHR5cGVvZiBhYmlsaXR5RnVsbFBhcmFtc1tudW1iZXJdO1xyXG50eXBlIEhlYWRNYXJrZXJQYXJhbXMgPSB0eXBlb2YgaGVhZE1hcmtlclBhcmFtc1tudW1iZXJdO1xyXG50eXBlIEFkZGVkQ29tYmF0YW50UGFyYW1zID0gdHlwZW9mIGFkZGVkQ29tYmF0YW50UGFyYW1zW251bWJlcl07XHJcbnR5cGUgQWRkZWRDb21iYXRhbnRGdWxsUGFyYW1zID0gdHlwZW9mIGFkZGVkQ29tYmF0YW50RnVsbFBhcmFtc1tudW1iZXJdO1xyXG50eXBlIFJlbW92aW5nQ29tYmF0YW50UGFyYW1zID0gdHlwZW9mIHJlbW92aW5nQ29tYmF0YW50UGFyYW1zW251bWJlcl07XHJcbnR5cGUgR2FpbnNFZmZlY3RQYXJhbXMgPSB0eXBlb2YgZ2FpbnNFZmZlY3RQYXJhbXNbbnVtYmVyXTtcclxudHlwZSBTdGF0dXNFZmZlY3RFeHBsaWNpdFBhcmFtcyA9IHR5cGVvZiBzdGF0dXNFZmZlY3RFeHBsaWNpdFBhcmFtc1tudW1iZXJdO1xyXG50eXBlIExvc2VzRWZmZWN0UGFyYW1zID0gdHlwZW9mIGxvc2VzRWZmZWN0UGFyYW1zW251bWJlcl07XHJcbnR5cGUgU3RhdENoYW5nZVBhcmFtcyA9IHR5cGVvZiBzdGF0Q2hhbmdlUGFyYW1zW251bWJlcl07XHJcbnR5cGUgVGV0aGVyUGFyYW1zID0gdHlwZW9mIHRldGhlclBhcmFtc1tudW1iZXJdO1xyXG50eXBlIFdhc0RlZmVhdGVkUGFyYW1zID0gdHlwZW9mIHdhc0RlZmVhdGVkUGFyYW1zW251bWJlcl07XHJcbnR5cGUgSGFzSFBQYXJhbXMgPSB0eXBlb2YgaGFzSFBQYXJhbXNbbnVtYmVyXTtcclxudHlwZSBFY2hvUGFyYW1zID0gdHlwZW9mIGVjaG9QYXJhbXNbbnVtYmVyXTtcclxudHlwZSBEaWFsb2dQYXJhbXMgPSB0eXBlb2YgZGlhbG9nUGFyYW1zW251bWJlcl07XHJcbnR5cGUgTWVzc2FnZVBhcmFtcyA9IHR5cGVvZiBtZXNzYWdlUGFyYW1zW251bWJlcl07XHJcbnR5cGUgR2FtZUxvZ1BhcmFtcyA9IHR5cGVvZiBnYW1lTG9nUGFyYW1zW251bWJlcl07XHJcbnR5cGUgR2FtZU5hbWVMb2dQYXJhbXMgPSB0eXBlb2YgZ2FtZU5hbWVMb2dQYXJhbXNbbnVtYmVyXTtcclxudHlwZSBDaGFuZ2Vab25lUGFyYW1zID0gdHlwZW9mIGNoYW5nZVpvbmVQYXJhbXNbbnVtYmVyXTtcclxudHlwZSBOZXR3b3JrNmRQYXJhbXMgPSB0eXBlb2YgbmV0d29yazZkUGFyYW1zW251bWJlcl07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWdleGVzIHtcclxuICAvKipcclxuICAgKiBmaWVsZHM6IHNvdXJjZSwgaWQsIGFiaWxpdHksIHRhcmdldCwgY2FwdHVyZVxyXG4gICAqIG1hdGNoZXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9xdWlzcXVvdXMvY2FjdGJvdC9ibG9iL21haW4vZG9jcy9Mb2dHdWlkZS5tZCMxNC1uZXR3b3Jrc3RhcnRzY2FzdGluZ1xyXG4gICAqL1xyXG4gIHN0YXRpYyBzdGFydHNVc2luZyhmPzogUGFyYW1zPFN0YXJ0c1VzaW5nUGFyYW1zPik6IFJlZ2V4PFN0YXJ0c1VzaW5nUGFyYW1zPiB7XHJcbiAgICBpZiAodHlwZW9mIGYgPT09ICd1bmRlZmluZWQnKVxyXG4gICAgICBmID0ge307XHJcbiAgICBSZWdleGVzLnZhbGlkYXRlUGFyYW1zKGYsICdzdGFydHNVc2luZycsIHN0YXJ0c1VzaW5nUGFyYW1zKTtcclxuICAgIGNvbnN0IGNhcHR1cmUgPSBSZWdleGVzLnRydWVJZlVuZGVmaW5lZChmLmNhcHR1cmUpO1xyXG4gICAgbGV0IHN0ciA9IFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICd0aW1lc3RhbXAnLCAnXFxcXHl7VGltZXN0YW1wfScpICtcclxuICAgICAgJyAxNDonICtcclxuICAgICAgUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ2lkJywgZi5pZCwgJ1xcXFx5e0FiaWxpdHlDb2RlfScpICsgJzonO1xyXG5cclxuICAgIGlmIChmLnNvdXJjZSB8fCBmLmlkIHx8IGYudGFyZ2V0IHx8IGNhcHR1cmUpXHJcbiAgICAgIHN0ciArPSBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnc291cmNlJywgZi5zb3VyY2UsICcuKj8nKSArICcgc3RhcnRzIHVzaW5nICc7XHJcblxyXG4gICAgaWYgKGYuYWJpbGl0eSB8fCBmLnRhcmdldCB8fCBjYXB0dXJlKVxyXG4gICAgICBzdHIgKz0gUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ2FiaWxpdHknLCBmLmFiaWxpdHksICcuKj8nKSArICcgb24gJztcclxuXHJcbiAgICBpZiAoZi50YXJnZXQgfHwgY2FwdHVyZSlcclxuICAgICAgc3RyICs9IFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICd0YXJnZXQnLCBmLnRhcmdldCwgJy4qPycpICsgJ1xcXFwuJztcclxuXHJcbiAgICByZXR1cm4gUmVnZXhlcy5wYXJzZShzdHIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZmllbGRzOiBzb3VyY2VJZCwgc291cmNlLCBpZCwgYWJpbGl0eSwgdGFyZ2V0SWQsIHRhcmdldCwgY2FwdHVyZVxyXG4gICAqIG1hdGNoZXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9xdWlzcXVvdXMvY2FjdGJvdC9ibG9iL21haW4vZG9jcy9Mb2dHdWlkZS5tZCMxNS1uZXR3b3JrYWJpbGl0eVxyXG4gICAqIG1hdGNoZXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9xdWlzcXVvdXMvY2FjdGJvdC9ibG9iL21haW4vZG9jcy9Mb2dHdWlkZS5tZCMxNi1uZXR3b3JrYW9lYWJpbGl0eVxyXG4gICAqL1xyXG4gIHN0YXRpYyBhYmlsaXR5KGY/OiBQYXJhbXM8QWJpbGl0eVBhcmFtcz4pOiBSZWdleDxBYmlsaXR5UGFyYW1zPiB7XHJcbiAgICBpZiAodHlwZW9mIGYgPT09ICd1bmRlZmluZWQnKVxyXG4gICAgICBmID0ge307XHJcbiAgICBSZWdleGVzLnZhbGlkYXRlUGFyYW1zKGYsICdhYmlsaXR5JywgYWJpbGl0eVBhcmFtcyk7XHJcbiAgICBjb25zdCBjYXB0dXJlID0gUmVnZXhlcy50cnVlSWZVbmRlZmluZWQoZi5jYXB0dXJlKTtcclxuICAgIGxldCBzdHIgPSBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAndGltZXN0YW1wJywgJ1xcXFx5e1RpbWVzdGFtcH0nKSArXHJcbiAgICAgICcgMVs1Nl06JyArIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICdzb3VyY2VJZCcsICdcXFxceXtPYmplY3RJZH0nKSArICc6JyArXHJcbiAgICAgIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICdzb3VyY2UnLCBmLnNvdXJjZSwgJ1teOl0qPycpICsgJzonO1xyXG5cclxuICAgIGlmIChmLmlkIHx8IGYuYWJpbGl0eSB8fCBmLnRhcmdldCB8fCBmLnRhcmdldElkIHx8IGNhcHR1cmUpXHJcbiAgICAgIHN0ciArPSBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnaWQnLCBmLmlkLCAnXFxcXHl7QWJpbGl0eUNvZGV9JykgKyAnOic7XHJcblxyXG4gICAgaWYgKGYuYWJpbGl0eSB8fCBmLnRhcmdldCB8fCBmLnRhcmdldElkIHx8IGNhcHR1cmUpXHJcbiAgICAgIHN0ciArPSBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnYWJpbGl0eScsIGYuYWJpbGl0eSwgJ1teOl0qPycpICsgJzonO1xyXG5cclxuICAgIGlmIChmLnRhcmdldCB8fCBmLnRhcmdldElkIHx8IGNhcHR1cmUpXHJcbiAgICAgIHN0ciArPSBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAndGFyZ2V0SWQnLCAnXFxcXHl7T2JqZWN0SWR9JykgKyAnOic7XHJcblxyXG4gICAgaWYgKGYudGFyZ2V0IHx8IGNhcHR1cmUpXHJcbiAgICAgIHN0ciArPSBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAndGFyZ2V0JywgZi50YXJnZXQsICdbXjpdKj8nKSArICc6JztcclxuXHJcbiAgICByZXR1cm4gUmVnZXhlcy5wYXJzZShzdHIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZmllbGRzOiBzb3VyY2VJZCwgc291cmNlLCBpZCwgYWJpbGl0eSwgdGFyZ2V0SWQsIHRhcmdldCwgZmxhZ3MsIHgsIHksIHosIGhlYWRpbmcsIGNhcHR1cmVcclxuICAgKiBtYXRjaGVzOiBodHRwczovL2dpdGh1Yi5jb20vcXVpc3F1b3VzL2NhY3Rib3QvYmxvYi9tYWluL2RvY3MvTG9nR3VpZGUubWQjMTUtbmV0d29ya2FiaWxpdHlcclxuICAgKiBtYXRjaGVzOiBodHRwczovL2dpdGh1Yi5jb20vcXVpc3F1b3VzL2NhY3Rib3QvYmxvYi9tYWluL2RvY3MvTG9nR3VpZGUubWQjMTYtbmV0d29ya2FvZWFiaWxpdHlcclxuICAgKi9cclxuICBzdGF0aWMgYWJpbGl0eUZ1bGwoZj86IFBhcmFtczxBYmlsaXR5RnVsbFBhcmFtcz4pOiBSZWdleDxBYmlsaXR5RnVsbFBhcmFtcz4ge1xyXG4gICAgaWYgKHR5cGVvZiBmID09PSAndW5kZWZpbmVkJylcclxuICAgICAgZiA9IHt9O1xyXG4gICAgUmVnZXhlcy52YWxpZGF0ZVBhcmFtcyhmLCAnYWJpbGl0eUZ1bGwnLCBhYmlsaXR5RnVsbFBhcmFtcyk7XHJcbiAgICBjb25zdCBjYXB0dXJlID0gUmVnZXhlcy50cnVlSWZVbmRlZmluZWQoZi5jYXB0dXJlKTtcclxuICAgIGNvbnN0IHN0ciA9IFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICd0aW1lc3RhbXAnLCAnXFxcXHl7VGltZXN0YW1wfScpICtcclxuICAgICAgJyAxWzU2XTonICtcclxuICAgICAgUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ3NvdXJjZUlkJywgZi5zb3VyY2VJZCwgJ1xcXFx5e09iamVjdElkfScpICsgJzonICtcclxuICAgICAgUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ3NvdXJjZScsIGYuc291cmNlLCAnW146XSo/JykgKyAnOicgK1xyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnaWQnLCBmLmlkLCAnXFxcXHl7QWJpbGl0eUNvZGV9JykgKyAnOicgK1xyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnYWJpbGl0eScsIGYuYWJpbGl0eSwgJ1teOl0qPycpICsgJzonICtcclxuICAgICAgUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ3RhcmdldElkJywgZi50YXJnZXRJZCwgJ1xcXFx5e09iamVjdElkfScpICsgJzonICtcclxuICAgICAgUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ3RhcmdldCcsIGYudGFyZ2V0LCAnW146XSo/JykgKyAnOicgK1xyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnZmxhZ3MnLCBmLmZsYWdzLCAnW146XSo/JykgKyAnOicgK1xyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnZmxhZzAnLCBmLmZsYWcwLCAnW146XSo/JykgKyAnOicgK1xyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnZmxhZzEnLCBmLmZsYWcxLCAnW146XSo/JykgKyAnOicgK1xyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnZmxhZzInLCBmLmZsYWcyLCAnW146XSo/JykgKyAnOicgK1xyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnZmxhZzMnLCBmLmZsYWczLCAnW146XSo/JykgKyAnOicgK1xyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnZmxhZzQnLCBmLmZsYWc0LCAnW146XSo/JykgKyAnOicgK1xyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnZmxhZzUnLCBmLmZsYWc1LCAnW146XSo/JykgKyAnOicgK1xyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnZmxhZzYnLCBmLmZsYWc2LCAnW146XSo/JykgKyAnOicgK1xyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnZmxhZzcnLCBmLmZsYWc3LCAnW146XSo/JykgKyAnOicgK1xyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnZmxhZzgnLCBmLmZsYWc4LCAnW146XSo/JykgKyAnOicgK1xyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnZmxhZzknLCBmLmZsYWc5LCAnW146XSo/JykgKyAnOicgK1xyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnZmxhZzEwJywgZi5mbGFnMTAsICdbXjpdKj8nKSArICc6JyArXHJcbiAgICAgIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICdmbGFnMTEnLCBmLmZsYWcxMSwgJ1teOl0qPycpICsgJzonICtcclxuICAgICAgUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ2ZsYWcxMicsIGYuZmxhZzEyLCAnW146XSo/JykgKyAnOicgK1xyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnZmxhZzEzJywgZi5mbGFnMTMsICdbXjpdKj8nKSArICc6JyArXHJcbiAgICAgIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICdmbGFnMTQnLCBmLmZsYWcxMywgJ1teOl0qPycpICsgJzonICtcclxuICAgICAgUmVnZXhlcy5vcHRpb25hbChSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAndGFyZ2V0SHAnLCBmLnRhcmdldEhwLCAnXFxcXHl7RmxvYXR9JykpICsgJzonICtcclxuICAgICAgUmVnZXhlcy5vcHRpb25hbChSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAndGFyZ2V0TWF4SHAnLCBmLnRhcmdldE1heEhwLCAnXFxcXHl7RmxvYXR9JykpICsgJzonICtcclxuICAgICAgUmVnZXhlcy5vcHRpb25hbChSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAndGFyZ2V0TXAnLCBmLnRhcmdldE1wLCAnXFxcXHl7RmxvYXR9JykpICsgJzonICtcclxuICAgICAgUmVnZXhlcy5vcHRpb25hbChSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAndGFyZ2V0TWF4TXAnLCBmLnRhcmdldE1heE1wLCAnXFxcXHl7RmxvYXR9JykpICsgJzonICtcclxuICAgICAgUmVnZXhlcy5vcHRpb25hbCgnXFxcXHl7RmxvYXR9JykgKyAnOicgKyAvLyBUYXJnZXQgVFBcclxuICAgICAgUmVnZXhlcy5vcHRpb25hbCgnXFxcXHl7RmxvYXR9JykgKyAnOicgKyAvLyBUYXJnZXQgTWF4IFRQXHJcbiAgICAgIFJlZ2V4ZXMub3B0aW9uYWwoUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ3RhcmdldFgnLCBmLnRhcmdldFgsICdcXFxceXtGbG9hdH0nKSkgKyAnOicgK1xyXG4gICAgICBSZWdleGVzLm9wdGlvbmFsKFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICd0YXJnZXRZJywgZi50YXJnZXRZLCAnXFxcXHl7RmxvYXR9JykpICsgJzonICtcclxuICAgICAgUmVnZXhlcy5vcHRpb25hbChSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAndGFyZ2V0WicsIGYudGFyZ2V0WiwgJ1xcXFx5e0Zsb2F0fScpKSArICc6JyArXHJcbiAgICAgIFJlZ2V4ZXMub3B0aW9uYWwoUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ3RhcmdldEhlYWRpbmcnLCBmLnRhcmdldEhlYWRpbmcsICdcXFxceXtGbG9hdH0nKSkgKyAnOicgK1xyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnaHAnLCBmLmhwLCAnXFxcXHl7RmxvYXR9JykgKyAnOicgK1xyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnbWF4SHAnLCBmLm1heEhwLCAnXFxcXHl7RmxvYXR9JykgKyAnOicgK1xyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnbXAnLCBmLm1wLCAnXFxcXHl7RmxvYXR9JykgKyAnOicgK1xyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnbWF4TXAnLCBmLm1heE1wLCAnXFxcXHl7RmxvYXR9JykgKyAnOicgK1xyXG4gICAgICAnXFxcXHl7RmxvYXR9OicgKyAvLyBTb3VyY2UgVFBcclxuICAgICAgJ1xcXFx5e0Zsb2F0fTonICsgLy8gU291cmNlIE1heCBUUFxyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAneCcsIGYueCwgJ1xcXFx5e0Zsb2F0fScpICsgJzonICtcclxuICAgICAgUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ3knLCBmLnksICdcXFxceXtGbG9hdH0nKSArICc6JyArXHJcbiAgICAgIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICd6JywgZi56LCAnXFxcXHl7RmxvYXR9JykgKyAnOicgK1xyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnaGVhZGluZycsIGYuaGVhZGluZywgJ1xcXFx5e0Zsb2F0fScpICsgJzonICtcclxuICAgICAgJy4qPyQnOyAvLyBVbmtub3duIGxhc3QgZmllbGRcclxuICAgIHJldHVybiBSZWdleGVzLnBhcnNlKHN0cik7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogZmllbGRzOiB0YXJnZXRJZCwgdGFyZ2V0LCBpZCwgY2FwdHVyZVxyXG4gICAqIG1hdGNoZXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9xdWlzcXVvdXMvY2FjdGJvdC9ibG9iL21haW4vZG9jcy9Mb2dHdWlkZS5tZCMxYi1uZXR3b3JrdGFyZ2V0aWNvbi1oZWFkLW1hcmtlcnNcclxuICAgKi9cclxuICBzdGF0aWMgaGVhZE1hcmtlcihmPzogUGFyYW1zPEhlYWRNYXJrZXJQYXJhbXM+KTogUmVnZXg8SGVhZE1hcmtlclBhcmFtcz4ge1xyXG4gICAgaWYgKHR5cGVvZiBmID09PSAndW5kZWZpbmVkJylcclxuICAgICAgZiA9IHt9O1xyXG4gICAgUmVnZXhlcy52YWxpZGF0ZVBhcmFtcyhmLCAnaGVhZE1hcmtlcicsIGhlYWRNYXJrZXJQYXJhbXMpO1xyXG4gICAgY29uc3QgY2FwdHVyZSA9IFJlZ2V4ZXMudHJ1ZUlmVW5kZWZpbmVkKGYuY2FwdHVyZSk7XHJcbiAgICBjb25zdCBzdHIgPSBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAndGltZXN0YW1wJywgJ1xcXFx5e1RpbWVzdGFtcH0nKSArXHJcbiAgICAgICcgMUI6JyArXHJcbiAgICAgIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICd0YXJnZXRJZCcsIGYudGFyZ2V0SWQsICdcXFxceXtPYmplY3RJZH0nKSArICc6JyArXHJcbiAgICAgIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICd0YXJnZXQnLCBmLnRhcmdldCwgJ1teOl0qPycpICsgJzouLi4uOi4uLi46JyArXHJcbiAgICAgIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICdpZCcsIGYuaWQsICcuLi4uJykgKyAnOic7XHJcbiAgICByZXR1cm4gUmVnZXhlcy5wYXJzZShzdHIpO1xyXG4gIH1cclxuXHJcbiAgLy8gZmllbGRzOiBuYW1lLCBjYXB0dXJlXHJcbiAgLy8gbWF0Y2hlczogaHR0cHM6Ly9naXRodWIuY29tL3F1aXNxdW91cy9jYWN0Ym90L2Jsb2IvbWFpbi9kb2NzL0xvZ0d1aWRlLm1kIzAzLWFkZGNvbWJhdGFudFxyXG4gIHN0YXRpYyBhZGRlZENvbWJhdGFudChmPzogUGFyYW1zPEFkZGVkQ29tYmF0YW50UGFyYW1zPik6IFJlZ2V4PEFkZGVkQ29tYmF0YW50UGFyYW1zPiB7XHJcbiAgICBpZiAodHlwZW9mIGYgPT09ICd1bmRlZmluZWQnKVxyXG4gICAgICBmID0ge307XHJcbiAgICBSZWdleGVzLnZhbGlkYXRlUGFyYW1zKGYsICdhZGRlZENvbWJhdGFudCcsIGFkZGVkQ29tYmF0YW50UGFyYW1zKTtcclxuICAgIGNvbnN0IGNhcHR1cmUgPSBSZWdleGVzLnRydWVJZlVuZGVmaW5lZChmLmNhcHR1cmUpO1xyXG4gICAgY29uc3Qgc3RyID0gUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ3RpbWVzdGFtcCcsICdcXFxceXtUaW1lc3RhbXB9JykgK1xyXG4gICAgICAnIDAzOlxcXFx5e09iamVjdElkfTpBZGRlZCBuZXcgY29tYmF0YW50ICcgK1xyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnbmFtZScsIGYubmFtZSwgJy4qPycpICsgJ1xcXFwuJztcclxuICAgIHJldHVybiBSZWdleGVzLnBhcnNlKHN0cik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBmaWVsZHM6IGlkLCBuYW1lLCBocCwgeCwgeSwgeiwgbnBjSWQsIGNhcHR1cmVcclxuICAgKiBtYXRjaGVzOiBodHRwczovL2dpdGh1Yi5jb20vcXVpc3F1b3VzL2NhY3Rib3QvYmxvYi9tYWluL2RvY3MvTG9nR3VpZGUubWQjMDMtYWRkY29tYmF0YW50XHJcbiAgICovXHJcbiAgc3RhdGljIGFkZGVkQ29tYmF0YW50RnVsbChcclxuICAgICAgZj86IFBhcmFtczxBZGRlZENvbWJhdGFudEZ1bGxQYXJhbXM+LFxyXG4gICk6IFJlZ2V4PEFkZGVkQ29tYmF0YW50RnVsbFBhcmFtcz4ge1xyXG4gICAgaWYgKHR5cGVvZiBmID09PSAndW5kZWZpbmVkJylcclxuICAgICAgZiA9IHt9O1xyXG4gICAgUmVnZXhlcy52YWxpZGF0ZVBhcmFtcyhmLCAnYWRkZWRDb21iYXRhbnRGdWxsJywgYWRkZWRDb21iYXRhbnRGdWxsUGFyYW1zKTtcclxuICAgIGNvbnN0IGNhcHR1cmUgPSBSZWdleGVzLnRydWVJZlVuZGVmaW5lZChmLmNhcHR1cmUpO1xyXG4gICAgY29uc3Qgc3RyID0gUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ3RpbWVzdGFtcCcsICdcXFxceXtUaW1lc3RhbXB9JykgK1xyXG4gICAgICAnIDAzOicgKyBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnaWQnLCBmLmlkLCAnXFxcXHl7T2JqZWN0SWR9JykgK1xyXG4gICAgICAnOkFkZGVkIG5ldyBjb21iYXRhbnQgJyArIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICduYW1lJywgZi5uYW1lLCAnW146XSo/JykgK1xyXG4gICAgICAnXFxcXC4gezJ9Sm9iOiAnICsgUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ2pvYicsIGYuam9iLCAnW146XSo/JykgK1xyXG4gICAgICAnIExldmVsOiAnICsgUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ2xldmVsJywgZi5sZXZlbCwgJ1teOl0qPycpICtcclxuICAgICAgJyBNYXggSFA6ICcgKyBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnaHAnLCBmLmhwLCAnWzAtOV0rJykgKyAnXFwuJyArXHJcbiAgICAgICcuKj9Qb3M6IFxcXFwoJyArXHJcbiAgICAgIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICd4JywgZi54LCAnXFxcXHl7RmxvYXR9JykgKyAnLCcgK1xyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAneScsIGYueSwgJ1xcXFx5e0Zsb2F0fScpICsgJywnICtcclxuICAgICAgUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ3onLCBmLnosICdcXFxceXtGbG9hdH0nKSArICdcXFxcKScgK1xyXG4gICAgICAnKD86IFxcXFwoJyArIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICducGNJZCcsIGYubnBjSWQsICcuKj8nKSArICdcXFxcKSk/XFxcXC4nO1xyXG4gICAgcmV0dXJuIFJlZ2V4ZXMucGFyc2Uoc3RyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGZpZWxkczogaWQsIG5hbWUsIGhwLCBjYXB0dXJlXHJcbiAgICogbWF0Y2hlczogaHR0cHM6Ly9naXRodWIuY29tL3F1aXNxdW91cy9jYWN0Ym90L2Jsb2IvbWFpbi9kb2NzL0xvZ0d1aWRlLm1kIzA0LXJlbW92ZWNvbWJhdGFudFxyXG4gICAqL1xyXG4gIHN0YXRpYyByZW1vdmluZ0NvbWJhdGFudChmPzogUGFyYW1zPFJlbW92aW5nQ29tYmF0YW50UGFyYW1zPik6IFJlZ2V4PFJlbW92aW5nQ29tYmF0YW50UGFyYW1zPiB7XHJcbiAgICBpZiAodHlwZW9mIGYgPT09ICd1bmRlZmluZWQnKVxyXG4gICAgICBmID0ge307XHJcbiAgICBSZWdleGVzLnZhbGlkYXRlUGFyYW1zKGYsICdyZW1vdmluZ0NvbWJhdGFudCcsIHJlbW92aW5nQ29tYmF0YW50UGFyYW1zKTtcclxuICAgIGNvbnN0IGNhcHR1cmUgPSBSZWdleGVzLnRydWVJZlVuZGVmaW5lZChmLmNhcHR1cmUpO1xyXG4gICAgY29uc3Qgc3RyID0gUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ3RpbWVzdGFtcCcsICdcXFxceXtUaW1lc3RhbXB9JykgK1xyXG4gICAgICAnIDA0OicgKyBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnaWQnLCAnXFxcXHl7T2JqZWN0SWR9JykgK1xyXG4gICAgICAnOlJlbW92aW5nIGNvbWJhdGFudCAnICtcclxuICAgICAgUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ25hbWUnLCBmLm5hbWUsICcuKj8nKSArICdcXFxcLicgK1xyXG4gICAgICAnLio/TWF4IEhQOiAnICsgUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ2hwJywgZi5ocCwgJ1swLTldKycpICsgJ1xcLicgK1xyXG4gICAgICBSZWdleGVzLm9wdGlvbmFsKCcuKj9Qb3M6IFxcXFwoJyArXHJcbiAgICAgIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICd4JywgZi54LCAnXFxcXHl7RmxvYXR9JykgKyAnLCcgK1xyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAneScsIGYueSwgJ1xcXFx5e0Zsb2F0fScpICsgJywnICtcclxuICAgICAgUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ3onLCBmLnosICdcXFxceXtGbG9hdH0nKSArICdcXFxcKScpO1xyXG4gICAgcmV0dXJuIFJlZ2V4ZXMucGFyc2Uoc3RyKTtcclxuICB9XHJcblxyXG5cclxuICAvLyBmaWVsZHM6IHRhcmdldElkLCB0YXJnZXQsIGVmZmVjdCwgc291cmNlLCBkdXJhdGlvbiwgY2FwdHVyZVxyXG4gIC8vIG1hdGNoZXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9xdWlzcXVvdXMvY2FjdGJvdC9ibG9iL21haW4vZG9jcy9Mb2dHdWlkZS5tZCMxYS1uZXR3b3JrYnVmZlxyXG4gIHN0YXRpYyBnYWluc0VmZmVjdChmPzogUGFyYW1zPEdhaW5zRWZmZWN0UGFyYW1zPik6IFJlZ2V4PEdhaW5zRWZmZWN0UGFyYW1zPiB7XHJcbiAgICBpZiAodHlwZW9mIGYgPT09ICd1bmRlZmluZWQnKVxyXG4gICAgICBmID0ge307XHJcbiAgICBSZWdleGVzLnZhbGlkYXRlUGFyYW1zKGYsICdnYWluc0VmZmVjdCcsIGdhaW5zRWZmZWN0UGFyYW1zKTtcclxuICAgIGNvbnN0IGNhcHR1cmUgPSBSZWdleGVzLnRydWVJZlVuZGVmaW5lZChmLmNhcHR1cmUpO1xyXG4gICAgY29uc3Qgc3RyID0gUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ3RpbWVzdGFtcCcsICdcXFxceXtUaW1lc3RhbXB9JykgK1xyXG4gICAgICAnIDFBOicgK1xyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAndGFyZ2V0SWQnLCBmLnRhcmdldElkLCAnXFxcXHl7T2JqZWN0SWR9JykgKyAnOicgK1xyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAndGFyZ2V0JywgZi50YXJnZXQsICcuKj8nKSArXHJcbiAgICAgICcgZ2FpbnMgdGhlIGVmZmVjdCBvZiAnICtcclxuICAgICAgUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ2VmZmVjdCcsIGYuZWZmZWN0LCAnLio/JykgK1xyXG4gICAgICAnIGZyb20gJyArXHJcbiAgICAgIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICdzb3VyY2UnLCBmLnNvdXJjZSwgJy4qPycpICtcclxuICAgICAgJyBmb3IgJyArXHJcbiAgICAgIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICdkdXJhdGlvbicsIGYuZHVyYXRpb24sICdcXFxceXtGbG9hdH0nKSArXHJcbiAgICAgICcgU2Vjb25kc1xcXFwuJztcclxuICAgIHJldHVybiBSZWdleGVzLnBhcnNlKHN0cik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQcmVmZXIgZ2FpbnNFZmZlY3Qgb3ZlciB0aGlzIGZ1bmN0aW9uIHVubGVzcyB5b3UgcmVhbGx5IG5lZWQgZXh0cmEgZGF0YS5cclxuICAgKiBmaWVsZHM6IHRhcmdldElkLCB0YXJnZXQsIGpvYiwgaHAsIG1heEhwLCBtcCwgbWF4TXAsIHgsIHksIHosIGhlYWRpbmcsXHJcbiAgICogICAgICAgICBkYXRhMCwgZGF0YTEsIGRhdGEyLCBkYXRhMywgZGF0YTRcclxuICAgKiBtYXRjaGVzOiBodHRwczovL2dpdGh1Yi5jb20vcXVpc3F1b3VzL2NhY3Rib3QvYmxvYi9tYWluL2RvY3MvTG9nR3VpZGUubWQjMjYtbmV0d29ya3N0YXR1c2VmZmVjdHNcclxuICAgKi9cclxuICBzdGF0aWMgc3RhdHVzRWZmZWN0RXhwbGljaXQoXHJcbiAgICAgIGY/OiBQYXJhbXM8U3RhdHVzRWZmZWN0RXhwbGljaXRQYXJhbXM+LFxyXG4gICk6IFJlZ2V4PFN0YXR1c0VmZmVjdEV4cGxpY2l0UGFyYW1zPiB7XHJcbiAgICBpZiAodHlwZW9mIGYgPT09ICd1bmRlZmluZWQnKVxyXG4gICAgICBmID0ge307XHJcbiAgICBSZWdleGVzLnZhbGlkYXRlUGFyYW1zKGYsICdzdGF0dXNFZmZlY3RFeHBsaWNpdCcsIHN0YXR1c0VmZmVjdEV4cGxpY2l0UGFyYW1zKTtcclxuICAgIGNvbnN0IGNhcHR1cmUgPSBSZWdleGVzLnRydWVJZlVuZGVmaW5lZChmLmNhcHR1cmUpO1xyXG5cclxuICAgIGNvbnN0IGtGaWVsZCA9ICcuKj86JztcclxuXHJcbiAgICBjb25zdCBzdHIgPSBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAndGltZXN0YW1wJywgJ1xcXFx5e1RpbWVzdGFtcH0nKSArXHJcbiAgICAgICcgMjY6JyArXHJcbiAgICAgIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICd0YXJnZXRJZCcsIGYudGFyZ2V0SWQsICdcXFxceXtPYmplY3RJZH0nKSArICc6JyArXHJcbiAgICAgIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICd0YXJnZXQnLCBmLnRhcmdldCwgJ1teOl0qPycpICsgJzonICtcclxuICAgICAgJ1swLTlBLUZdezAsNn0nICsgUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ2pvYicsIGYuam9iLCAnWzAtOUEtRl17MCwyfScpICsgJzonICtcclxuICAgICAgUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ2hwJywgZi5ocCwgJ1xcXFx5e0Zsb2F0fScpICsgJzonICtcclxuICAgICAgUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ21heEhwJywgZi5tYXhIcCwgJ1xcXFx5e0Zsb2F0fScpICsgJzonICtcclxuICAgICAgUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ21wJywgZi5tcCwgJ1xcXFx5e0Zsb2F0fScpICsgJzonICtcclxuICAgICAgUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ21heE1wJywgZi5tYXhNcCwgJ1xcXFx5e0Zsb2F0fScpICsgJzonICtcclxuICAgICAga0ZpZWxkICsgLy8gdHAgbG9sXHJcbiAgICAgIGtGaWVsZCArIC8vIG1heCB0cCBleHRyYSBsb2xcclxuICAgICAgLy8geCwgeSwgeiBoZWFkaW5nIG1heSBiZSBibGFua1xyXG4gICAgICBSZWdleGVzLm9wdGlvbmFsKFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICd4JywgZi54LCAnXFxcXHl7RmxvYXR9JykpICsgJzonICtcclxuICAgICAgUmVnZXhlcy5vcHRpb25hbChSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAneScsIGYueSwgJ1xcXFx5e0Zsb2F0fScpKSArICc6JyArXHJcbiAgICAgIFJlZ2V4ZXMub3B0aW9uYWwoUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ3onLCBmLnosICdcXFxceXtGbG9hdH0nKSkgKyAnOicgK1xyXG4gICAgICBSZWdleGVzLm9wdGlvbmFsKFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICdoZWFkaW5nJywgZi5oZWFkaW5nLCAnXFxcXHl7RmxvYXR9JykpICsgJzonICtcclxuICAgICAgUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ2RhdGEwJywgZi5kYXRhMCwgJ1teOl0qPycpICsgJzonICtcclxuICAgICAgUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ2RhdGExJywgZi5kYXRhMSwgJ1teOl0qPycpICsgJzonICtcclxuICAgICAgLy8gZGF0YTIsIDMsIDQgbWF5IG5vdCBleGlzdCBhbmQgdGhlIGxpbmUgbWF5IHRlcm1pbmF0ZS5cclxuICAgICAgUmVnZXhlcy5vcHRpb25hbChSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnZGF0YTInLCBmLmRhdGEyLCAnW146XSo/JykgKyAnOicpICtcclxuICAgICAgUmVnZXhlcy5vcHRpb25hbChSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnZGF0YTMnLCBmLmRhdGEzLCAnW146XSo/JykgKyAnOicpICtcclxuICAgICAgUmVnZXhlcy5vcHRpb25hbChSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnZGF0YTQnLCBmLmRhdGE0LCAnW146XSo/JykgKyAnOicpO1xyXG4gICAgcmV0dXJuIFJlZ2V4ZXMucGFyc2Uoc3RyKTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBmaWVsZHM6IHRhcmdldElkLCB0YXJnZXQsIGVmZmVjdCwgc291cmNlLCBjYXB0dXJlXHJcbiAgICogbWF0Y2hlczogaHR0cHM6Ly9naXRodWIuY29tL3F1aXNxdW91cy9jYWN0Ym90L2Jsb2IvbWFpbi9kb2NzL0xvZ0d1aWRlLm1kIzFlLW5ldHdvcmtidWZmcmVtb3ZlXHJcbiAgICovXHJcbiAgc3RhdGljIGxvc2VzRWZmZWN0KGY/OiBQYXJhbXM8TG9zZXNFZmZlY3RQYXJhbXM+KTogUmVnZXg8TG9zZXNFZmZlY3RQYXJhbXM+IHtcclxuICAgIGlmICh0eXBlb2YgZiA9PT0gJ3VuZGVmaW5lZCcpXHJcbiAgICAgIGYgPSB7fTtcclxuICAgIFJlZ2V4ZXMudmFsaWRhdGVQYXJhbXMoZiwgJ2xvc2VzRWZmZWN0JywgbG9zZXNFZmZlY3RQYXJhbXMpO1xyXG4gICAgY29uc3QgY2FwdHVyZSA9IFJlZ2V4ZXMudHJ1ZUlmVW5kZWZpbmVkKGYuY2FwdHVyZSk7XHJcbiAgICBjb25zdCBzdHIgPSBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAndGltZXN0YW1wJywgJ1xcXFx5e1RpbWVzdGFtcH0nKSArXHJcbiAgICAgICcgMUU6JyArXHJcbiAgICAgIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICd0YXJnZXRJZCcsIGYudGFyZ2V0SWQsICdcXFxceXtPYmplY3RJZH0nKSArICc6JyArXHJcbiAgICAgIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICd0YXJnZXQnLCBmLnRhcmdldCwgJy4qPycpICtcclxuICAgICAgJyBsb3NlcyB0aGUgZWZmZWN0IG9mICcgK1xyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnZWZmZWN0JywgZi5lZmZlY3QsICcuKj8nKSArXHJcbiAgICAgICcgZnJvbSAnICtcclxuICAgICAgUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ3NvdXJjZScsIGYuc291cmNlLCAnLio/JykgKyAnXFxcXC4nO1xyXG4gICAgcmV0dXJuIFJlZ2V4ZXMucGFyc2Uoc3RyKTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBmaWVsZHM6IHNvdXJjZSwgc291cmNlSWQsIHRhcmdldCwgdGFyZ2V0SWQsIGlkLCBjYXB0dXJlXHJcbiAgICogbWF0Y2hlczogaHR0cHM6Ly9naXRodWIuY29tL3F1aXNxdW91cy9jYWN0Ym90L2Jsb2IvbWFpbi9kb2NzL0xvZ0d1aWRlLm1kIzIzLW5ldHdvcmt0ZXRoZXJcclxuICAgKi9cclxuICBzdGF0aWMgdGV0aGVyKGY/OiBQYXJhbXM8VGV0aGVyUGFyYW1zPik6IFJlZ2V4PFRldGhlclBhcmFtcz4ge1xyXG4gICAgaWYgKHR5cGVvZiBmID09PSAndW5kZWZpbmVkJylcclxuICAgICAgZiA9IHt9O1xyXG4gICAgUmVnZXhlcy52YWxpZGF0ZVBhcmFtcyhmLCAndGV0aGVyJywgdGV0aGVyUGFyYW1zKTtcclxuICAgIGNvbnN0IGNhcHR1cmUgPSBSZWdleGVzLnRydWVJZlVuZGVmaW5lZChmLmNhcHR1cmUpO1xyXG4gICAgY29uc3Qgc3RyID0gUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ3RpbWVzdGFtcCcsICdcXFxceXtUaW1lc3RhbXB9JykgK1xyXG4gICAgICAnIDIzOicgK1xyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnc291cmNlSWQnLCBmLnNvdXJjZUlkLCAnXFxcXHl7T2JqZWN0SWR9JykgKyAnOicgK1xyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnc291cmNlJywgZi5zb3VyY2UsICdbXjpdKj8nKSArICc6JyArXHJcbiAgICAgIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICd0YXJnZXRJZCcsIGYudGFyZ2V0SWQsICdcXFxceXtPYmplY3RJZH0nKSArICc6JyArXHJcbiAgICAgIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICd0YXJnZXQnLCBmLnRhcmdldCwgJ1teOl0qPycpICtcclxuICAgICAgJzouLi4uOi4uLi46JyArXHJcbiAgICAgIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICdpZCcsIGYuaWQsICcuLi4uJykgKyAnOic7XHJcbiAgICByZXR1cm4gUmVnZXhlcy5wYXJzZShzdHIpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqICd0YXJnZXQnIHdhcyBkZWZlYXRlZCBieSAnc291cmNlJ1xyXG4gICAqIGZpZWxkczogdGFyZ2V0LCBzb3VyY2UsIGNhcHR1cmVcclxuICAgKiBtYXRjaGVzOiBodHRwczovL2dpdGh1Yi5jb20vcXVpc3F1b3VzL2NhY3Rib3QvYmxvYi9tYWluL2RvY3MvTG9nR3VpZGUubWQjMTktbmV0d29ya2RlYXRoXHJcbiAgICovXHJcbiAgc3RhdGljIHdhc0RlZmVhdGVkKGY/OiBQYXJhbXM8V2FzRGVmZWF0ZWRQYXJhbXM+KTogUmVnZXg8V2FzRGVmZWF0ZWRQYXJhbXM+IHtcclxuICAgIGlmICh0eXBlb2YgZiA9PT0gJ3VuZGVmaW5lZCcpXHJcbiAgICAgIGYgPSB7fTtcclxuICAgIFJlZ2V4ZXMudmFsaWRhdGVQYXJhbXMoZiwgJ3dhc0RlZmVhdGVkJywgd2FzRGVmZWF0ZWRQYXJhbXMpO1xyXG4gICAgY29uc3QgY2FwdHVyZSA9IFJlZ2V4ZXMudHJ1ZUlmVW5kZWZpbmVkKGYuY2FwdHVyZSk7XHJcbiAgICBjb25zdCBzdHIgPSBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAndGltZXN0YW1wJywgJ1xcXFx5e1RpbWVzdGFtcH0nKSArXHJcbiAgICAgICcgMTk6JyArXHJcbiAgICAgIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICd0YXJnZXQnLCBmLnRhcmdldCwgJy4qPycpICtcclxuICAgICAgJyB3YXMgZGVmZWF0ZWQgYnkgJyArXHJcbiAgICAgIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICdzb3VyY2UnLCBmLnNvdXJjZSwgJy4qPycpICsgJ1xcXFwuJztcclxuICAgIHJldHVybiBSZWdleGVzLnBhcnNlKHN0cik7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogZmllbGRzOiBuYW1lLCBocCwgY2FwdHVyZVxyXG4gICAqIG1hdGNoZXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9xdWlzcXVvdXMvY2FjdGJvdC9ibG9iL21haW4vZG9jcy9Mb2dHdWlkZS5tZCMwZC1jb21iYXRhbnRocFxyXG4gICAqL1xyXG4gIHN0YXRpYyBoYXNIUChmPzogUGFyYW1zPEhhc0hQUGFyYW1zPik6IFJlZ2V4PEhhc0hQUGFyYW1zPiB7XHJcbiAgICBpZiAodHlwZW9mIGYgPT09ICd1bmRlZmluZWQnKVxyXG4gICAgICBmID0ge307XHJcbiAgICBSZWdleGVzLnZhbGlkYXRlUGFyYW1zKGYsICdoYXNIUCcsIGhhc0hQUGFyYW1zKTtcclxuICAgIGNvbnN0IGNhcHR1cmUgPSBSZWdleGVzLnRydWVJZlVuZGVmaW5lZChmLmNhcHR1cmUpO1xyXG4gICAgY29uc3Qgc3RyID0gUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ3RpbWVzdGFtcCcsICdcXFxceXtUaW1lc3RhbXB9JykgK1xyXG4gICAgICAnIDBEOicgK1xyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnbmFtZScsIGYubmFtZSwgJy4qPycpICtcclxuICAgICAgJyBIUCBhdCAnICtcclxuICAgICAgUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ2hwJywgZi5ocCwgJ1xcXFxkKycpICsgJyUnO1xyXG4gICAgcmV0dXJuIFJlZ2V4ZXMucGFyc2Uoc3RyKTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBmaWVsZHM6IGNvZGUsIGxpbmUsIGNhcHR1cmVcclxuICAgKiBtYXRjaGVzOiBodHRwczovL2dpdGh1Yi5jb20vcXVpc3F1b3VzL2NhY3Rib3QvYmxvYi9tYWluL2RvY3MvTG9nR3VpZGUubWQjMDAtbG9nbGluZVxyXG4gICAqL1xyXG4gIHN0YXRpYyBlY2hvKGY/OiBQYXJhbXM8RWNob1BhcmFtcz4pOiBSZWdleDxFY2hvUGFyYW1zPiB7XHJcbiAgICBpZiAodHlwZW9mIGYgPT09ICd1bmRlZmluZWQnKVxyXG4gICAgICBmID0ge307XHJcbiAgICBSZWdleGVzLnZhbGlkYXRlUGFyYW1zKGYsICdlY2hvJywgZWNob1BhcmFtcyk7XHJcbiAgICByZXR1cm4gUmVnZXhlcy5nYW1lTG9nKHtcclxuICAgICAgbGluZTogZi5saW5lLFxyXG4gICAgICBjYXB0dXJlOiBmLmNhcHR1cmUsXHJcbiAgICAgIGNvZGU6ICcwMDM4JyxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIGZpZWxkczogY29kZSwgbGluZSwgbmFtZSwgY2FwdHVyZVxyXG4gICAqIG1hdGNoZXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9xdWlzcXVvdXMvY2FjdGJvdC9ibG9iL21haW4vZG9jcy9Mb2dHdWlkZS5tZCMwMC1sb2dsaW5lXHJcbiAgICovXHJcbiAgc3RhdGljIGRpYWxvZyhmPzogUGFyYW1zPERpYWxvZ1BhcmFtcz4pOiBSZWdleDxEaWFsb2dQYXJhbXM+IHtcclxuICAgIGlmICh0eXBlb2YgZiA9PT0gJ3VuZGVmaW5lZCcpXHJcbiAgICAgIGYgPSB7fTtcclxuICAgIFJlZ2V4ZXMudmFsaWRhdGVQYXJhbXMoZiwgJ2RpYWxvZycsIGRpYWxvZ1BhcmFtcyk7XHJcbiAgICBjb25zdCBjYXB0dXJlID0gUmVnZXhlcy50cnVlSWZVbmRlZmluZWQoZi5jYXB0dXJlKTtcclxuICAgIGNvbnN0IHN0ciA9IFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICd0aW1lc3RhbXAnLCAnXFxcXHl7VGltZXN0YW1wfScpICtcclxuICAgICAgJyAwMDonICtcclxuICAgICAgUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ2NvZGUnLCAnMDA0NCcpICsgJzonICtcclxuICAgICAgUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ25hbWUnLCBmLm5hbWUsICcuKj8nKSArICc6JyArXHJcbiAgICAgIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICdsaW5lJywgZi5saW5lLCAnLionKSArICckJztcclxuICAgIHJldHVybiBSZWdleGVzLnBhcnNlKHN0cik7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogZmllbGRzOiBjb2RlLCBsaW5lLCBjYXB0dXJlXHJcbiAgICogbWF0Y2hlczogaHR0cHM6Ly9naXRodWIuY29tL3F1aXNxdW91cy9jYWN0Ym90L2Jsb2IvbWFpbi9kb2NzL0xvZ0d1aWRlLm1kIzAwLWxvZ2xpbmVcclxuICAgKi9cclxuICBzdGF0aWMgbWVzc2FnZShmPzogUGFyYW1zPE1lc3NhZ2VQYXJhbXM+KTogUmVnZXg8TWVzc2FnZVBhcmFtcz4ge1xyXG4gICAgaWYgKHR5cGVvZiBmID09PSAndW5kZWZpbmVkJylcclxuICAgICAgZiA9IHt9O1xyXG4gICAgUmVnZXhlcy52YWxpZGF0ZVBhcmFtcyhmLCAnbWVzc2FnZScsIG1lc3NhZ2VQYXJhbXMpO1xyXG4gICAgcmV0dXJuIFJlZ2V4ZXMuZ2FtZUxvZyh7XHJcbiAgICAgIGxpbmU6IGYubGluZSxcclxuICAgICAgY2FwdHVyZTogZi5jYXB0dXJlLFxyXG4gICAgICBjb2RlOiAnMDgzOScsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGZpZWxkczogY29kZSwgbGluZSwgY2FwdHVyZVxyXG4gICAqIG1hdGNoZXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9xdWlzcXVvdXMvY2FjdGJvdC9ibG9iL21haW4vZG9jcy9Mb2dHdWlkZS5tZCMwMC1sb2dsaW5lXHJcbiAgICovXHJcbiAgc3RhdGljIGdhbWVMb2coZj86IFBhcmFtczxHYW1lTG9nUGFyYW1zPik6IFJlZ2V4PEdhbWVMb2dQYXJhbXM+IHtcclxuICAgIGlmICh0eXBlb2YgZiA9PT0gJ3VuZGVmaW5lZCcpXHJcbiAgICAgIGYgPSB7fTtcclxuICAgIFJlZ2V4ZXMudmFsaWRhdGVQYXJhbXMoZiwgJ2dhbWVMb2cnLCBnYW1lTG9nUGFyYW1zKTtcclxuICAgIGNvbnN0IGNhcHR1cmUgPSBSZWdleGVzLnRydWVJZlVuZGVmaW5lZChmLmNhcHR1cmUpO1xyXG4gICAgY29uc3Qgc3RyID0gUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ3RpbWVzdGFtcCcsICdcXFxceXtUaW1lc3RhbXB9JykgK1xyXG4gICAgICAnIDAwOicgK1xyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnY29kZScsIGYuY29kZSwgJy4uLi4nKSArICc6JyArXHJcbiAgICAgIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICdsaW5lJywgZi5saW5lLCAnLionKSArICckJztcclxuICAgIHJldHVybiBSZWdleGVzLnBhcnNlKHN0cik7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogZmllbGRzOiBjb2RlLCBuYW1lLCBsaW5lLCBjYXB0dXJlXHJcbiAgICogbWF0Y2hlczogaHR0cHM6Ly9naXRodWIuY29tL3F1aXNxdW91cy9jYWN0Ym90L2Jsb2IvbWFpbi9kb2NzL0xvZ0d1aWRlLm1kIzAwLWxvZ2xpbmVcclxuICAgKiBTb21lIGdhbWUgbG9nIGxpbmVzIGhhdmUgbmFtZXMgaW4gdGhlbSwgYnV0IG5vdCBhbGwuICBBbGwgbmV0d29yayBsb2cgbGluZXMgZm9yIHRoZXNlXHJcbiAgICogaGF2ZSBlbXB0eSBmaWVsZHMsIGJ1dCB0aGVzZSBnZXQgZHJvcHBlZCBieSB0aGUgQUNUIEZGWFYgcGx1Z2luLlxyXG4gICAqL1xyXG4gIHN0YXRpYyBnYW1lTmFtZUxvZyhmPzogUGFyYW1zPEdhbWVOYW1lTG9nUGFyYW1zPik6IFJlZ2V4PEdhbWVOYW1lTG9nUGFyYW1zPiB7XHJcbiAgICBpZiAodHlwZW9mIGYgPT09ICd1bmRlZmluZWQnKVxyXG4gICAgICBmID0ge307XHJcbiAgICBSZWdleGVzLnZhbGlkYXRlUGFyYW1zKGYsICdnYW1lTmFtZUxvZycsIGdhbWVOYW1lTG9nUGFyYW1zKTtcclxuICAgIGNvbnN0IGNhcHR1cmUgPSBSZWdleGVzLnRydWVJZlVuZGVmaW5lZChmLmNhcHR1cmUpO1xyXG4gICAgY29uc3Qgc3RyID0gUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ3RpbWVzdGFtcCcsICdcXFxceXtUaW1lc3RhbXB9JykgK1xyXG4gICAgICAnIDAwOicgK1xyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnY29kZScsIGYuY29kZSwgJy4uLi4nKSArICc6JyArXHJcbiAgICAgIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICduYW1lJywgZi5uYW1lLCAnW146XSonKSArICc6JyArXHJcbiAgICAgIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICdsaW5lJywgZi5saW5lLCAnLionKSArICckJztcclxuICAgIHJldHVybiBSZWdleGVzLnBhcnNlKHN0cik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBmaWVsZHM6IGpvYiwgc3RyZW5ndGgsIGRleHRlcml0eSwgdml0YWxpdHksIGludGVsbGlnZW5jZSwgbWluZCwgcGlldHksIGF0dGFja1Bvd2VyLFxyXG4gICAqICAgICAgICAgZGlyZWN0SGl0LCBjcml0aWNhbEhpdCwgYXR0YWNrTWFnaWNQb3RlbmN5LCBoZWFsTWFnaWNQb3RlbmN5LCBkZXRlcm1pbmF0aW9uLFxyXG4gICAqICAgICAgICAgc2tpbGxTcGVlZCwgc3BlbGxTcGVlZCwgdGVuYWNpdHksIGNhcHR1cmVcclxuICAgKiBtYXRjaGVzOiBodHRwczovL2dpdGh1Yi5jb20vcXVpc3F1b3VzL2NhY3Rib3QvYmxvYi9tYWluL2RvY3MvTG9nR3VpZGUubWQjMGMtcGxheWVyc3RhdHNcclxuICAgKi9cclxuICBzdGF0aWMgc3RhdENoYW5nZShmPzogUGFyYW1zPFN0YXRDaGFuZ2VQYXJhbXM+KTogUmVnZXg8U3RhdENoYW5nZVBhcmFtcz4ge1xyXG4gICAgaWYgKHR5cGVvZiBmID09PSAndW5kZWZpbmVkJylcclxuICAgICAgZiA9IHt9O1xyXG4gICAgUmVnZXhlcy52YWxpZGF0ZVBhcmFtcyhmLCAnc3RhdENoYW5nZScsIHN0YXRDaGFuZ2VQYXJhbXMpO1xyXG4gICAgY29uc3QgY2FwdHVyZSA9IFJlZ2V4ZXMudHJ1ZUlmVW5kZWZpbmVkKGYuY2FwdHVyZSk7XHJcbiAgICBjb25zdCBzdHIgPSBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAndGltZXN0YW1wJywgJ1xcXFx5e1RpbWVzdGFtcH0nKSArXHJcbiAgICAgICcgMEM6UGxheWVyIFN0YXRzOiAnICtcclxuICAgICAgUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ2pvYicsIGYuam9iLCAnXFxcXGQrJykgKyAnOicgK1xyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnc3RyZW5ndGgnLCBmLnN0cmVuZ3RoLCAnXFxcXGQrJykgKyAnOicgK1xyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnZGV4dGVyaXR5JywgZi5kZXh0ZXJpdHksICdcXFxcZCsnKSArICc6JyArXHJcbiAgICAgIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICd2aXRhbGl0eScsIGYudml0YWxpdHksICdcXFxcZCsnKSArICc6JyArXHJcbiAgICAgIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICdpbnRlbGxpZ2VuY2UnLCBmLmludGVsbGlnZW5jZSwgJ1xcXFxkKycpICsgJzonICtcclxuICAgICAgUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ21pbmQnLCBmLm1pbmQsICdcXFxcZCsnKSArICc6JyArXHJcbiAgICAgIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICdwaWV0eScsIGYucGlldHksICdcXFxcZCsnKSArICc6JyArXHJcbiAgICAgIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICdhdHRhY2tQb3dlcicsIGYuYXR0YWNrUG93ZXIsICdcXFxcZCsnKSArICc6JyArXHJcbiAgICAgIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICdkaXJlY3RIaXQnLCBmLmRpcmVjdEhpdCwgJ1xcXFxkKycpICsgJzonICtcclxuICAgICAgUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ2NyaXRpY2FsSGl0JywgZi5jcml0aWNhbEhpdCwgJ1xcXFxkKycpICsgJzonICtcclxuICAgICAgUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ2F0dGFja01hZ2ljUG90ZW5jeScsIGYuYXR0YWNrTWFnaWNQb3RlbmN5LCAnXFxcXGQrJykgKyAnOicgK1xyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnaGVhbE1hZ2ljUG90ZW5jeScsIGYuaGVhbE1hZ2ljUG90ZW5jeSwgJ1xcXFxkKycpICsgJzonICtcclxuICAgICAgUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ2RldGVybWluYXRpb24nLCBmLmRldGVybWluYXRpb24sICdcXFxcZCsnKSArICc6JyArXHJcbiAgICAgIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICdza2lsbFNwZWVkJywgZi5za2lsbFNwZWVkLCAnXFxcXGQrJykgKyAnOicgK1xyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAnc3BlbGxTcGVlZCcsIGYuc3BlbGxTcGVlZCwgJ1xcXFxkKycpICtcclxuICAgICAgJzowOicgK1xyXG4gICAgICBSZWdleGVzLm1heWJlQ2FwdHVyZShjYXB0dXJlLCAndGVuYWNpdHknLCBmLnRlbmFjaXR5LCAnXFxcXGQrJyk7XHJcbiAgICByZXR1cm4gUmVnZXhlcy5wYXJzZShzdHIpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIGZpZWxkczogbmFtZSwgY2FwdHVyZVxyXG4gICAqIG1hdGNoZXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9xdWlzcXVvdXMvY2FjdGJvdC9ibG9iL21haW4vZG9jcy9Mb2dHdWlkZS5tZCMwMS1jaGFuZ2V6b25lXHJcbiAgICovXHJcbiAgc3RhdGljIGNoYW5nZVpvbmUoZj86IFBhcmFtczxDaGFuZ2Vab25lUGFyYW1zPik6IFJlZ2V4PENoYW5nZVpvbmVQYXJhbXM+IHtcclxuICAgIGlmICh0eXBlb2YgZiA9PT0gJ3VuZGVmaW5lZCcpXHJcbiAgICAgIGYgPSB7fTtcclxuICAgIFJlZ2V4ZXMudmFsaWRhdGVQYXJhbXMoZiwgJ2NoYW5nZVpvbmUnLCBjaGFuZ2Vab25lUGFyYW1zKTtcclxuICAgIGNvbnN0IGNhcHR1cmUgPSBSZWdleGVzLnRydWVJZlVuZGVmaW5lZChmLmNhcHR1cmUpO1xyXG4gICAgY29uc3Qgc3RyID0gUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ3RpbWVzdGFtcCcsICdcXFxceXtUaW1lc3RhbXB9JykgK1xyXG4gICAgICAnIDAxOkNoYW5nZWQgWm9uZSB0byAnICtcclxuICAgICAgUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ25hbWUnLCBmLm5hbWUsICcuKj8nKSArICdcXFxcLic7XHJcbiAgICByZXR1cm4gUmVnZXhlcy5wYXJzZShzdHIpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIGZpZWxkczogaW5zdGFuY2UsIGNvbW1hbmQsIGRhdGEwLCBkYXRhMSwgZGF0YTIsIGRhdGEzXHJcbiAgICogbWF0Y2hlczogaHR0cHM6Ly9naXRodWIuY29tL3F1aXNxdW91cy9jYWN0Ym90L2Jsb2IvbWFpbi9kb2NzL0xvZ0d1aWRlLm1kIzIxLW5ldHdvcms2ZC1hY3Rvci1jb250cm9sLWxpbmVzXHJcbiAgICovXHJcbiAgc3RhdGljIG5ldHdvcms2ZChmPzogUGFyYW1zPE5ldHdvcms2ZFBhcmFtcz4pOiBSZWdleDxOZXR3b3JrNmRQYXJhbXM+IHtcclxuICAgIGlmICh0eXBlb2YgZiA9PT0gJ3VuZGVmaW5lZCcpXHJcbiAgICAgIGYgPSB7fTtcclxuICAgIFJlZ2V4ZXMudmFsaWRhdGVQYXJhbXMoZiwgJ25ldHdvcms2ZCcsIG5ldHdvcms2ZFBhcmFtcyk7XHJcbiAgICBjb25zdCBjYXB0dXJlID0gUmVnZXhlcy50cnVlSWZVbmRlZmluZWQoZi5jYXB0dXJlKTtcclxuICAgIGNvbnN0IHN0ciA9IFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICd0aW1lc3RhbXAnLCAnXFxcXHl7VGltZXN0YW1wfScpICtcclxuICAgICAgJyAyMTonICtcclxuICAgICAgUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ2luc3RhbmNlJywgZi5pbnN0YW5jZSwgJy4qPycpICsgJzonICtcclxuICAgICAgUmVnZXhlcy5tYXliZUNhcHR1cmUoY2FwdHVyZSwgJ2NvbW1hbmQnLCBmLmNvbW1hbmQsICcuKj8nKSArICc6JyArXHJcbiAgICAgIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICdkYXRhMCcsIGYuZGF0YTAsICcuKj8nKSArICc6JyArXHJcbiAgICAgIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICdkYXRhMScsIGYuZGF0YTEsICcuKj8nKSArICc6JyArXHJcbiAgICAgIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICdkYXRhMicsIGYuZGF0YTIsICcuKj8nKSArICc6JyArXHJcbiAgICAgIFJlZ2V4ZXMubWF5YmVDYXB0dXJlKGNhcHR1cmUsICdkYXRhMycsIGYuZGF0YTMsICcuKj8nKSArICckJztcclxuICAgIHJldHVybiBSZWdleGVzLnBhcnNlKHN0cik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIZWxwZXIgZnVuY3Rpb24gZm9yIGJ1aWxkaW5nIG5hbWVkIGNhcHR1cmUgZ3JvdXBcclxuICAgKi9cclxuICBzdGF0aWMgbWF5YmVDYXB0dXJlKFxyXG4gICAgICBjYXB0dXJlOiBib29sZWFuLFxyXG4gICAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICAgIHZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSB8IHVuZGVmaW5lZCxcclxuICAgICAgZGVmYXVsdFZhbHVlPzogc3RyaW5nLFxyXG4gICk6IHN0cmluZyB7XHJcbiAgICBpZiAoIXZhbHVlKVxyXG4gICAgICB2YWx1ZSA9IGRlZmF1bHRWYWx1ZTtcclxuICAgIHZhbHVlID0gUmVnZXhlcy5hbnlPZih2YWx1ZSBhcyBWYWxpZFN0cmluZ09yQXJyYXkpO1xyXG4gICAgcmV0dXJuIGNhcHR1cmUgPyBSZWdleGVzLm5hbWVkQ2FwdHVyZShuYW1lLCB2YWx1ZSkgOiB2YWx1ZTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBvcHRpb25hbChzdHI6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gYCg/OiR7c3RyfSk/YDtcclxuICB9XHJcblxyXG4gIC8vIENyZWF0ZXMgYSBuYW1lZCByZWdleCBjYXB0dXJlIGdyb3VwIG5hbWVkIHxuYW1lfCBmb3IgdGhlIG1hdGNoIHx2YWx1ZXwuXHJcbiAgc3RhdGljIG5hbWVkQ2FwdHVyZShuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgaWYgKG5hbWUuaW5jbHVkZXMoJz4nKSlcclxuICAgICAgY29uc29sZS5lcnJvcignXCInICsgbmFtZSArICdcIiBjb250YWlucyBcIj5cIi4nKTtcclxuICAgIGlmIChuYW1lLmluY2x1ZGVzKCc8JykpXHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1wiJyArIG5hbWUgKyAnXCIgY29udGFpbnMgXCI+XCIuJyk7XHJcblxyXG4gICAgcmV0dXJuICcoPzwnICsgbmFtZSArICc+JyArIHZhbHVlICsgJyknO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29udmVuaWVuY2UgZm9yIHR1cm5pbmcgbXVsdGlwbGUgYXJncyBpbnRvIGEgdW5pb25lZCByZWd1bGFyIGV4cHJlc3Npb24uXHJcbiAgICogYW55T2YoeCwgeSwgeikgb3IgYW55T2YoW3gsIHksIHpdKSBkbyB0aGUgc2FtZSB0aGluZywgYW5kIHJldHVybiAoPzp4fHl8eikuXHJcbiAgICogYW55T2YoeCkgb3IgYW55T2YoeCkgb24gaXRzIG93biBzaW1wbGlmaWVzIHRvIGp1c3QgeC5cclxuICAgKiBhcmdzIG1heSBiZSBzdHJpbmdzIG9yIFJlZ0V4cCwgYWx0aG91Z2ggYW55IGFkZGl0aW9uYWwgbWFya2VycyB0byBSZWdFeHBcclxuICAgKiBsaWtlIC9pbnNlbnNpdGl2ZS9pIGFyZSBkcm9wcGVkLlxyXG4gICAqL1xyXG4gIHN0YXRpYyBhbnlPZiguLi5hcmdzOiAoc3RyaW5nfHN0cmluZ1tdfFJlZ0V4cClbXSk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBhbnlPZkFycmF5ID0gKGFycmF5OiAoc3RyaW5nfFJlZ0V4cClbXSk6IHN0cmluZyA9PiB7XHJcbiAgICAgIHJldHVybiBgKD86JHthcnJheS5tYXAoKGVsZW0pID0+IGVsZW0gaW5zdGFuY2VvZiBSZWdFeHAgPyBlbGVtLnNvdXJjZSA6IGVsZW0pLmpvaW4oJ3wnKX0pYDtcclxuICAgIH07XHJcbiAgICBsZXQgYXJyYXk6IChzdHJpbmd8UmVnRXhwKVtdID0gW107XHJcbiAgICBpZiAoYXJncy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnc1swXSkpXHJcbiAgICAgICAgYXJyYXkgPSBhcmdzWzBdO1xyXG4gICAgICBlbHNlIGlmIChhcmdzWzBdKVxyXG4gICAgICAgIGFycmF5ID0gW2FyZ3NbMF1dO1xyXG4gICAgICBlbHNlXHJcbiAgICAgICAgYXJyYXkgPSBbXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFRPRE86IG1vcmUgYWNjdXJhdGUgdHlwZSBpbnN0ZWFkIG9mIGBhc2AgY2FzdFxyXG4gICAgICBhcnJheSA9IGFyZ3MgYXMgc3RyaW5nW107XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYW55T2ZBcnJheShhcnJheSk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcGFyc2UocmVnZXhwU3RyaW5nOiBSZWdFeHAgfCBzdHJpbmcpOiBSZWdFeHAge1xyXG4gICAgY29uc3Qga0NhY3Rib3RDYXRlZ29yaWVzID0ge1xyXG4gICAgICBUaW1lc3RhbXA6ICdeLnsxNH0nLFxyXG4gICAgICBOZXRUaW1lc3RhbXA6ICcuezMzfScsXHJcbiAgICAgIE5ldEZpZWxkOiAnKD86W158XSpcXFxcfCknLFxyXG4gICAgICBMb2dUeXBlOiAnWzAtOUEtRmEtZl17Mn0nLFxyXG4gICAgICBBYmlsaXR5Q29kZTogJ1swLTlBLUZhLWZdezEsOH0nLFxyXG4gICAgICBPYmplY3RJZDogJ1swLTlBLUZdezh9JyxcclxuICAgICAgLy8gTWF0Y2hlcyBhbnkgY2hhcmFjdGVyIG5hbWUgKGluY2x1ZGluZyBlbXB0eSBzdHJpbmdzIHdoaWNoIHRoZSBGRlhJVlxyXG4gICAgICAvLyBBQ1QgcGx1Z2luIGNhbiBnZW5lcmF0ZSB3aGVuIHVua25vd24pLlxyXG4gICAgICBOYW1lOiAnKD86W15cXFxcczp8XSsoPzogW15cXFxcczp8XSspP3wpJyxcclxuICAgICAgLy8gRmxvYXRzIGNhbiBoYXZlIGNvbW1hIGFzIHNlcGFyYXRvciBpbiBGRlhJViBwbHVnaW4gb3V0cHV0OiBodHRwczovL2dpdGh1Yi5jb20vcmF2YWhuL0ZGWElWX0FDVF9QbHVnaW4vaXNzdWVzLzEzN1xyXG4gICAgICBGbG9hdDogJy0/WzAtOV0rKD86Wy4sXVswLTldKyk/KD86RS0/WzAtOV0rKT8nLFxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBbGwgcmVnZXhlcyBpbiBjYWN0Ym90IGFyZSBjYXNlIGluc2Vuc2l0aXZlLlxyXG4gICAgLy8gVGhpcyBhdm9pZHMgaGVhZGFjaGVzIGFzIHRoaW5ncyBsaWtlIGBWaWNlIGFuZCBWYW5pdHlgIHR1cm5zIGludG9cclxuICAgIC8vIGBWaWNlIEFuZCBWYW5pdHlgLCBlc3BlY2lhbGx5IGZvciBGcmVuY2ggYW5kIEdlcm1hbi4gIEl0IGFwcGVhcnMgdG9cclxuICAgIC8vIGhhdmUgYSB+MjAlIHJlZ2V4IHBhcnNpbmcgb3ZlcmhlYWQsIGJ1dCBhdCBsZWFzdCB0aGV5IHdvcmsuXHJcbiAgICBsZXQgbW9kaWZpZXJzID0gJ2knO1xyXG4gICAgaWYgKHJlZ2V4cFN0cmluZyBpbnN0YW5jZW9mIFJlZ0V4cCkge1xyXG4gICAgICBtb2RpZmllcnMgKz0gKHJlZ2V4cFN0cmluZy5nbG9iYWwgPyAnZycgOiAnJykgK1xyXG4gICAgICAgICAgICAgICAgICAgIChyZWdleHBTdHJpbmcubXVsdGlsaW5lID8gJ20nIDogJycpO1xyXG4gICAgICByZWdleHBTdHJpbmcgPSByZWdleHBTdHJpbmcuc291cmNlO1xyXG4gICAgfVxyXG4gICAgcmVnZXhwU3RyaW5nID0gcmVnZXhwU3RyaW5nLnJlcGxhY2UoL1xcXFx5XFx7KC4qPylcXH0vZywgKG1hdGNoLCBncm91cCkgPT4ge1xyXG4gICAgICByZXR1cm4ga0NhY3Rib3RDYXRlZ29yaWVzW2dyb3VwIGFzIGtleW9mIHR5cGVvZiBrQ2FjdGJvdENhdGVnb3JpZXNdIHx8IG1hdGNoO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbmV3IFJlZ0V4cChyZWdleHBTdHJpbmcsIG1vZGlmaWVycyk7XHJcbiAgfVxyXG5cclxuICAvLyBMaWtlIFJlZ2V4LlJlZ2V4ZXMucGFyc2UsIGJ1dCBmb3JjZSBnbG9iYWwgZmxhZy5cclxuICBzdGF0aWMgcGFyc2VHbG9iYWwocmVnZXhwU3RyaW5nOiBSZWdFeHAgfCBzdHJpbmcpOiBSZWdFeHAge1xyXG4gICAgY29uc3QgcmVnZXggPSBSZWdleGVzLnBhcnNlKHJlZ2V4cFN0cmluZyk7XHJcbiAgICBsZXQgbW9kaWZpZXJzID0gJ2dpJztcclxuICAgIGlmIChyZWdleHBTdHJpbmcgaW5zdGFuY2VvZiBSZWdFeHApXHJcbiAgICAgIG1vZGlmaWVycyArPSAocmVnZXhwU3RyaW5nLm11bHRpbGluZSA/ICdtJyA6ICcnKTtcclxuICAgIHJldHVybiBuZXcgUmVnRXhwKHJlZ2V4LnNvdXJjZSwgbW9kaWZpZXJzKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyB0cnVlSWZVbmRlZmluZWQodmFsdWU/OiBib29sZWFuKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodHlwZW9mICh2YWx1ZSkgPT09ICd1bmRlZmluZWQnKVxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIHJldHVybiAhIXZhbHVlO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHZhbGlkYXRlUGFyYW1zKFxyXG4gICAgICBmOiBSZWFkb25seTx7IFtzOiBzdHJpbmddOiB1bmtub3duIH0+LFxyXG4gICAgICBmdW5jTmFtZTogc3RyaW5nLFxyXG4gICAgICBwYXJhbXM6IFJlYWRvbmx5PHN0cmluZ1tdPixcclxuICApOiB2b2lkIHtcclxuICAgIGlmIChmID09PSBudWxsKVxyXG4gICAgICByZXR1cm47XHJcbiAgICBpZiAodHlwZW9mIGYgIT09ICdvYmplY3QnKVxyXG4gICAgICByZXR1cm47XHJcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoZik7XHJcbiAgICBmb3IgKGxldCBrID0gMDsgayA8IGtleXMubGVuZ3RoOyArK2spIHtcclxuICAgICAgY29uc3Qga2V5ID0ga2V5c1trXTtcclxuICAgICAgaWYgKGtleSAmJiAhcGFyYW1zLmluY2x1ZGVzKGtleSkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7ZnVuY05hbWV9OiBpbnZhbGlkIHBhcmFtZXRlciAnJHtrZXl9Jy4gIGAgK1xyXG4gICAgICAgICAgICBgVmFsaWQgcGFyYW1zOiAke0pTT04uc3RyaW5naWZ5KHBhcmFtcyl9YCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmV0UGFyYW1zIH0gZnJvbSAnLi4vdHlwZXMvbmV0X3Byb3BzJztcclxuaW1wb3J0IHsgQ2FjdGJvdEJhc2VSZWdFeHAsIFRyaWdnZXJUeXBlcyB9IGZyb20gJy4uL3R5cGVzL25ldF90cmlnZ2VyJztcclxuaW1wb3J0IFJlZ2V4ZXMgZnJvbSAnLi9yZWdleGVzJztcclxuXHJcbmludGVyZmFjZSBGaWVsZHMge1xyXG4gIGZpZWxkOiBzdHJpbmc7XHJcbiAgdmFsdWU/OiBzdHJpbmc7XHJcbn1cclxuXHJcbi8vIERpZmZlcmVuY2VzIGZyb20gUmVnZXhlczpcclxuLy8gKiBtYXkgaGF2ZSBtb3JlIGZpZWxkc1xyXG4vLyAqIEFkZGVkQ29tYmF0YW50IG5wYyBpZCBpcyBicm9rZW4gdXAgaW50byBucGNOYW1lSWQgYW5kIG5wY0Jhc2VJZFxyXG4vLyAqIGdhbWVMb2cgYWx3YXlzIHNwbGl0cyBuYW1lIGludG8gaXRzIG93biBmaWVsZCAoYnV0IHByZXZpb3VzbHkgd291bGRuJ3QpXHJcblxyXG5jb25zdCBzZXBhcmF0b3IgPSAnXFxcXHwnO1xyXG5jb25zdCBtYXRjaERlZmF1bHQgPSAnW158XSonO1xyXG5cclxuLy8gSWYgTmV0UmVnZXhlcy5zZXRGbGFnVHJhbnNsYXRpb25zTmVlZGVkIGlzIHNldCB0byB0cnVlLCB0aGVuIGFueVxyXG4vLyByZWdleCBjcmVhdGVkIHRoYXQgcmVxdWlyZXMgYSB0cmFuc2xhdGlvbiB3aWxsIGJlZ2luIHdpdGggdGhpcyBzdHJpbmdcclxuLy8gYW5kIG1hdGNoIHRoZSBtYWdpY1N0cmluZ1JlZ2V4LiAgVGhpcyBpcyBtYXliZSBhIGJpdCBnb29meSwgYnV0IGlzXHJcbi8vIGEgcHJldHR5IHN0cmFpZ2h0Zm9yd2FyZCB3YXkgdG8gbWFyayByZWdleGVzIGZvciB0cmFuc2xhdGlvbnMuXHJcbi8vIElmIGlzc3VlICMxMzA2IGlzIGV2ZXIgcmVzb2x2ZWQsIHdlIGNhbiByZW1vdmUgdGhpcy5cclxuY29uc3QgbWFnaWNUcmFuc2xhdGlvblN0cmluZyA9IGBeXmA7XHJcbmNvbnN0IG1hZ2ljU3RyaW5nUmVnZXggPSAvXlxcXlxcXi87XHJcbmNvbnN0IGtleXNUaGF0UmVxdWlyZVRyYW5zbGF0aW9uID0gW1xyXG4gICdhYmlsaXR5JyxcclxuICAnbmFtZScsXHJcbiAgJ3NvdXJjZScsXHJcbiAgJ3RhcmdldCcsXHJcbiAgJ2xpbmUnLFxyXG5dO1xyXG5cclxuY29uc3QgcGFyc2VIZWxwZXIgPSA8VCBleHRlbmRzIFRyaWdnZXJUeXBlcz4oXHJcbiAgcGFyYW1zOiB7IHRpbWVzdGFtcD86IHN0cmluZzsgY2FwdHVyZT86IGJvb2xlYW4gfSB8IHVuZGVmaW5lZCxcclxuICBmdW5jTmFtZTogc3RyaW5nLFxyXG4gIGZpZWxkczogeyBbczogc3RyaW5nXTogRmllbGRzIH0sXHJcbik6IENhY3Rib3RCYXNlUmVnRXhwPFQ+ID0+IHtcclxuICBwYXJhbXMgPSBwYXJhbXMgPz8ge307XHJcbiAgY29uc3QgdmFsaWRGaWVsZHM6IHN0cmluZ1tdID0gW107XHJcbiAgZm9yIChjb25zdCB2YWx1ZSBvZiBPYmplY3QudmFsdWVzKGZpZWxkcykpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKVxyXG4gICAgICBjb250aW51ZTtcclxuICAgIHZhbGlkRmllbGRzLnB1c2godmFsdWUuZmllbGQpO1xyXG4gIH1cclxuICBSZWdleGVzLnZhbGlkYXRlUGFyYW1zKHBhcmFtcywgZnVuY05hbWUsIFsnY2FwdHVyZScsIC4uLnZhbGlkRmllbGRzXSk7XHJcblxyXG4gIC8vIEZpbmQgdGhlIGxhc3Qga2V5IHdlIGNhcmUgYWJvdXQsIHNvIHdlIGNhbiBzaG9ydGVuIHRoZSByZWdleCBpZiBuZWVkZWQuXHJcbiAgY29uc3QgY2FwdHVyZSA9IFJlZ2V4ZXMudHJ1ZUlmVW5kZWZpbmVkKHBhcmFtcy5jYXB0dXJlKTtcclxuICBjb25zdCBmaWVsZEtleXMgPSBPYmplY3Qua2V5cyhmaWVsZHMpO1xyXG4gIGxldCBtYXhLZXk7XHJcbiAgaWYgKGNhcHR1cmUpIHtcclxuICAgIG1heEtleSA9IGZpZWxkS2V5c1tmaWVsZEtleXMubGVuZ3RoIC0gMV07XHJcbiAgfSBlbHNlIHtcclxuICAgIG1heEtleSA9IDA7XHJcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBmaWVsZEtleXMpIHtcclxuICAgICAgY29uc3QgdmFsdWUgPSBmaWVsZHNba2V5XSA/PyB7fTtcclxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpXHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIGNvbnN0IGZpZWxkTmFtZSA9IGZpZWxkc1trZXldPy5maWVsZDtcclxuICAgICAgaWYgKGZpZWxkTmFtZSAmJiBmaWVsZE5hbWUgaW4gcGFyYW1zKVxyXG4gICAgICAgIG1heEtleSA9IGtleTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIEZvciB0ZXN0aW5nLCBpdCdzIHVzZWZ1bCB0byBrbm93IGlmIHRoaXMgaXMgYSByZWdleCB0aGF0IHJlcXVpcmVzXHJcbiAgLy8gdHJhbnNsYXRpb24uICBXZSB0ZXN0IHRoaXMgYnkgc2VlaW5nIGlmIHRoZXJlIGFyZSBhbnkgc3BlY2lmaWVkXHJcbiAgLy8gZmllbGRzLCBhbmQgaWYgc28sIGluc2VydGluZyBhIG1hZ2ljIHN0cmluZyB0aGF0IHdlIGNhbiBkZXRlY3QuXHJcbiAgLy8gVGhpcyBsZXRzIHVzIGRpZmZlcmVudGlhdGUgYmV0d2VlbiBcInJlZ2V4IHRoYXQgc2hvdWxkIGJlIHRyYW5zbGF0ZWRcIlxyXG4gIC8vIGUuZy4gYSByZWdleCB3aXRoIGB0YXJnZXRgIHNwZWNpZmllZCwgYW5kIFwicmVnZXggdGhhdCBzaG91bGRuJ3RcIlxyXG4gIC8vIGUuZy4gYSBnYWlucyBlZmZlY3Qgd2l0aCBqdXN0IGVmZmVjdElkIHNwZWNpZmllZC5cclxuICBjb25zdCB0cmFuc1BhcmFtcyA9IE9iamVjdC5rZXlzKHBhcmFtcykuZmlsdGVyKChrKSA9PiBrZXlzVGhhdFJlcXVpcmVUcmFuc2xhdGlvbi5pbmNsdWRlcyhrKSk7XHJcbiAgY29uc3QgbmVlZHNUcmFuc2xhdGlvbnMgPSBOZXRSZWdleGVzLmZsYWdUcmFuc2xhdGlvbnNOZWVkZWQgJiYgdHJhbnNQYXJhbXMubGVuZ3RoID4gMDtcclxuXHJcbiAgLy8gQnVpbGQgdGhlIHJlZ2V4IGZyb20gdGhlIGZpZWxkcy5cclxuICBsZXQgc3RyID0gbmVlZHNUcmFuc2xhdGlvbnMgPyBtYWdpY1RyYW5zbGF0aW9uU3RyaW5nIDogJ14nO1xyXG4gIGxldCBsYXN0S2V5ID0gLTE7XHJcbiAgZm9yIChjb25zdCBfa2V5IGluIGZpZWxkcykge1xyXG4gICAgY29uc3Qga2V5ID0gcGFyc2VJbnQoX2tleSk7XHJcbiAgICAvLyBGaWxsIGluIGJsYW5rcy5cclxuICAgIGNvbnN0IG1pc3NpbmdGaWVsZHMgPSBrZXkgLSBsYXN0S2V5IC0gMTtcclxuICAgIGlmIChtaXNzaW5nRmllbGRzID09PSAxKVxyXG4gICAgICBzdHIgKz0gJ1xcXFx5e05ldEZpZWxkfSc7XHJcbiAgICBlbHNlIGlmIChtaXNzaW5nRmllbGRzID4gMSlcclxuICAgICAgc3RyICs9IGBcXFxceXtOZXRGaWVsZH17JHttaXNzaW5nRmllbGRzfX1gO1xyXG4gICAgbGFzdEtleSA9IGtleTtcclxuXHJcbiAgICBjb25zdCB2YWx1ZSA9IGZpZWxkc1trZXldO1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpXHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHtmdW5jTmFtZX06IGludmFsaWQgdmFsdWU6ICR7SlNPTi5zdHJpbmdpZnkodmFsdWUpfWApO1xyXG5cclxuICAgIGNvbnN0IGZpZWxkTmFtZSA9IGZpZWxkc1trZXldPy5maWVsZDtcclxuICAgIGNvbnN0IGZpZWxkVmFsdWUgPSBmaWVsZHNba2V5XT8udmFsdWU/LnRvU3RyaW5nKCkgPz8gbWF0Y2hEZWZhdWx0O1xyXG5cclxuICAgIGlmIChmaWVsZE5hbWUpIHtcclxuICAgICAgc3RyICs9IFJlZ2V4ZXMubWF5YmVDYXB0dXJlKFxyXG4gICAgICAgICAgLy8gbW9yZSBhY2N1cmF0ZSB0eXBlIGluc3RlYWQgb2YgYGFzYCBjYXN0XHJcbiAgICAgICAgICAvLyBtYXliZSB0aGlzIGZ1bmN0aW9uIG5lZWRzIGEgcmVmYWN0b3JpbmdcclxuICAgICAgICAgIGNhcHR1cmUsIGZpZWxkTmFtZSwgKHBhcmFtcyBhcyB7IFtzOiBzdHJpbmddOiBzdHJpbmcgfSlbZmllbGROYW1lXSwgZmllbGRWYWx1ZSkgK1xyXG4gICAgICAgIHNlcGFyYXRvcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN0ciArPSBmaWVsZFZhbHVlICsgc2VwYXJhdG9yO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBTdG9wIGlmIHdlJ3JlIG5vdCBjYXB0dXJpbmcgYW5kIGRvbid0IGNhcmUgYWJvdXQgZnV0dXJlIGZpZWxkcy5cclxuICAgIGlmIChrZXkgPj0gKG1heEtleSA/PyAwIGFzIG51bWJlcikpXHJcbiAgICAgIGJyZWFrO1xyXG4gIH1cclxuICByZXR1cm4gUmVnZXhlcy5wYXJzZShzdHIpIGFzIENhY3Rib3RCYXNlUmVnRXhwPFQ+O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV0UmVnZXhlcyB7XHJcbiAgc3RhdGljIGZsYWdUcmFuc2xhdGlvbnNOZWVkZWQgPSBmYWxzZTtcclxuICBzdGF0aWMgc2V0RmxhZ1RyYW5zbGF0aW9uc05lZWRlZCh2YWx1ZTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgTmV0UmVnZXhlcy5mbGFnVHJhbnNsYXRpb25zTmVlZGVkID0gdmFsdWU7XHJcbiAgfVxyXG4gIHN0YXRpYyBkb2VzTmV0UmVnZXhOZWVkVHJhbnNsYXRpb24ocmVnZXg6IFJlZ0V4cCB8IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgLy8gTmVlZCB0byBgc2V0RmxhZ1RyYW5zbGF0aW9uc05lZWRlZGAgYmVmb3JlIGNhbGxpbmcgdGhpcyBmdW5jdGlvbi5cclxuICAgIGNvbnNvbGUuYXNzZXJ0KE5ldFJlZ2V4ZXMuZmxhZ1RyYW5zbGF0aW9uc05lZWRlZCk7XHJcbiAgICBjb25zdCBzdHIgPSB0eXBlb2YgcmVnZXggPT09ICdzdHJpbmcnID8gcmVnZXggOiByZWdleC5zb3VyY2U7XHJcbiAgICByZXR1cm4gISFtYWdpY1N0cmluZ1JlZ2V4LmV4ZWMoc3RyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIG1hdGNoZXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9xdWlzcXVvdXMvY2FjdGJvdC9ibG9iL21haW4vZG9jcy9Mb2dHdWlkZS5tZCMxNC1uZXR3b3Jrc3RhcnRzY2FzdGluZ1xyXG4gICAqL1xyXG4gIHN0YXRpYyBzdGFydHNVc2luZyhwYXJhbXM/OiBOZXRQYXJhbXNbJ1N0YXJ0c1VzaW5nJ10pOiBDYWN0Ym90QmFzZVJlZ0V4cDwnU3RhcnRzVXNpbmcnPiB7XHJcbiAgICByZXR1cm4gcGFyc2VIZWxwZXIocGFyYW1zLCAnc3RhcnRzVXNpbmcnLCB7XHJcbiAgICAgIDA6IHsgZmllbGQ6ICd0eXBlJywgdmFsdWU6ICcyMCcgfSxcclxuICAgICAgMTogeyBmaWVsZDogJ3RpbWVzdGFtcCcgfSxcclxuICAgICAgMjogeyBmaWVsZDogJ3NvdXJjZUlkJyB9LFxyXG4gICAgICAzOiB7IGZpZWxkOiAnc291cmNlJyB9LFxyXG4gICAgICA0OiB7IGZpZWxkOiAnaWQnIH0sXHJcbiAgICAgIDU6IHsgZmllbGQ6ICdhYmlsaXR5JyB9LFxyXG4gICAgICA2OiB7IGZpZWxkOiAndGFyZ2V0SWQnIH0sXHJcbiAgICAgIDc6IHsgZmllbGQ6ICd0YXJnZXQnIH0sXHJcbiAgICAgIDg6IHsgZmllbGQ6ICdjYXN0VGltZScgfSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIG1hdGNoZXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9xdWlzcXVvdXMvY2FjdGJvdC9ibG9iL21haW4vZG9jcy9Mb2dHdWlkZS5tZCMxNS1uZXR3b3JrYWJpbGl0eVxyXG4gICAqIG1hdGNoZXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9xdWlzcXVvdXMvY2FjdGJvdC9ibG9iL21haW4vZG9jcy9Mb2dHdWlkZS5tZCMxNi1uZXR3b3JrYW9lYWJpbGl0eVxyXG4gICAqL1xyXG4gIHN0YXRpYyBhYmlsaXR5KHBhcmFtcz86IE5ldFBhcmFtc1snQWJpbGl0eSddKTogQ2FjdGJvdEJhc2VSZWdFeHA8J0FiaWxpdHknPiB7XHJcbiAgICByZXR1cm4gcGFyc2VIZWxwZXIocGFyYW1zLCAnYWJpbGl0eScsIHtcclxuICAgICAgMDogeyBmaWVsZDogJ3R5cGUnLCB2YWx1ZTogJzJbMTJdJyB9LFxyXG4gICAgICAxOiB7IGZpZWxkOiAndGltZXN0YW1wJyB9LFxyXG4gICAgICAyOiB7IGZpZWxkOiAnc291cmNlSWQnIH0sXHJcbiAgICAgIDM6IHsgZmllbGQ6ICdzb3VyY2UnIH0sXHJcbiAgICAgIDQ6IHsgZmllbGQ6ICdpZCcgfSxcclxuICAgICAgNTogeyBmaWVsZDogJ2FiaWxpdHknIH0sXHJcbiAgICAgIDY6IHsgZmllbGQ6ICd0YXJnZXRJZCcgfSxcclxuICAgICAgNzogeyBmaWVsZDogJ3RhcmdldCcgfSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIG1hdGNoZXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9xdWlzcXVvdXMvY2FjdGJvdC9ibG9iL21haW4vZG9jcy9Mb2dHdWlkZS5tZCMxNS1uZXR3b3JrYWJpbGl0eVxyXG4gICAqIG1hdGNoZXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9xdWlzcXVvdXMvY2FjdGJvdC9ibG9iL21haW4vZG9jcy9Mb2dHdWlkZS5tZCMxNi1uZXR3b3JrYW9lYWJpbGl0eVxyXG4gICAqL1xyXG4gIHN0YXRpYyBhYmlsaXR5RnVsbChwYXJhbXM/OiBOZXRQYXJhbXNbJ0FiaWxpdHknXSk6IENhY3Rib3RCYXNlUmVnRXhwPCdBYmlsaXR5Jz4ge1xyXG4gICAgcmV0dXJuIHBhcnNlSGVscGVyKHBhcmFtcywgJ2FiaWxpdHlGdWxsJywge1xyXG4gICAgICAwOiB7IGZpZWxkOiAndHlwZScsIHZhbHVlOiAnMlsxMl0nIH0sXHJcbiAgICAgIDE6IHsgZmllbGQ6ICd0aW1lc3RhbXAnIH0sXHJcbiAgICAgIDI6IHsgZmllbGQ6ICdzb3VyY2VJZCcgfSxcclxuICAgICAgMzogeyBmaWVsZDogJ3NvdXJjZScgfSxcclxuICAgICAgNDogeyBmaWVsZDogJ2lkJyB9LFxyXG4gICAgICA1OiB7IGZpZWxkOiAnYWJpbGl0eScgfSxcclxuICAgICAgNjogeyBmaWVsZDogJ3RhcmdldElkJyB9LFxyXG4gICAgICA3OiB7IGZpZWxkOiAndGFyZ2V0JyB9LFxyXG4gICAgICA4OiB7IGZpZWxkOiAnZmxhZ3MnIH0sXHJcbiAgICAgIDk6IHsgZmllbGQ6ICdkYW1hZ2UnIH0sXHJcbiAgICAgIDI0OiB7IGZpZWxkOiAndGFyZ2V0Q3VycmVudEhwJyB9LFxyXG4gICAgICAyNTogeyBmaWVsZDogJ3RhcmdldE1heEhwJyB9LFxyXG4gICAgICA0MDogeyBmaWVsZDogJ3gnIH0sXHJcbiAgICAgIDQxOiB7IGZpZWxkOiAneScgfSxcclxuICAgICAgNDI6IHsgZmllbGQ6ICd6JyB9LFxyXG4gICAgICA0MzogeyBmaWVsZDogJ2hlYWRpbmcnIH0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBtYXRjaGVzOiBodHRwczovL2dpdGh1Yi5jb20vcXVpc3F1b3VzL2NhY3Rib3QvYmxvYi9tYWluL2RvY3MvTG9nR3VpZGUubWQjMWItbmV0d29ya3RhcmdldGljb24taGVhZC1tYXJrZXJzXHJcbiAgICovXHJcbiAgc3RhdGljIGhlYWRNYXJrZXIocGFyYW1zPzogTmV0UGFyYW1zWydIZWFkTWFya2VyJ10pOiBDYWN0Ym90QmFzZVJlZ0V4cDwnSGVhZE1hcmtlcic+IHtcclxuICAgIHJldHVybiBwYXJzZUhlbHBlcihwYXJhbXMsICdoZWFkTWFya2VyJywge1xyXG4gICAgICAwOiB7IGZpZWxkOiAndHlwZScsIHZhbHVlOiAnMjcnIH0sXHJcbiAgICAgIDE6IHsgZmllbGQ6ICd0aW1lc3RhbXAnIH0sXHJcbiAgICAgIDI6IHsgZmllbGQ6ICd0YXJnZXRJZCcgfSxcclxuICAgICAgMzogeyBmaWVsZDogJ3RhcmdldCcgfSxcclxuICAgICAgNjogeyBmaWVsZDogJ2lkJyB9LFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogbWF0Y2hlczogaHR0cHM6Ly9naXRodWIuY29tL3F1aXNxdW91cy9jYWN0Ym90L2Jsb2IvbWFpbi9kb2NzL0xvZ0d1aWRlLm1kIzAzLWFkZGNvbWJhdGFudFxyXG4gICAqL1xyXG4gIHN0YXRpYyBhZGRlZENvbWJhdGFudChwYXJhbXM/OiBOZXRQYXJhbXNbJ0FkZGVkQ29tYmF0YW50J10pOiBDYWN0Ym90QmFzZVJlZ0V4cDwnQWRkZWRDb21iYXRhbnQnPiB7XHJcbiAgICByZXR1cm4gcGFyc2VIZWxwZXIocGFyYW1zLCAnYWRkZWRDb21iYXRhbnQnLCB7XHJcbiAgICAgIDA6IHsgZmllbGQ6ICd0eXBlJywgdmFsdWU6ICcwMycgfSxcclxuICAgICAgMTogeyBmaWVsZDogJ3RpbWVzdGFtcCcgfSxcclxuICAgICAgMjogeyBmaWVsZDogJ2lkJyB9LFxyXG4gICAgICAzOiB7IGZpZWxkOiAnbmFtZScgfSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIG1hdGNoZXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9xdWlzcXVvdXMvY2FjdGJvdC9ibG9iL21haW4vZG9jcy9Mb2dHdWlkZS5tZCMwMy1hZGRjb21iYXRhbnRcclxuICAgKi9cclxuICBzdGF0aWMgYWRkZWRDb21iYXRhbnRGdWxsKFxyXG4gICAgICBwYXJhbXM/OiBOZXRQYXJhbXNbJ0FkZGVkQ29tYmF0YW50J10sXHJcbiAgKTogQ2FjdGJvdEJhc2VSZWdFeHA8J0FkZGVkQ29tYmF0YW50Jz4ge1xyXG4gICAgcmV0dXJuIHBhcnNlSGVscGVyKHBhcmFtcywgJ2FkZGVkQ29tYmF0YW50RnVsbCcsIHtcclxuICAgICAgMDogeyBmaWVsZDogJ3R5cGUnLCB2YWx1ZTogJzAzJyB9LFxyXG4gICAgICAxOiB7IGZpZWxkOiAndGltZXN0YW1wJyB9LFxyXG4gICAgICAyOiB7IGZpZWxkOiAnaWQnIH0sXHJcbiAgICAgIDM6IHsgZmllbGQ6ICduYW1lJyB9LFxyXG4gICAgICA0OiB7IGZpZWxkOiAnam9iJyB9LFxyXG4gICAgICA1OiB7IGZpZWxkOiAnbGV2ZWwnIH0sXHJcbiAgICAgIDY6IHsgZmllbGQ6ICdvd25lcklkJyB9LFxyXG4gICAgICA4OiB7IGZpZWxkOiAnd29ybGQnIH0sXHJcbiAgICAgIDk6IHsgZmllbGQ6ICducGNOYW1lSWQnIH0sXHJcbiAgICAgIDEwOiB7IGZpZWxkOiAnbnBjQmFzZUlkJyB9LFxyXG4gICAgICAxMTogeyBmaWVsZDogJ2N1cnJlbnRIcCcgfSxcclxuICAgICAgMTI6IHsgZmllbGQ6ICdocCcgfSxcclxuICAgICAgMTc6IHsgZmllbGQ6ICd4JyB9LFxyXG4gICAgICAxODogeyBmaWVsZDogJ3knIH0sXHJcbiAgICAgIDE5OiB7IGZpZWxkOiAneicgfSxcclxuICAgICAgMjA6IHsgZmllbGQ6ICdoZWFkaW5nJyB9LFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogbWF0Y2hlczogaHR0cHM6Ly9naXRodWIuY29tL3F1aXNxdW91cy9jYWN0Ym90L2Jsb2IvbWFpbi9kb2NzL0xvZ0d1aWRlLm1kIzA0LXJlbW92ZWNvbWJhdGFudFxyXG4gICAqL1xyXG4gIHN0YXRpYyByZW1vdmluZ0NvbWJhdGFudChcclxuICAgICAgcGFyYW1zPzogTmV0UGFyYW1zWydSZW1vdmVkQ29tYmF0YW50J10sXHJcbiAgKTogQ2FjdGJvdEJhc2VSZWdFeHA8J1JlbW92ZWRDb21iYXRhbnQnPiB7XHJcbiAgICByZXR1cm4gcGFyc2VIZWxwZXIocGFyYW1zLCAncmVtb3ZpbmdDb21iYXRhbnQnLCB7XHJcbiAgICAgIDA6IHsgZmllbGQ6ICd0eXBlJywgdmFsdWU6ICcwNCcgfSxcclxuICAgICAgMTogeyBmaWVsZDogJ3RpbWVzdGFtcCcgfSxcclxuICAgICAgMjogeyBmaWVsZDogJ2lkJyB9LFxyXG4gICAgICAzOiB7IGZpZWxkOiAnbmFtZScgfSxcclxuICAgICAgMTI6IHsgZmllbGQ6ICdocCcgfSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIG1hdGNoZXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9xdWlzcXVvdXMvY2FjdGJvdC9ibG9iL21haW4vZG9jcy9Mb2dHdWlkZS5tZCMxYS1uZXR3b3JrYnVmZlxyXG4gICAqL1xyXG4gIHN0YXRpYyBnYWluc0VmZmVjdChwYXJhbXM/OiBOZXRQYXJhbXNbJ0dhaW5zRWZmZWN0J10pOiBDYWN0Ym90QmFzZVJlZ0V4cDwnR2FpbnNFZmZlY3QnPiB7XHJcbiAgICByZXR1cm4gcGFyc2VIZWxwZXIocGFyYW1zLCAnZ2FpbnNFZmZlY3QnLCB7XHJcbiAgICAgIDA6IHsgZmllbGQ6ICd0eXBlJywgdmFsdWU6ICcyNicgfSxcclxuICAgICAgMTogeyBmaWVsZDogJ3RpbWVzdGFtcCcgfSxcclxuICAgICAgMjogeyBmaWVsZDogJ2VmZmVjdElkJyB9LFxyXG4gICAgICAzOiB7IGZpZWxkOiAnZWZmZWN0JyB9LFxyXG4gICAgICA0OiB7IGZpZWxkOiAnZHVyYXRpb24nIH0sXHJcbiAgICAgIDU6IHsgZmllbGQ6ICdzb3VyY2VJZCcgfSxcclxuICAgICAgNjogeyBmaWVsZDogJ3NvdXJjZScgfSxcclxuICAgICAgNzogeyBmaWVsZDogJ3RhcmdldElkJyB9LFxyXG4gICAgICA4OiB7IGZpZWxkOiAndGFyZ2V0JyB9LFxyXG4gICAgICA5OiB7IGZpZWxkOiAnY291bnQnIH0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBQcmVmZXIgZ2FpbnNFZmZlY3Qgb3ZlciB0aGlzIGZ1bmN0aW9uIHVubGVzcyB5b3UgcmVhbGx5IG5lZWQgZXh0cmEgZGF0YS5cclxuICAgKiBtYXRjaGVzOiBodHRwczovL2dpdGh1Yi5jb20vcXVpc3F1b3VzL2NhY3Rib3QvYmxvYi9tYWluL2RvY3MvTG9nR3VpZGUubWQjMjYtbmV0d29ya3N0YXR1c2VmZmVjdHNcclxuICAgKi9cclxuICBzdGF0aWMgc3RhdHVzRWZmZWN0RXhwbGljaXQoXHJcbiAgICAgIHBhcmFtcz86IE5ldFBhcmFtc1snU3RhdHVzRWZmZWN0J10sXHJcbiAgKTogQ2FjdGJvdEJhc2VSZWdFeHA8J1N0YXR1c0VmZmVjdCc+IHtcclxuICAgIHJldHVybiBwYXJzZUhlbHBlcihwYXJhbXMsICdzdGF0dXNFZmZlY3RFeHBsaWNpdCcsIHtcclxuICAgICAgMDogeyBmaWVsZDogJ3R5cGUnLCB2YWx1ZTogJzM4JyB9LFxyXG4gICAgICAxOiB7IGZpZWxkOiAndGltZXN0YW1wJyB9LFxyXG4gICAgICAyOiB7IGZpZWxkOiAndGFyZ2V0SWQnIH0sXHJcbiAgICAgIDM6IHsgZmllbGQ6ICd0YXJnZXQnIH0sXHJcbiAgICAgIDU6IHsgZmllbGQ6ICdocCcgfSxcclxuICAgICAgNjogeyBmaWVsZDogJ21heEhwJyB9LFxyXG4gICAgICAxMTogeyBmaWVsZDogJ3gnIH0sXHJcbiAgICAgIDEyOiB7IGZpZWxkOiAneScgfSxcclxuICAgICAgMTM6IHsgZmllbGQ6ICd6JyB9LFxyXG4gICAgICAxNDogeyBmaWVsZDogJ2hlYWRpbmcnIH0sXHJcbiAgICAgIDE1OiB7IGZpZWxkOiAnZGF0YTAnIH0sXHJcbiAgICAgIDE2OiB7IGZpZWxkOiAnZGF0YTEnIH0sXHJcbiAgICAgIDE3OiB7IGZpZWxkOiAnZGF0YTInIH0sXHJcbiAgICAgIDE4OiB7IGZpZWxkOiAnZGF0YTMnIH0sXHJcbiAgICAgIDE5OiB7IGZpZWxkOiAnZGF0YTQnIH0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBtYXRjaGVzOiBodHRwczovL2dpdGh1Yi5jb20vcXVpc3F1b3VzL2NhY3Rib3QvYmxvYi9tYWluL2RvY3MvTG9nR3VpZGUubWQjMWUtbmV0d29ya2J1ZmZyZW1vdmVcclxuICAgKi9cclxuICBzdGF0aWMgbG9zZXNFZmZlY3QocGFyYW1zPzogTmV0UGFyYW1zWydMb3Nlc0VmZmVjdCddKTogQ2FjdGJvdEJhc2VSZWdFeHA8J0xvc2VzRWZmZWN0Jz4ge1xyXG4gICAgcmV0dXJuIHBhcnNlSGVscGVyKHBhcmFtcywgJ2xvc2VzRWZmZWN0Jywge1xyXG4gICAgICAwOiB7IGZpZWxkOiAndHlwZScsIHZhbHVlOiAnMzAnIH0sXHJcbiAgICAgIDE6IHsgZmllbGQ6ICd0aW1lc3RhbXAnIH0sXHJcbiAgICAgIDI6IHsgZmllbGQ6ICdlZmZlY3RJZCcgfSxcclxuICAgICAgMzogeyBmaWVsZDogJ2VmZmVjdCcgfSxcclxuICAgICAgNTogeyBmaWVsZDogJ3NvdXJjZUlkJyB9LFxyXG4gICAgICA2OiB7IGZpZWxkOiAnc291cmNlJyB9LFxyXG4gICAgICA3OiB7IGZpZWxkOiAndGFyZ2V0SWQnIH0sXHJcbiAgICAgIDg6IHsgZmllbGQ6ICd0YXJnZXQnIH0sXHJcbiAgICAgIDk6IHsgZmllbGQ6ICdjb3VudCcgfSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIG1hdGNoZXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9xdWlzcXVvdXMvY2FjdGJvdC9ibG9iL21haW4vZG9jcy9Mb2dHdWlkZS5tZCMyMy1uZXR3b3JrdGV0aGVyXHJcbiAgICovXHJcbiAgc3RhdGljIHRldGhlcihwYXJhbXM/OiBOZXRQYXJhbXNbJ1RldGhlciddKTogQ2FjdGJvdEJhc2VSZWdFeHA8J1RldGhlcic+IHtcclxuICAgIHJldHVybiBwYXJzZUhlbHBlcihwYXJhbXMsICd0ZXRoZXInLCB7XHJcbiAgICAgIDA6IHsgZmllbGQ6ICd0eXBlJywgdmFsdWU6ICczNScgfSxcclxuICAgICAgMTogeyBmaWVsZDogJ3RpbWVzdGFtcCcgfSxcclxuICAgICAgMjogeyBmaWVsZDogJ3NvdXJjZUlkJyB9LFxyXG4gICAgICAzOiB7IGZpZWxkOiAnc291cmNlJyB9LFxyXG4gICAgICA0OiB7IGZpZWxkOiAndGFyZ2V0SWQnIH0sXHJcbiAgICAgIDU6IHsgZmllbGQ6ICd0YXJnZXQnIH0sXHJcbiAgICAgIDg6IHsgZmllbGQ6ICdpZCcgfSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqICd0YXJnZXQnIHdhcyBkZWZlYXRlZCBieSAnc291cmNlJ1xyXG4gICAqIG1hdGNoZXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9xdWlzcXVvdXMvY2FjdGJvdC9ibG9iL21haW4vZG9jcy9Mb2dHdWlkZS5tZCMxOS1uZXR3b3JrZGVhdGhcclxuICAgKi9cclxuICBzdGF0aWMgd2FzRGVmZWF0ZWQocGFyYW1zPzogTmV0UGFyYW1zWydXYXNEZWZlYXRlZCddKTogQ2FjdGJvdEJhc2VSZWdFeHA8J1dhc0RlZmVhdGVkJz4ge1xyXG4gICAgcmV0dXJuIHBhcnNlSGVscGVyKHBhcmFtcywgJ3dhc0RlZmVhdGVkJywge1xyXG4gICAgICAwOiB7IGZpZWxkOiAndHlwZScsIHZhbHVlOiAnMjUnIH0sXHJcbiAgICAgIDE6IHsgZmllbGQ6ICd0aW1lc3RhbXAnIH0sXHJcbiAgICAgIDI6IHsgZmllbGQ6ICd0YXJnZXRJZCcgfSxcclxuICAgICAgMzogeyBmaWVsZDogJ3RhcmdldCcgfSxcclxuICAgICAgNDogeyBmaWVsZDogJ3NvdXJjZUlkJyB9LFxyXG4gICAgICA1OiB7IGZpZWxkOiAnc291cmNlJyB9LFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogbWF0Y2hlczogaHR0cHM6Ly9naXRodWIuY29tL3F1aXNxdW91cy9jYWN0Ym90L2Jsb2IvbWFpbi9kb2NzL0xvZ0d1aWRlLm1kIzAwLWxvZ2xpbmVcclxuICAgKi9cclxuICBzdGF0aWMgZWNobyhwYXJhbXM/OiBOZXRQYXJhbXNbJ0dhbWVMb2cnXSk6IENhY3Rib3RCYXNlUmVnRXhwPCdHYW1lTG9nJz4ge1xyXG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICd1bmRlZmluZWQnKVxyXG4gICAgICBwYXJhbXMgPSB7fTtcclxuICAgIFJlZ2V4ZXMudmFsaWRhdGVQYXJhbXMocGFyYW1zLCAnZWNobycsIFsndHlwZScsICd0aW1lc3RhbXAnLCAnY29kZScsICduYW1lJywgJ2xpbmUnLCAnY2FwdHVyZSddKTtcclxuICAgIHBhcmFtcy5jb2RlID0gJzAwMzgnO1xyXG4gICAgcmV0dXJuIE5ldFJlZ2V4ZXMuZ2FtZUxvZyhwYXJhbXMpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIG1hdGNoZXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9xdWlzcXVvdXMvY2FjdGJvdC9ibG9iL21haW4vZG9jcy9Mb2dHdWlkZS5tZCMwMC1sb2dsaW5lXHJcbiAgICovXHJcbiAgc3RhdGljIGRpYWxvZyhwYXJhbXM/OiBOZXRQYXJhbXNbJ0dhbWVMb2cnXSk6IENhY3Rib3RCYXNlUmVnRXhwPCdHYW1lTG9nJz4ge1xyXG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICd1bmRlZmluZWQnKVxyXG4gICAgICBwYXJhbXMgPSB7fTtcclxuICAgIFJlZ2V4ZXMudmFsaWRhdGVQYXJhbXMocGFyYW1zLCAnZGlhbG9nJywgWyd0eXBlJywgJ3RpbWVzdGFtcCcsICdjb2RlJywgJ25hbWUnLCAnbGluZScsICdjYXB0dXJlJ10pO1xyXG4gICAgcGFyYW1zLmNvZGUgPSAnMDA0NCc7XHJcbiAgICByZXR1cm4gTmV0UmVnZXhlcy5nYW1lTG9nKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogbWF0Y2hlczogaHR0cHM6Ly9naXRodWIuY29tL3F1aXNxdW91cy9jYWN0Ym90L2Jsb2IvbWFpbi9kb2NzL0xvZ0d1aWRlLm1kIzAwLWxvZ2xpbmVcclxuICAgKi9cclxuICBzdGF0aWMgbWVzc2FnZShwYXJhbXM/OiBOZXRQYXJhbXNbJ0dhbWVMb2cnXSk6IENhY3Rib3RCYXNlUmVnRXhwPCdHYW1lTG9nJz4ge1xyXG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICd1bmRlZmluZWQnKVxyXG4gICAgICBwYXJhbXMgPSB7fTtcclxuICAgIFJlZ2V4ZXMudmFsaWRhdGVQYXJhbXMocGFyYW1zLCAnbWVzc2FnZScsIFsndHlwZScsICd0aW1lc3RhbXAnLCAnY29kZScsICduYW1lJywgJ2xpbmUnLCAnY2FwdHVyZSddKTtcclxuICAgIHBhcmFtcy5jb2RlID0gJzA4MzknO1xyXG4gICAgcmV0dXJuIE5ldFJlZ2V4ZXMuZ2FtZUxvZyhwYXJhbXMpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIGZpZWxkczogY29kZSwgbmFtZSwgbGluZSwgY2FwdHVyZVxyXG4gICAqIG1hdGNoZXM6IGh0dHBzOi8vZ2l0aHViLmNvbS9xdWlzcXVvdXMvY2FjdGJvdC9ibG9iL21haW4vZG9jcy9Mb2dHdWlkZS5tZCMwMC1sb2dsaW5lXHJcbiAgICovXHJcbiAgc3RhdGljIGdhbWVMb2cocGFyYW1zPzogTmV0UGFyYW1zWydHYW1lTG9nJ10pOiBDYWN0Ym90QmFzZVJlZ0V4cDwnR2FtZUxvZyc+IHtcclxuICAgIHJldHVybiBwYXJzZUhlbHBlcihwYXJhbXMsICdnYW1lTG9nJywge1xyXG4gICAgICAwOiB7IGZpZWxkOiAndHlwZScsIHZhbHVlOiAnMDAnIH0sXHJcbiAgICAgIDE6IHsgZmllbGQ6ICd0aW1lc3RhbXAnIH0sXHJcbiAgICAgIDI6IHsgZmllbGQ6ICdjb2RlJyB9LFxyXG4gICAgICAzOiB7IGZpZWxkOiAnbmFtZScgfSxcclxuICAgICAgNDogeyBmaWVsZDogJ2xpbmUnIH0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBtYXRjaGVzOiBodHRwczovL2dpdGh1Yi5jb20vcXVpc3F1b3VzL2NhY3Rib3QvYmxvYi9tYWluL2RvY3MvTG9nR3VpZGUubWQjMDAtbG9nbGluZVxyXG4gICAqL1xyXG4gIHN0YXRpYyBnYW1lTmFtZUxvZyhwYXJhbXM/OiBOZXRQYXJhbXNbJ0dhbWVMb2cnXSk6IENhY3Rib3RCYXNlUmVnRXhwPCdHYW1lTG9nJz4ge1xyXG4gICAgLy8gZm9yIGNvbXBhdCB3aXRoIFJlZ2V4ZXMuXHJcbiAgICByZXR1cm4gTmV0UmVnZXhlcy5nYW1lTG9nKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogbWF0Y2hlczogaHR0cHM6Ly9naXRodWIuY29tL3F1aXNxdW91cy9jYWN0Ym90L2Jsb2IvbWFpbi9kb2NzL0xvZ0d1aWRlLm1kIzBjLXBsYXllcnN0YXRzXHJcbiAgICovXHJcbiAgc3RhdGljIHN0YXRDaGFuZ2UocGFyYW1zPzogTmV0UGFyYW1zWydQbGF5ZXJTdGF0cyddKTogQ2FjdGJvdEJhc2VSZWdFeHA8J1BsYXllclN0YXRzJz4ge1xyXG4gICAgcmV0dXJuIHBhcnNlSGVscGVyKHBhcmFtcywgJ3N0YXRDaGFuZ2UnLCB7XHJcbiAgICAgIDA6IHsgZmllbGQ6ICd0eXBlJywgdmFsdWU6ICcxMicgfSxcclxuICAgICAgMTogeyBmaWVsZDogJ3RpbWVzdGFtcCcgfSxcclxuICAgICAgMjogeyBmaWVsZDogJ2pvYicgfSxcclxuICAgICAgMzogeyBmaWVsZDogJ3N0cmVuZ3RoJyB9LFxyXG4gICAgICA0OiB7IGZpZWxkOiAnZGV4dGVyaXR5JyB9LFxyXG4gICAgICA1OiB7IGZpZWxkOiAndml0YWxpdHknIH0sXHJcbiAgICAgIDY6IHsgZmllbGQ6ICdpbnRlbGxpZ2VuY2UnIH0sXHJcbiAgICAgIDc6IHsgZmllbGQ6ICdtaW5kJyB9LFxyXG4gICAgICA4OiB7IGZpZWxkOiAncGlldHknIH0sXHJcbiAgICAgIDk6IHsgZmllbGQ6ICdhdHRhY2tQb3dlcicgfSxcclxuICAgICAgMTA6IHsgZmllbGQ6ICdkaXJlY3RIaXQnIH0sXHJcbiAgICAgIDExOiB7IGZpZWxkOiAnY3JpdGljYWxIaXQnIH0sXHJcbiAgICAgIDEyOiB7IGZpZWxkOiAnYXR0YWNrTWFnaWNQb3RlbmN5JyB9LFxyXG4gICAgICAxMzogeyBmaWVsZDogJ2hlYWxNYWdpY1BvdGVuY3knIH0sXHJcbiAgICAgIDE0OiB7IGZpZWxkOiAnZGV0ZXJtaW5hdGlvbicgfSxcclxuICAgICAgMTU6IHsgZmllbGQ6ICdza2lsbFNwZWVkJyB9LFxyXG4gICAgICAxNjogeyBmaWVsZDogJ3NwZWxsU3BlZWQnIH0sXHJcbiAgICAgIDE4OiB7IGZpZWxkOiAndGVuYWNpdHknIH0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBtYXRjaGVzOiBodHRwczovL2dpdGh1Yi5jb20vcXVpc3F1b3VzL2NhY3Rib3QvYmxvYi9tYWluL2RvY3MvTG9nR3VpZGUubWQjMDEtY2hhbmdlem9uZVxyXG4gICAqL1xyXG4gIHN0YXRpYyBjaGFuZ2Vab25lKHBhcmFtcz86IE5ldFBhcmFtc1snQ2hhbmdlWm9uZSddKTogQ2FjdGJvdEJhc2VSZWdFeHA8J0NoYW5nZVpvbmUnPiB7XHJcbiAgICByZXR1cm4gcGFyc2VIZWxwZXIocGFyYW1zLCAnY2hhbmdlWm9uZScsIHtcclxuICAgICAgMDogeyBmaWVsZDogJ3R5cGUnLCB2YWx1ZTogJzAxJyB9LFxyXG4gICAgICAxOiB7IGZpZWxkOiAndGltZXN0YW1wJyB9LFxyXG4gICAgICAyOiB7IGZpZWxkOiAnaWQnIH0sXHJcbiAgICAgIDM6IHsgZmllbGQ6ICduYW1lJyB9LFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogbWF0Y2hlczogaHR0cHM6Ly9naXRodWIuY29tL3F1aXNxdW91cy9jYWN0Ym90L2Jsb2IvbWFpbi9kb2NzL0xvZ0d1aWRlLm1kIzIxLW5ldHdvcms2ZC1hY3Rvci1jb250cm9sLWxpbmVzXHJcbiAgICovXHJcbiAgc3RhdGljIG5ldHdvcms2ZChwYXJhbXM/OiBOZXRQYXJhbXNbJ0FjdG9yQ29udHJvbCddKTogQ2FjdGJvdEJhc2VSZWdFeHA8J0FjdG9yQ29udHJvbCc+IHtcclxuICAgIHJldHVybiBwYXJzZUhlbHBlcihwYXJhbXMsICduZXR3b3JrNmQnLCB7XHJcbiAgICAgIDA6IHsgZmllbGQ6ICd0eXBlJywgdmFsdWU6ICczMycgfSxcclxuICAgICAgMTogeyBmaWVsZDogJ3RpbWVzdGFtcCcgfSxcclxuICAgICAgMjogeyBmaWVsZDogJ2luc3RhbmNlJyB9LFxyXG4gICAgICAzOiB7IGZpZWxkOiAnY29tbWFuZCcgfSxcclxuICAgICAgNDogeyBmaWVsZDogJ2RhdGEwJyB9LFxyXG4gICAgICA1OiB7IGZpZWxkOiAnZGF0YTEnIH0sXHJcbiAgICAgIDY6IHsgZmllbGQ6ICdkYXRhMicgfSxcclxuICAgICAgNzogeyBmaWVsZDogJ2RhdGEzJyB9LFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBtYXRjaGVzOiBodHRwczovL2dpdGh1Yi5jb20vcXVpc3F1b3VzL2NhY3Rib3QvYmxvYi9tYWluL2RvY3MvTG9nR3VpZGUubWQjMjItbmV0d29ya25hbWV0b2dnbGVcclxuICAgKi9cclxuICBzdGF0aWMgbmFtZVRvZ2dsZShwYXJhbXM/OiBOZXRQYXJhbXNbJ05hbWVUb2dnbGUnXSk6IENhY3Rib3RCYXNlUmVnRXhwPCdOYW1lVG9nZ2xlJz4ge1xyXG4gICAgcmV0dXJuIHBhcnNlSGVscGVyKHBhcmFtcywgJ25hbWVUb2dnbGUnLCB7XHJcbiAgICAgIDA6IHsgZmllbGQ6ICd0eXBlJywgdmFsdWU6ICczNCcgfSxcclxuICAgICAgMTogeyBmaWVsZDogJ3RpbWVzdGFtcCcgfSxcclxuICAgICAgMjogeyBmaWVsZDogJ2lkJyB9LFxyXG4gICAgICAzOiB7IGZpZWxkOiAnbmFtZScgfSxcclxuICAgICAgNjogeyBmaWVsZDogJ3RvZ2dsZScgfSxcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBMYW5nIH0gZnJvbSAnLi9sYW5ndWFnZXMnO1xyXG5pbXBvcnQgUmVnZXhlcyBmcm9tICcuL3JlZ2V4ZXMnO1xyXG5pbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgeyBDYWN0Ym90QmFzZVJlZ0V4cCB9IGZyb20gJy4uL3R5cGVzL25ldF90cmlnZ2VyJztcclxuXHJcbi8vIEZpbGwgaW4gTG9jYWxlUmVnZXggc28gdGhhdCB0aGluZ3MgbGlrZSBMb2NhbGVSZWdleC5jb3VudGRvd25TdGFydC5kZSBpcyBhIHZhbGlkIHJlZ2V4LlxyXG5jb25zdCBsb2NhbGVMaW5lcyA9IHtcclxuICBjb3VudGRvd25TdGFydDoge1xyXG4gICAgZW46ICdCYXR0bGUgY29tbWVuY2luZyBpbiAoPzx0aW1lPlxcXFx5e0Zsb2F0fSkgc2Vjb25kcyEgXFxcXCgoPzxwbGF5ZXI+Lio/KVxcXFwpJyxcclxuICAgIGRlOiAnTm9jaCAoPzx0aW1lPlxcXFx5e0Zsb2F0fSkgU2VrdW5kZW4gYmlzIEthbXBmYmVnaW5uISBcXFxcKCg/PHBsYXllcj4uKj8pXFxcXCknLFxyXG4gICAgZnI6ICdEw6lidXQgZHUgY29tYmF0IGRhbnMgKD88dGltZT5cXFxceXtGbG9hdH0pIHNlY29uZGVzWyBdPyEgXFxcXCgoPzxwbGF5ZXI+Lio/KVxcXFwpJyxcclxuICAgIGphOiAn5oim6ZeY6ZaL5aeL44G+44GnKD88dGltZT5cXFxceXtGbG9hdH0p56eS77yBIFxcXFwoKD88cGxheWVyPi4qPylcXFxcKScsXHJcbiAgICBjbjogJ+i3neemu+aImOaWl+W8gOWni+i/mOaciSg/PHRpbWU+XFxcXHl7RmxvYXR9Keenku+8gSDvvIgoPzxwbGF5ZXI+Lio/Ke+8iScsXHJcbiAgICBrbzogJ+yghO2IrCDsi5zsnpEgKD88dGltZT5cXFxceXtGbG9hdH0p7LSIIOyghCEgXFxcXCgoPzxwbGF5ZXI+Lio/KVxcXFwpJyxcclxuICB9LFxyXG4gIGNvdW50ZG93bkVuZ2FnZToge1xyXG4gICAgZW46ICdFbmdhZ2UhJyxcclxuICAgIGRlOiAnU3RhcnQhJyxcclxuICAgIGZyOiAnw4AgbFxcJ2F0dGFxdWVbIF0/IScsXHJcbiAgICBqYTogJ+aIpumXmOmWi+Wni++8gScsXHJcbiAgICBjbjogJ+aImOaWl+W8gOWni++8gScsXHJcbiAgICBrbzogJ+yghO2IrCDsi5zsnpEhJyxcclxuICB9LFxyXG4gIGNvdW50ZG93bkNhbmNlbDoge1xyXG4gICAgZW46ICdDb3VudGRvd24gY2FuY2VsZWQgYnkgKD88cGxheWVyPlxcXFx5e05hbWV9KScsXHJcbiAgICBkZTogJyg/PHBsYXllcj5cXFxceXtOYW1lfSkgaGF0IGRlbiBDb3VudGRvd24gYWJnZWJyb2NoZW4nLFxyXG4gICAgZnI6ICdMZSBjb21wdGUgw6AgcmVib3VycyBhIMOpdMOpIGludGVycm9tcHUgcGFyICg/PHBsYXllcj5cXFxceXtOYW1lfSlbIF0/XFxcXC4nLFxyXG4gICAgamE6ICcoPzxwbGF5ZXI+XFxcXHl7TmFtZX0p44Gr44KI44KK44CB5oim6ZeY6ZaL5aeL44Kr44Km44Oz44OI44GM44Kt44Oj44Oz44K744Or44GV44KM44G+44GX44Gf44CCJyxcclxuICAgIGNuOiAnKD88cGxheWVyPlxcXFx5e05hbWV9KeWPlua2iOS6huaImOaWl+W8gOWni+WAkuiuoeaXtuOAgicsXHJcbiAgICBrbzogJyg/PHBsYXllcj5cXFxceXtOYW1lfSkg64uY7J20IOy0iOydveq4sOulvCDst6jshoztlojsirXri4jri6RcXFxcLicsXHJcbiAgfSxcclxuICBhcmVhU2VhbDoge1xyXG4gICAgZW46ICcoPzxhcmVhPi4qPykgd2lsbCBiZSBzZWFsZWQgb2ZmIGluICg/PHRpbWU+XFxcXHl7RmxvYXR9KSBzZWNvbmRzIScsXHJcbiAgICBkZTogJ05vY2ggKD88dGltZT5cXFxceXtGbG9hdH0pIFNla3VuZGVuLCBiaXMgc2ljaCAoPzxhcmVhPi4qPykgc2NobGllw590JyxcclxuICAgIGZyOiAnRmVybWV0dXJlICg/PGFyZWE+Lio/KSBkYW5zICg/PHRpbWU+XFxcXHl7RmxvYXR9KSBzZWNvbmRlc1sgXT9cXFxcLicsXHJcbiAgICBqYTogJyg/PGFyZWE+Lio/KeOBruWwgemOluOBvuOBp+OBguOBqCg/PHRpbWU+XFxcXHl7RmxvYXR9KeenkicsXHJcbiAgICBjbjogJ+i3nSg/PGFyZWE+Lio/Keiiq+WwgemUgei/mOaciSg/PHRpbWU+XFxcXHl7RmxvYXR9KeenkicsXHJcbiAgICBrbzogJyg/PHRpbWU+XFxcXHl7RmxvYXR9Key0iCDtm4Tsl5AgKD88YXJlYT4uKj8pKOydtHzqsIApIOu0ieyHhOuQqeuLiOuLpFxcXFwuJyxcclxuICB9LFxyXG4gIGFyZWFVbnNlYWw6IHtcclxuICAgIGVuOiAnKD88YXJlYT4uKj8pIGlzIG5vIGxvbmdlciBzZWFsZWQuJyxcclxuICAgIGRlOiAnKD88YXJlYT4uKj8pIMO2ZmZuZXQgc2ljaCBlcm5ldXQuJyxcclxuICAgIGZyOiAnT3V2ZXJ0dXJlICg/PGFyZWE+Lio/KVsgXT8hJyxcclxuICAgIGphOiAnKD88YXJlYT4uKj8p44Gu5bCB6Y6W44GM6Kej44GL44KM44Gf4oCm4oCmJyxcclxuICAgIGNuOiAnKD88YXJlYT4uKj8p55qE5bCB6ZSB6Kej6Zmk5LqGJyxcclxuICAgIGtvOiAnKD88YXJlYT4uKj8p7J2YIOu0ieyHhOqwgCDtlbTsoJzrkJjsl4jsirXri4jri6RcXFxcLicsXHJcbiAgfSxcclxuICAvLyBSZWNpcGUgbmFtZSBhbHdheXMgc3RhcnQgd2l0aCBcXHVlMGJiXHJcbiAgLy8gSFEgaWNvbiBpcyBcXHVlMDNjXHJcbiAgY3JhZnRpbmdTdGFydDoge1xyXG4gICAgZW46ICdZb3UgYmVnaW4gc3ludGhlc2l6aW5nICg/PGNvdW50Pihhbj98XFxcXGQrKSApP1xcdWUwYmIoPzxyZWNpcGU+LiopXFxcXC4nLFxyXG4gICAgZGU6ICdEdSBoYXN0IGJlZ29ubmVuLCBkdXJjaCBTeW50aGVzZSAoPzxjb3VudD4oZWluKGV8ZXN8ZW18ZXIpP3xcXFxcZCspICk/XFx1ZTBiYig/PHJlY2lwZT4uKikgaGVyenVzdGVsbGVuXFxcXC4nLFxyXG4gICAgZnI6ICdWb3VzIGNvbW1lbmNleiDDoCBmYWJyaXF1ZXIgKD88Y291bnQ+KHVuZT98XFxcXGQrKSApP1xcdWUwYmIoPzxyZWNpcGU+LiopXFxcXC4nLFxyXG4gICAgamE6ICcoPzxwbGF5ZXI+XFxcXHl7TmFtZX0p44GvXFx1ZTBiYig/PHJlY2lwZT4uKikow5coPzxjb3VudD5cXFxcZCspKT/jga7oo73kvZzjgpLplovlp4vjgZfjgZ/jgIInLFxyXG4gICAgY246ICcoPzxwbGF5ZXI+XFxcXHl7TmFtZX0p5byA5aeL5Yi25L2c4oCcXFx1ZTBiYig/PHJlY2lwZT4uKinigJ0ow5coPzxjb3VudD5cXFxcZCspKT/jgIInLFxyXG4gICAga286ICdcXHVlMGJiKD88cmVjaXBlPi4qKSjDlyg/PGNvdW50PlxcXFxkKynqsJwpPyDsoJzsnpHsnYQg7Iuc7J6R7ZWp64uI64ukXFxcXC4nLFxyXG4gIH0sXHJcbiAgdHJpYWxDcmFmdGluZ1N0YXJ0OiB7XHJcbiAgICBlbjogJ1lvdSBiZWdpbiB0cmlhbCBzeW50aGVzaXMgb2YgXFx1ZTBiYig/PHJlY2lwZT4uKilcXFxcLicsXHJcbiAgICBkZTogJ0R1IGhhc3QgbWl0IGRlciBUZXN0c3ludGhlc2Ugdm9uIFxcdWUwYmIoPzxyZWNpcGU+LiopIGJlZ29ubmVuXFxcXC4nLFxyXG4gICAgZnI6ICdWb3VzIGNvbW1lbmNleiB1bmUgc3ludGjDqHNlIGRcXCdlc3NhaSBwb3VyIHVuZT8gXFx1ZTBiYig/PHJlY2lwZT4uKilcXFxcLicsXHJcbiAgICBqYTogJyg/PHBsYXllcj5cXFxceXtOYW1lfSnjga9cXHVlMGJiKD88cmVjaXBlPi4qKeOBruijveS9nOe3tOe/kuOCkumWi+Wni+OBl+OBn+OAgicsXHJcbiAgICBjbjogJyg/PHBsYXllcj5cXFxceXtOYW1lfSnlvIDlp4vnu4PkuaDliLbkvZxcXHVlMGJiKD88cmVjaXBlPi4qKeOAgicsXHJcbiAgICBrbzogJ1xcdWUwYmIoPzxyZWNpcGU+LiopIOygnOyekSDsl7DsirXsnYQg7Iuc7J6R7ZWp64uI64ukXFxcXC4nLFxyXG4gIH0sXHJcbiAgY3JhZnRpbmdGaW5pc2g6IHtcclxuICAgIGVuOiAnWW91IHN5bnRoZXNpemUgKD88Y291bnQ+KGFuP3xcXFxcZCspICk/XFx1ZTBiYig/PHJlY2lwZT4uKikoXFx1ZTAzYyk/XFxcXC4nLFxyXG4gICAgZGU6ICdEdSBoYXN0IGVyZm9sZ3JlaWNoICg/PGNvdW50PihlaW4oZXxlc3xlbXxlcik/fFxcXFxkKykgKT8oPzxyZWNpcGU+LiopKFxcdWUwM2MpPyBoZXJnZXN0ZWxsdFxcXFwuJyxcclxuICAgIGZyOiAnVm91cyBmYWJyaXF1ZXogKD88Y291bnQ+KHVuZT98XFxcXGQrKSApP1xcdWUwYmIoPzxyZWNpcGU+LiopKFxcdWUwM2MpP1xcXFwuJyxcclxuICAgIGphOiAnKD88cGxheWVyPlxcXFx5e05hbWV9KeOBr1xcdWUwYmIoPzxyZWNpcGU+LiopKFxcdWUwM2MpPyjDlyg/PGNvdW50PlxcXFxkKykpP+OCkuWujOaIkOOBleOBm+OBn++8gScsXHJcbiAgICBjbjogJyg/PHBsYXllcj5cXFxceXtOYW1lfSnliLbkvZzigJxcXHVlMGJiKD88cmVjaXBlPi4qKShcXHVlMDNjKT/igJ0ow5coPzxjb3VudD5cXFxcZCspKT/miJDlip/vvIEnLFxyXG4gICAga286ICcoPzxwbGF5ZXI+XFxcXHl7TmFtZX0pIOuLmOydtCBcXHVlMGJiKD88cmVjaXBlPi4qKShcXHVlMDNjKT8ow5coPzxjb3VudD5cXFxcZCsp6rCcKT8o7J2EfOulvCkg7JmE7ISx7ZaI7Iq164uI64ukIScsXHJcbiAgfSxcclxuICB0cmlhbENyYWZ0aW5nRmluaXNoOiB7XHJcbiAgICBlbjogJ1lvdXIgdHJpYWwgc3ludGhlc2lzIG9mIFxcdWUwYmIoPzxyZWNpcGU+LiopIHByb3ZlZCBhIHN1Y2Nlc3MhJyxcclxuICAgIGRlOiAnRGllIFRlc3RzeW50aGVzZSB2b24gXFx1ZTBiYig/PHJlY2lwZT4uKikgd2FyIGVyZm9sZ3JlaWNoIScsXHJcbiAgICBmcjogJ1ZvdHJlIHN5bnRow6hzZSBkXFwnZXNzYWkgcG91ciBmYWJyaXF1ZXIgXFx1ZTBiYig/PHJlY2lwZT4uKikgYSDDqXTDqSBjb3Vyb25uw6llIGRlIHN1Y2PDqHMhJyxcclxuICAgIGphOiAnKD88cGxheWVyPlxcXFx5e05hbWV9KeOBr1xcdWUwYmIoPzxyZWNpcGU+Liop44Gu6KO95L2c57e057+S44Gr5oiQ5Yqf44GX44Gf77yBJyxcclxuICAgIGNuOiAnKD88cGxheWVyPlxcXFx5e05hbWV9Kee7g+S5oOWItuS9nFxcdWUwYmIoPzxyZWNpcGU+Liop5oiQ5Yqf5LqG77yBJyxcclxuICAgIGtvOiAnXFx1ZTBiYig/PHJlY2lwZT4uKikg7KCc7J6RIOyXsOyKteyXkCDshLHqs7XtlojsirXri4jri6QhJyxcclxuICB9LFxyXG4gIGNyYWZ0aW5nRmFpbDoge1xyXG4gICAgZW46ICdZb3VyIHN5bnRoZXNpcyBmYWlscyEnLFxyXG4gICAgZGU6ICdEZWluZSBTeW50aGVzZSBpc3QgZmVobGdlc2NobGFnZW4hJyxcclxuICAgIGZyOiAnTGEgc3ludGjDqHNlIMOpY2hvdWVcXFxcLnszfScsXHJcbiAgICBqYTogJyg/PHBsYXllcj5cXFxceXtOYW1lfSnjga/oo73kvZzjgavlpLHmlZfjgZfjgZ/igKbigKYnLFxyXG4gICAgY246ICcoPzxwbGF5ZXI+XFxcXHl7TmFtZX0p5Yi25L2c5aSx6LSl5LqG4oCm4oCmJyxcclxuICAgIGtvOiAn7KCc7J6R7JeQIOyLpO2MqO2WiOyKteuLiOuLpOKApuKAplxcXFwuJyxcclxuICB9LFxyXG4gIHRyaWFsQ3JhZnRpbmdGYWlsOiB7XHJcbiAgICBlbjogJ1lvdXIgdHJpYWwgc3ludGhlc2lzIG9mIFxcdWUwYmIoPzxyZWNpcGU+LiopIGZhaWxlZFxcXFwuezN9JyxcclxuICAgIGRlOiAnRGllIFRlc3RzeW50aGVzZSB2b24gXFx1ZTBiYig/PHJlY2lwZT4uKikgaXN0IGZlaGxnZXNjaGxhZ2VuXFxcXC57M30nLFxyXG4gICAgZnI6ICdWb3RyZSBzeW50aMOoc2UgZFxcJ2Vzc2FpIHBvdXIgZmFicmlxdWVyIFxcdWUwYmIoPzxyZWNpcGU+LiopIHNcXCdlc3Qgc29sZMOpZSBwYXIgdW4gw6ljaGVjXFxcXC57M30nLFxyXG4gICAgamE6ICcoPzxwbGF5ZXI+XFxcXHl7TmFtZX0p44GvXFx1ZTBiYig/PHJlY2lwZT4uKinjga7oo73kvZznt7Tnv5LjgavlpLHmlZfjgZfjgZ/igKbigKYnLFxyXG4gICAgY246ICcoPzxwbGF5ZXI+XFxcXHl7TmFtZX0p57uD5Lmg5Yi25L2cXFx1ZTBiYig/PHJlY2lwZT4uKinlpLHotKXkuobigKbigKYnLFxyXG4gICAga286ICdcXHVlMGJiKD88cmVjaXBlPi4qKSDsoJzsnpEg7Jew7Iq17JeQIOyLpO2MqO2WiOyKteuLiOuLpOKApuKAplxcXFwuJyxcclxuICB9LFxyXG4gIGNyYWZ0aW5nQ2FuY2VsOiB7XHJcbiAgICBlbjogJ1lvdSBjYW5jZWwgdGhlIHN5bnRoZXNpc1xcXFwuJyxcclxuICAgIGRlOiAnRHUgaGFzdCBkaWUgU3ludGhlc2UgYWJnZWJyb2NoZW5cXFxcLicsXHJcbiAgICBmcjogJ0xhIHN5bnRow6hzZSBlc3QgYW5udWzDqWVcXFxcLicsXHJcbiAgICBqYTogJyg/PHBsYXllcj5cXFxceXtOYW1lfSnjga/oo73kvZzjgpLkuK3mraLjgZfjgZ/jgIInLFxyXG4gICAgY246ICcoPzxwbGF5ZXI+XFxcXHl7TmFtZX0p5Lit5q2i5LqG5Yi25L2c5L2c5Lia44CCJyxcclxuICAgIGtvOiAn7KCc7J6R7J2EIOykkeyngO2WiOyKteuLiOuLpFxcXFwuJyxcclxuICB9LFxyXG4gIHRyaWFsQ3JhZnRpbmdDYW5jZWw6IHtcclxuICAgIGVuOiAnWW91IGFiYW5kb25lZCB0cmlhbCBzeW50aGVzaXNcXFxcLicsXHJcbiAgICBkZTogJ1Rlc3RzeW50aGVzZSBhYmdlYnJvY2hlblxcXFwuJyxcclxuICAgIGZyOiAnVm91cyBhdmV6IGludGVycm9tcHUgbGEgc3ludGjDqHNlIGRcXCdlc3NhaVxcXFwuJyxcclxuICAgIGphOiAnKD88cGxheWVyPlxcXFx5e05hbWV9KeOBr+ijveS9nOe3tOe/kuOCkuS4reatouOBl+OBn+OAgicsXHJcbiAgICBjbjogJyg/PHBsYXllcj5cXFxceXtOYW1lfSnlgZzmraLkuobnu4PkuaDjgIInLFxyXG4gICAga286ICfsoJzsnpEg7Jew7Iq17J2EIOykkeyngO2WiOyKteuLiOuLpFxcXFwuJyxcclxuICB9LFxyXG59IGFzIGNvbnN0O1xyXG5cclxudHlwZSBMb2NhbGVMaW5lID0geyBlbjogc3RyaW5nIH0gJiBQYXJ0aWFsPFJlY29yZDxFeGNsdWRlPExhbmcsICdlbic+LCBzdHJpbmc+PjtcclxuXHJcbnR5cGUgTG9jYWxlUmVnZXhlc09iaiA9IFJlY29yZDxrZXlvZiB0eXBlb2YgbG9jYWxlTGluZXMsIFJlY29yZDxMYW5nLCBSZWdFeHA+PjtcclxuXHJcbmNsYXNzIFJlZ2V4U2V0IHtcclxuICByZWdleGVzPzogTG9jYWxlUmVnZXhlc09iajtcclxuICBuZXRSZWdleGVzPzogTG9jYWxlUmVnZXhlc09iajtcclxuXHJcbiAgZ2V0IGxvY2FsZVJlZ2V4KCk6IExvY2FsZVJlZ2V4ZXNPYmoge1xyXG4gICAgaWYgKHRoaXMucmVnZXhlcylcclxuICAgICAgcmV0dXJuIHRoaXMucmVnZXhlcztcclxuICAgIHRoaXMucmVnZXhlcyA9IHRoaXMuYnVpbGRMb2NhbGVSZWdleGVzKGxvY2FsZUxpbmVzLCAoczogc3RyaW5nKSA9PiBSZWdleGVzLmdhbWVMb2coeyBsaW5lOiBzICsgJy4qPycgfSkpO1xyXG4gICAgcmV0dXJuIHRoaXMucmVnZXhlcztcclxuICB9XHJcblxyXG4gIGdldCBsb2NhbGVOZXRSZWdleCgpOiBMb2NhbGVSZWdleGVzT2JqIHtcclxuICAgIGlmICh0aGlzLm5ldFJlZ2V4ZXMpXHJcbiAgICAgIHJldHVybiB0aGlzLm5ldFJlZ2V4ZXM7XHJcbiAgICB0aGlzLm5ldFJlZ2V4ZXMgPSB0aGlzLmJ1aWxkTG9jYWxlUmVnZXhlcyhsb2NhbGVMaW5lcywgKHM6IHN0cmluZykgPT4gTmV0UmVnZXhlcy5nYW1lTG9nKHsgbGluZTogcyArICdbXnxdKj8nIH0pKTtcclxuICAgIHJldHVybiB0aGlzLm5ldFJlZ2V4ZXM7XHJcbiAgfVxyXG5cclxuICBidWlsZExvY2FsZVJlZ2V4ZXMoXHJcbiAgICAgIGxvY2FsZXM6IHR5cGVvZiBsb2NhbGVMaW5lcyxcclxuICAgICAgYnVpbGRlcjogKHM6IHN0cmluZykgPT4gQ2FjdGJvdEJhc2VSZWdFeHA8J0dhbWVMb2cnPiB8IFJlZ0V4cCxcclxuICApOiBMb2NhbGVSZWdleGVzT2JqIHtcclxuICAgIHJldHVybiBPYmplY3QuZnJvbUVudHJpZXMoXHJcbiAgICAgICAgT2JqZWN0XHJcbiAgICAgICAgICAuZW50cmllcyhsb2NhbGVzKVxyXG4gICAgICAgICAgLm1hcCgoW2tleSwgbGluZXNdKSA9PiBba2V5LCB0aGlzLmJ1aWxkTG9jYWxlUmVnZXgobGluZXMsIGJ1aWxkZXIpXSksXHJcbiAgICApIGFzIExvY2FsZVJlZ2V4ZXNPYmo7XHJcbiAgfVxyXG5cclxuICBidWlsZExvY2FsZVJlZ2V4KGxpbmVzOiBMb2NhbGVMaW5lLFxyXG4gICAgICBidWlsZGVyOiAoczogc3RyaW5nKSA9PiBDYWN0Ym90QmFzZVJlZ0V4cDwnR2FtZUxvZyc+IHwgUmVnRXhwLFxyXG4gICk6IFJlY29yZDxMYW5nLCBDYWN0Ym90QmFzZVJlZ0V4cDwnR2FtZUxvZyc+IHwgUmVnRXhwPiB7XHJcbiAgICBjb25zdCByZWdleEVuID0gYnVpbGRlcihsaW5lcy5lbik7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBlbjogcmVnZXhFbixcclxuICAgICAgZGU6IGxpbmVzLmRlID8gYnVpbGRlcihsaW5lcy5kZSkgOiByZWdleEVuLFxyXG4gICAgICBmcjogbGluZXMuZnIgPyBidWlsZGVyKGxpbmVzLmZyKSA6IHJlZ2V4RW4sXHJcbiAgICAgIGphOiBsaW5lcy5qYSA/IGJ1aWxkZXIobGluZXMuamEpIDogcmVnZXhFbixcclxuICAgICAgY246IGxpbmVzLmNuID8gYnVpbGRlcihsaW5lcy5jbikgOiByZWdleEVuLFxyXG4gICAgICBrbzogbGluZXMua28gPyBidWlsZGVyKGxpbmVzLmtvKSA6IHJlZ2V4RW4sXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgcmVnZXhTZXQgPSBuZXcgUmVnZXhTZXQoKTtcclxuXHJcbmV4cG9ydCBjb25zdCBMb2NhbGVSZWdleCA9IHJlZ2V4U2V0LmxvY2FsZVJlZ2V4O1xyXG5leHBvcnQgY29uc3QgTG9jYWxlTmV0UmVnZXggPSByZWdleFNldC5sb2NhbGVOZXRSZWdleDtcclxuIiwiaW1wb3J0IHsgTG9jYWxlTmV0UmVnZXggfSBmcm9tICcuLi8uLi8uLi9yZXNvdXJjZXMvdHJhbnNsYXRpb25zJztcclxuaW1wb3J0IE5ldFJlZ2V4ZXMgZnJvbSAnLi4vLi4vLi4vcmVzb3VyY2VzL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgeyBMYW5nIH0gZnJvbSAnLi4vLi4vLi4vcmVzb3VyY2VzL2xhbmd1YWdlcyc7XHJcbmltcG9ydCB7IENhY3Rib3RCYXNlUmVnRXhwLCBDYWN0Ym90UmVnRXhwRXhlY0FycmF5LCBUcmlnZ2VyVHlwZXMgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9uZXRfdHJpZ2dlcic7XHJcblxyXG4vLyBEaXNhYmxlIG5vLWV4cGxpY2l0LWFueSBmb3IgY2xvbmVEYXRhIGFzIGl0IG5lZWRzIHRvIHdvcmsgb24gcmF3IG9iamVjdHMgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMuXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbmV4cG9ydCB0eXBlIERhdGFUeXBlID0geyBba2V5OiBzdHJpbmddOiBhbnkgfSB8IG51bGw7XHJcblxyXG5leHBvcnQgdHlwZSBNYXRjaFN0YXJ0SW5mbyA9IHtcclxuICBTdGFydEluOiBzdHJpbmc7XHJcbiAgU3RhcnRUeXBlOiBzdHJpbmc7XHJcbiAgbGFuZ3VhZ2U/OiBzdHJpbmcgfCB1bmRlZmluZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBNYXRjaEVuZEluZm8gPSB7XHJcbiAgRW5kVHlwZTogc3RyaW5nO1xyXG4gIGxhbmd1YWdlPzogc3RyaW5nIHwgdW5kZWZpbmVkO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW11bGF0b3JDb21tb24ge1xyXG4gIHN0YXRpYyBjbG9uZURhdGEoZGF0YTogRGF0YVR5cGUsIGV4Y2x1ZGUgPSBbJ29wdGlvbnMnLCAncGFydHknXSk6IERhdGFUeXBlIHtcclxuICAgIGNvbnN0IHJldDogRGF0YVR5cGUgPSB7fTtcclxuXHJcbiAgICAvLyBVc2UgZXh0cmEgbG9naWMgZm9yIHRvcC1sZXZlbCBleHRlbmQgZm9yIHByb3BlcnR5IGV4Y2x1c2lvblxyXG4gICAgLy8gVGhpcyBjdXQgdGhlIGV4ZWN1dGlvbiB0aW1lIG9mIHRoaXMgY29kZSBmcm9tIDQxLDAwMG1zIHRvIDUwbXMgd2hlbiBwYXJzaW5nIGEgMTIgbWludXRlIHB1bGxcclxuICAgIGZvciAoY29uc3QgaSBpbiBkYXRhKSB7XHJcbiAgICAgIGlmIChleGNsdWRlLmluY2x1ZGVzKGkpKVxyXG4gICAgICAgIGNvbnRpbnVlO1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiBkYXRhW2ldID09PSAnb2JqZWN0JylcclxuICAgICAgICByZXRbaV0gPSBFbXVsYXRvckNvbW1vbi5fY2xvbmVEYXRhKGRhdGFbaV0pO1xyXG4gICAgICBlbHNlXHJcbiAgICAgICAgLy8gQXNzaWdubWVudCBvZiBhbnkgdG8gYW55LiBTZWUgRGF0YVR5cGUgZGVmaW5pdGlvbiBhYm92ZSBmb3IgcmVhc29uaW5nLlxyXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWFzc2lnbm1lbnRcclxuICAgICAgICByZXRbaV0gPSBkYXRhW2ldO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJldDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBfY2xvbmVEYXRhKGRhdGE6IERhdGFUeXBlKTogRGF0YVR5cGUge1xyXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xyXG4gICAgICAgIGNvbnN0IHJldCA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7ICsraSlcclxuICAgICAgICAgIHJldFtpXSA9IEVtdWxhdG9yQ29tbW9uLl9jbG9uZURhdGEoZGF0YVtpXSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChkYXRhID09PSBudWxsKVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBSZWdFeHApXHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoZGF0YSk7XHJcblxyXG4gICAgICBjb25zdCByZXQ6IERhdGFUeXBlID0ge307XHJcbiAgICAgIGZvciAoY29uc3QgaSBpbiBkYXRhKVxyXG4gICAgICAgIHJldFtpXSA9IEVtdWxhdG9yQ29tbW9uLl9jbG9uZURhdGEoZGF0YVtpXSk7XHJcblxyXG4gICAgICByZXR1cm4gcmV0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgdGltZVRvU3RyaW5nKHRpbWU6IG51bWJlciwgaW5jbHVkZU1pbGxpcyA9IHRydWUpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgbmVnYXRpdmUgPSB0aW1lIDwgMCA/ICctJyA6ICcnO1xyXG4gICAgdGltZSA9IE1hdGguYWJzKHRpbWUpO1xyXG4gICAgY29uc3QgbWlsbGlzTnVtID0gdGltZSAlIDEwMDA7XHJcbiAgICBjb25zdCBzZWNzTnVtID0gKCh0aW1lICUgKDYwICogMTAwMCkpIC0gbWlsbGlzTnVtKSAvIDEwMDA7XHJcbiAgICAvLyBNaWxsaXNlY29uZHNcclxuICAgIGNvbnN0IG1pbGxpcyA9IGAwMCR7bWlsbGlzTnVtfWAuc3Vic3RyKC0zKTtcclxuICAgIGNvbnN0IHNlY3MgPSBgMCR7c2Vjc051bX1gLnN1YnN0cigtMik7XHJcbiAgICBjb25zdCBtaW5zID0gYDAkeygoKCh0aW1lICUgKDYwICogNjAgKiAxMDAwKSkgLSBtaWxsaXNOdW0pIC8gMTAwMCkgLSBzZWNzTnVtKSAvIDYwfWAuc3Vic3RyKC0yKTtcclxuICAgIHJldHVybiBuZWdhdGl2ZSArIG1pbnMgKyAnOicgKyBzZWNzICsgKGluY2x1ZGVNaWxsaXMgPyAnLicgKyBtaWxsaXMgOiAnJyk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgdGltZVRvRGF0ZVN0cmluZyh0aW1lOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0ZU9iamVjdFRvRGF0ZVN0cmluZyhuZXcgRGF0ZSh0aW1lKSk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZGF0ZU9iamVjdFRvRGF0ZVN0cmluZyhkYXRlOiBEYXRlKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XHJcbiAgICBjb25zdCBtb250aCA9IEVtdWxhdG9yQ29tbW9uLnplcm9QYWQoKGRhdGUuZ2V0TW9udGgoKSArIDEpLnRvU3RyaW5nKCkpO1xyXG4gICAgY29uc3QgZGF5ID0gRW11bGF0b3JDb21tb24uemVyb1BhZChkYXRlLmdldERhdGUoKS50b1N0cmluZygpKTtcclxuICAgIHJldHVybiBgJHt5ZWFyfS0ke21vbnRofS0ke2RheX1gO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHRpbWVUb1RpbWVTdHJpbmcodGltZTogbnVtYmVyLCBpbmNsdWRlTWlsbGlzID0gZmFsc2UpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0ZU9iamVjdFRvVGltZVN0cmluZyhuZXcgRGF0ZSh0aW1lKSwgaW5jbHVkZU1pbGxpcyk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZGF0ZU9iamVjdFRvVGltZVN0cmluZyhkYXRlOiBEYXRlLCBpbmNsdWRlTWlsbGlzID0gZmFsc2UpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgaG91ciA9IEVtdWxhdG9yQ29tbW9uLnplcm9QYWQoZGF0ZS5nZXRIb3VycygpLnRvU3RyaW5nKCkpO1xyXG4gICAgY29uc3QgbWludXRlID0gRW11bGF0b3JDb21tb24uemVyb1BhZChkYXRlLmdldE1pbnV0ZXMoKS50b1N0cmluZygpKTtcclxuICAgIGNvbnN0IHNlY29uZCA9IEVtdWxhdG9yQ29tbW9uLnplcm9QYWQoZGF0ZS5nZXRTZWNvbmRzKCkudG9TdHJpbmcoKSk7XHJcbiAgICBsZXQgcmV0ID0gYCR7aG91cn06JHttaW51dGV9OiR7c2Vjb25kfWA7XHJcbiAgICBpZiAoaW5jbHVkZU1pbGxpcylcclxuICAgICAgcmV0ID0gcmV0ICsgYC4ke2RhdGUuZ2V0TWlsbGlzZWNvbmRzKCl9YDtcclxuXHJcbiAgICByZXR1cm4gcmV0O1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIG1zVG9EdXJhdGlvbihtczogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IHRtcCA9IEVtdWxhdG9yQ29tbW9uLnRpbWVUb1N0cmluZyhtcywgZmFsc2UpO1xyXG4gICAgcmV0dXJuIHRtcC5yZXBsYWNlKCc6JywgJ20nKSArICdzJztcclxuICB9XHJcblxyXG4gIHN0YXRpYyBkYXRlVGltZVRvU3RyaW5nKHRpbWU6IG51bWJlciwgaW5jbHVkZU1pbGxpcyA9IGZhbHNlKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh0aW1lKTtcclxuICAgIHJldHVybiBgJHt0aGlzLmRhdGVPYmplY3RUb0RhdGVTdHJpbmcoZGF0ZSl9ICR7dGhpcy5kYXRlT2JqZWN0VG9UaW1lU3RyaW5nKGRhdGUsIGluY2x1ZGVNaWxsaXMpfWA7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgemVyb1BhZChzdHI6IHN0cmluZywgbGVuID0gMik6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKCcnICsgc3RyKS5wYWRTdGFydChsZW4sICcwJyk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcHJvcGVyQ2FzZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoLyhbXlxcV19dK1teXFxzLV0qKSAqL2csICh0eHQpID0+IHtcclxuICAgICAgcmV0dXJuIHR4dC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHR4dC5zdWJzdHIoMSkudG9Mb3dlckNhc2UoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHNwYWNlUGFkTGVmdChzdHI6IHN0cmluZywgbGVuOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHN0ci5wYWRTdGFydChsZW4sICcgJyk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZG9lc0xpbmVNYXRjaDxUIGV4dGVuZHMgVHJpZ2dlclR5cGVzPihsaW5lOiBzdHJpbmcsXHJcbiAgICAgIHJlZ2V4ZXM6IFJlY29yZDxMYW5nLCBSZWdFeHA+IHwgUmVnRXhwIHwgQ2FjdGJvdEJhc2VSZWdFeHA8VD4pOlxyXG4gICAgICBSZWdFeHBFeGVjQXJyYXkgfCBDYWN0Ym90UmVnRXhwRXhlY0FycmF5PFQ+IHwgbnVsbCB7XHJcbiAgICBpZiAocmVnZXhlcyBpbnN0YW5jZW9mIFJlZ0V4cClcclxuICAgICAgcmV0dXJuIHJlZ2V4ZXMuZXhlYyhsaW5lKTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGxhbmdTdHIgaW4gcmVnZXhlcykge1xyXG4gICAgICBjb25zdCBsYW5nID0gbGFuZ1N0ciBhcyBrZXlvZiB0eXBlb2YgcmVnZXhlcztcclxuICAgICAgY29uc3QgcmVzID0gcmVnZXhlc1tsYW5nXS5leGVjKGxpbmUpO1xyXG4gICAgICBpZiAocmVzKSB7XHJcbiAgICAgICAgaWYgKHJlcy5ncm91cHMpXHJcbiAgICAgICAgICByZXMuZ3JvdXBzLmxhbmd1YWdlID0gbGFuZztcclxuICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBtYXRjaFN0YXJ0KGxpbmU6IHN0cmluZyk6IE1hdGNoU3RhcnRJbmZvIHwgdW5kZWZpbmVkIHtcclxuICAgIGxldCByZXM7XHJcbiAgICAvLyBDdXJyZW50bHkgYWxsIG9mIHRoZXNlIHJlZ2V4ZXMgaGF2ZSBncm91cHMgaWYgdGhleSBtYXRjaCBhdCBhbGwsXHJcbiAgICAvLyBidXQgYmUgcm9idXN0IHRvIHRoYXQgY2hhbmdpbmcgaW4gdGhlIGZ1dHVyZS5cclxuICAgIHJlcyA9IEVtdWxhdG9yQ29tbW9uLmRvZXNMaW5lTWF0Y2gobGluZSwgRW11bGF0b3JDb21tb24uY291bnRkb3duUmVnZXhlcyk7XHJcbiAgICBpZiAocmVzKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgU3RhcnRJbjogKHBhcnNlSW50KHJlcy5ncm91cHM/LnRpbWUgPz8gJzAnKSAqIDEwMDApLnRvU3RyaW5nKCksXHJcbiAgICAgICAgU3RhcnRUeXBlOiAnQ291bnRkb3duJyxcclxuICAgICAgICBsYW5ndWFnZTogcmVzLmdyb3Vwcz8ubGFuZ3VhZ2UgPz8gdW5kZWZpbmVkLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmVzID0gRW11bGF0b3JDb21tb24uZG9lc0xpbmVNYXRjaChsaW5lLCBFbXVsYXRvckNvbW1vbi5zZWFsUmVnZXhlcyk7XHJcbiAgICBpZiAocmVzKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgU3RhcnRJbjogJzAnLFxyXG4gICAgICAgIFN0YXJ0VHlwZTogJ1NlYWwnLFxyXG4gICAgICAgIGxhbmd1YWdlOiByZXMuZ3JvdXBzPy5sYW5ndWFnZSA/PyB1bmRlZmluZWQsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZXMgPSBFbXVsYXRvckNvbW1vbi5kb2VzTGluZU1hdGNoKGxpbmUsIEVtdWxhdG9yQ29tbW9uLmVuZ2FnZVJlZ2V4ZXMpO1xyXG4gICAgaWYgKHJlcykge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIFN0YXJ0SW46ICcwJyxcclxuICAgICAgICBTdGFydFR5cGU6ICdFbmdhZ2UnLFxyXG4gICAgICAgIGxhbmd1YWdlOiByZXMuZ3JvdXBzPy5sYW5ndWFnZSA/PyB1bmRlZmluZWQsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgbWF0Y2hFbmQobGluZTogc3RyaW5nKTogTWF0Y2hFbmRJbmZvIHwgdW5kZWZpbmVkIHtcclxuICAgIGxldCByZXM7XHJcbiAgICAvLyBDdXJyZW50bHkgYWxsIG9mIHRoZXNlIHJlZ2V4ZXMgaGF2ZSBncm91cHMgaWYgdGhleSBtYXRjaCBhdCBhbGwsXHJcbiAgICAvLyBidXQgYmUgcm9idXN0IHRvIHRoYXQgY2hhbmdpbmcgaW4gdGhlIGZ1dHVyZS5cclxuICAgIHJlcyA9IEVtdWxhdG9yQ29tbW9uLmRvZXNMaW5lTWF0Y2gobGluZSwgRW11bGF0b3JDb21tb24ud2luUmVnZXgpO1xyXG4gICAgaWYgKHJlcykge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIEVuZFR5cGU6ICdXaW4nLFxyXG4gICAgICAgIGxhbmd1YWdlOiByZXMuZ3JvdXBzPy5sYW5ndWFnZSA/PyB1bmRlZmluZWQsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZXMgPSBFbXVsYXRvckNvbW1vbi5kb2VzTGluZU1hdGNoKGxpbmUsIEVtdWxhdG9yQ29tbW9uLndpcGVSZWdleCk7XHJcbiAgICBpZiAocmVzKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgRW5kVHlwZTogJ1dpcGUnLFxyXG4gICAgICAgIGxhbmd1YWdlOiByZXMuZ3JvdXBzPy5sYW5ndWFnZSA/PyB1bmRlZmluZWQsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZXMgPSBFbXVsYXRvckNvbW1vbi5kb2VzTGluZU1hdGNoKGxpbmUsIEVtdWxhdG9yQ29tbW9uLmNhY3Rib3RXaXBlUmVnZXgpO1xyXG4gICAgaWYgKHJlcykge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIEVuZFR5cGU6ICdDYWN0Ym90IFdpcGUnLFxyXG4gICAgICAgIGxhbmd1YWdlOiByZXMuZ3JvdXBzPy5sYW5ndWFnZSA/PyB1bmRlZmluZWQsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZXMgPSBFbXVsYXRvckNvbW1vbi5kb2VzTGluZU1hdGNoKGxpbmUsIEVtdWxhdG9yQ29tbW9uLnVuc2VhbFJlZ2V4ZXMpO1xyXG4gICAgaWYgKHJlcykge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIEVuZFR5cGU6ICdVbnNlYWwnLFxyXG4gICAgICAgIGxhbmd1YWdlOiByZXMuZ3JvdXBzPy5sYW5ndWFnZSA/PyB1bmRlZmluZWQsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgc2VhbFJlZ2V4ZXMgPSBMb2NhbGVOZXRSZWdleC5hcmVhU2VhbDtcclxuICBzdGF0aWMgZW5nYWdlUmVnZXhlcyA9IExvY2FsZU5ldFJlZ2V4LmNvdW50ZG93bkVuZ2FnZTtcclxuICBzdGF0aWMgY291bnRkb3duUmVnZXhlcyA9IExvY2FsZU5ldFJlZ2V4LmNvdW50ZG93blN0YXJ0O1xyXG4gIHN0YXRpYyB1bnNlYWxSZWdleGVzID0gTG9jYWxlTmV0UmVnZXguYXJlYVVuc2VhbDtcclxuICBzdGF0aWMgd2lwZVJlZ2V4ID0gTmV0UmVnZXhlcy5uZXR3b3JrNmQoeyBjb21tYW5kOiAnNDAwMDAwMTAnIH0pO1xyXG4gIHN0YXRpYyB3aW5SZWdleCA9IE5ldFJlZ2V4ZXMubmV0d29yazZkKHsgY29tbWFuZDogJzQwMDAwMDAzJyB9KTtcclxuICBzdGF0aWMgY2FjdGJvdFdpcGVSZWdleCA9IE5ldFJlZ2V4ZXMuZWNobyh7IGxpbmU6ICdjYWN0Ym90IHdpcGUuKj8nIH0pO1xyXG59XHJcbiIsIi8vIEhlbHBlciBFcnJvciBmb3IgVHlwZVNjcmlwdCBzaXR1YXRpb25zIHdoZXJlIHRoZSBwcm9ncmFtbWVyIHRoaW5rcyB0aGV5XHJcbi8vIGtub3cgYmV0dGVyIHRoYW4gVHlwZVNjcmlwdCB0aGF0IHNvbWUgc2l0dWF0aW9uIHdpbGwgbmV2ZXIgb2NjdXIuXHJcblxyXG4vLyBUaGUgaW50ZW50aW9uIGhlcmUgaXMgdGhhdCB0aGUgcHJvZ3JhbW1lciBkb2VzIG5vdCBleHBlY3QgYSBwYXJ0aWN1bGFyXHJcbi8vIGJpdCBvZiBjb2RlIHRvIGhhcHBlbiwgYW5kIHNvIGhhcyBub3Qgd3JpdHRlbiBjYXJlZnVsIGVycm9yIGhhbmRsaW5nLlxyXG4vLyBJZiBpdCBkb2VzIG9jY3VyLCBhdCBsZWFzdCB0aGVyZSB3aWxsIGJlIGFuIGVycm9yIGFuZCB3ZSBjYW4gZmlndXJlIG91dCB3aHkuXHJcbi8vIFRoaXMgaXMgcHJlZmVyYWJsZSB0byBjYXN0aW5nIG9yIGRpc2FibGluZyBUeXBlU2NyaXB0IGFsdG9nZXRoZXIgaW4gb3JkZXIgdG9cclxuLy8gYXZvaWQgc3ludGF4IGVycm9ycy5cclxuXHJcbi8vIE9uZSBjb21tb24gZXhhbXBsZSBpcyBhIHJlZ2V4LCB3aGVyZSBpZiB0aGUgcmVnZXggbWF0Y2hlcyB0aGVuIGFsbCBvZiB0aGVcclxuLy8gKG5vbi1vcHRpb25hbCkgcmVnZXggZ3JvdXBzIHdpbGwgYWxzbyBiZSB2YWxpZCwgYnV0IFR5cGVTY3JpcHQgZG9lc24ndCBrbm93LlxyXG5leHBvcnQgY2xhc3MgVW5yZWFjaGFibGVDb2RlIGV4dGVuZHMgRXJyb3Ige1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoJ1RoaXMgY29kZSBzaG91bGRuXFwndCBiZSByZWFjaGVkJyk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFVucmVhY2hhYmxlQ29kZSB9IGZyb20gJy4uLy4uLy4uLy4uL3Jlc291cmNlcy9ub3RfcmVhY2hlZCc7XHJcbmltcG9ydCB7IEpvYiB9IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL2pvYic7XHJcbmltcG9ydCBDb21iYXRhbnRTdGF0ZSBmcm9tICcuL0NvbWJhdGFudFN0YXRlJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbWJhdGFudCB7XHJcbiAgaWQ6IHN0cmluZztcclxuICBuYW1lID0gJyc7XHJcbiAgc2VydmVyID0gJyc7XHJcbiAgc3RhdGVzOiB7IFt0aW1lc3RhbXA6IG51bWJlcl06IENvbWJhdGFudFN0YXRlIH0gPSB7fTtcclxuICBzaWduaWZpY2FudFN0YXRlczogbnVtYmVyW10gPSBbXTtcclxuICBsYXRlc3RUaW1lc3RhbXAgPSAtMTtcclxuICBqb2I/OiBKb2I7XHJcbiAgam9iSWQ/OiBudW1iZXI7XHJcbiAgbGV2ZWw/OiBudW1iZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcsIG5hbWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgdGhpcy5zZXROYW1lKG5hbWUpO1xyXG4gIH1cclxuXHJcbiAgc2V0TmFtZShuYW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIC8vIFNvbWV0aW1lcyBuZXR3b3JrIGxpbmVzIGFycml2ZSBhZnRlciB0aGUgY29tYmF0YW50IGhhcyBiZWVuIGNsZWFyZWRcclxuICAgIC8vIGZyb20gbWVtb3J5IGluIHRoZSBjbGllbnQsIHNvIHRoZSBuZXR3b3JrIGxpbmUgd2lsbCBoYXZlIGEgdmFsaWQgSURcclxuICAgIC8vIGJ1dCB0aGUgbmFtZSB3aWxsIGJlIGJsYW5rLiBTaW5jZSB3ZSdyZSB0cmFja2luZyB0aGUgbmFtZSBmb3IgdGhlXHJcbiAgICAvLyBlbnRpcmUgZmlnaHQgYW5kIG5vdCBvbiBhIHN0YXRlLWJ5LXN0YXRlIGJhc2lzLCB3ZSBkb24ndCB3YW50IHRvXHJcbiAgICAvLyBibGFuayBvdXQgYSBuYW1lIGluIHRoaXMgY2FzZS5cclxuICAgIC8vIElmIGEgY29tYmF0YW50IGFjdHVhbGx5IGhhcyBhIGJsYW5rIG5hbWUsIHRoYXQncyBzdGlsbCBhbGxvd2VkIGJ5XHJcbiAgICAvLyB0aGUgY29uc3RydWN0b3IuXHJcbiAgICBpZiAobmFtZSA9PT0gJycpXHJcbiAgICAgIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBwYXJ0cyA9IG5hbWUuc3BsaXQoJygnKTtcclxuICAgIHRoaXMubmFtZSA9IHBhcnRzWzBdID8/ICcnO1xyXG4gICAgaWYgKHBhcnRzLmxlbmd0aCA+IDEpXHJcbiAgICAgIHRoaXMuc2VydmVyID0gcGFydHNbMV0/LnJlcGxhY2UoL1xcKSQvLCAnJykgPz8gJyc7XHJcbiAgfVxyXG5cclxuICBoYXNTdGF0ZSh0aW1lc3RhbXA6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhdGVzW3RpbWVzdGFtcF0gIT09IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHB1c2hTdGF0ZSh0aW1lc3RhbXA6IG51bWJlciwgc3RhdGU6IENvbWJhdGFudFN0YXRlKTogdm9pZCB7XHJcbiAgICB0aGlzLnN0YXRlc1t0aW1lc3RhbXBdID0gc3RhdGU7XHJcbiAgICB0aGlzLmxhdGVzdFRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcclxuICAgIGlmICghdGhpcy5zaWduaWZpY2FudFN0YXRlcy5pbmNsdWRlcyh0aW1lc3RhbXApKVxyXG4gICAgICB0aGlzLnNpZ25pZmljYW50U3RhdGVzLnB1c2godGltZXN0YW1wKTtcclxuICB9XHJcblxyXG4gIG5leHRTaWduaWZpY2FudFN0YXRlKHRpbWVzdGFtcDogbnVtYmVyKTogQ29tYmF0YW50U3RhdGUge1xyXG4gICAgLy8gU2hvcnRjdXQgb3V0IGlmIHRoaXMgaXMgc2lnbmlmaWNhbnQgb3IgaWYgdGhlcmUncyBubyBoaWdoZXIgc2lnbmlmaWNhbnQgc3RhdGVcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zaWduaWZpY2FudFN0YXRlcy5pbmRleE9mKHRpbWVzdGFtcCk7XHJcbiAgICBjb25zdCBsYXN0U2lnbmlmaWNhbnRTdGF0ZUluZGV4ID0gdGhpcy5zaWduaWZpY2FudFN0YXRlcy5sZW5ndGggLSAxO1xyXG4gICAgLy8gSWYgdGltZXN0YW1wIGlzIGEgc2lnbmlmaWNhbnQgc3RhdGUgYWxyZWFkeSwgYW5kIGl0J3Mgbm90IHRoZSBsYXN0IG9uZSwgcmV0dXJuIHRoZSBuZXh0XHJcbiAgICBpZiAoaW5kZXggPj0gMCAmJiBpbmRleCA8IGxhc3RTaWduaWZpY2FudFN0YXRlSW5kZXgpXHJcbiAgICAgIHJldHVybiB0aGlzLmdldFN0YXRlQnlJbmRleChpbmRleCArIDEpO1xyXG4gICAgLy8gSWYgdGltZXN0YW1wIGlzIHRoZSBsYXN0IHNpZ25pZmljYW50IHN0YXRlIG9yIHRoZSB0aW1lc3RhbXAgaXMgcGFzdCB0aGUgbGFzdCBzaWduaWZpY2FudFxyXG4gICAgLy8gc3RhdGUsIHJldHVybiB0aGUgbGFzdCBzaWduaWZpY2FudCBzdGF0ZVxyXG4gICAgZWxzZSBpZiAoaW5kZXggPT09IGxhc3RTaWduaWZpY2FudFN0YXRlSW5kZXggfHxcclxuICAgICAgICB0aW1lc3RhbXAgPiAodGhpcy5zaWduaWZpY2FudFN0YXRlc1tsYXN0U2lnbmlmaWNhbnRTdGF0ZUluZGV4XSA/PyAwKSlcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RhdGVCeUluZGV4KGxhc3RTaWduaWZpY2FudFN0YXRlSW5kZXgpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaWduaWZpY2FudFN0YXRlcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICBjb25zdCBzdGF0ZUluZGV4ID0gdGhpcy5zaWduaWZpY2FudFN0YXRlc1tpXTtcclxuICAgICAgaWYgKHN0YXRlSW5kZXggJiYgc3RhdGVJbmRleCA+IHRpbWVzdGFtcClcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRTdGF0ZUJ5SW5kZXgoaSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZ2V0U3RhdGVCeUluZGV4KHRoaXMuc2lnbmlmaWNhbnRTdGF0ZXMubGVuZ3RoIC0gMSk7XHJcbiAgfVxyXG5cclxuICBwdXNoUGFydGlhbFN0YXRlKHRpbWVzdGFtcDogbnVtYmVyLCBwcm9wczogUGFydGlhbDxDb21iYXRhbnRTdGF0ZT4pOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnN0YXRlc1t0aW1lc3RhbXBdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgLy8gQ2xvbmUgdGhlIGxhc3Qgc3RhdGUgYmVmb3JlIHRoaXMgdGltZXN0YW1wXHJcbiAgICAgIGNvbnN0IHN0YXRlVGltZXN0YW1wID0gdGhpcy5zaWduaWZpY2FudFN0YXRlc1xyXG4gICAgICAgIC5maWx0ZXIoKHMpID0+IHMgPCB0aW1lc3RhbXApXHJcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IGIgLSBhKVswXSA/PyB0aGlzLnNpZ25pZmljYW50U3RhdGVzWzBdO1xyXG4gICAgICBpZiAoc3RhdGVUaW1lc3RhbXAgPT09IHVuZGVmaW5lZClcclxuICAgICAgICB0aHJvdyBuZXcgVW5yZWFjaGFibGVDb2RlKCk7XHJcbiAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5zdGF0ZXNbc3RhdGVUaW1lc3RhbXBdO1xyXG4gICAgICBpZiAoIXN0YXRlKVxyXG4gICAgICAgIHRocm93IG5ldyBVbnJlYWNoYWJsZUNvZGUoKTtcclxuICAgICAgdGhpcy5zdGF0ZXNbdGltZXN0YW1wXSA9IHN0YXRlLnBhcnRpYWxDbG9uZShwcm9wcyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuc3RhdGVzW3RpbWVzdGFtcF07XHJcbiAgICAgIGlmICghc3RhdGUpXHJcbiAgICAgICAgdGhyb3cgbmV3IFVucmVhY2hhYmxlQ29kZSgpO1xyXG4gICAgICB0aGlzLnN0YXRlc1t0aW1lc3RhbXBdID0gc3RhdGUucGFydGlhbENsb25lKHByb3BzKTtcclxuICAgIH1cclxuICAgIHRoaXMubGF0ZXN0VGltZXN0YW1wID0gTWF0aC5tYXgodGhpcy5sYXRlc3RUaW1lc3RhbXAsIHRpbWVzdGFtcCk7XHJcblxyXG4gICAgY29uc3QgbGFzdFNpZ25pZmljYW50U3RhdGVUaW1lc3RhbXAgPVxyXG4gICAgICB0aGlzLnNpZ25pZmljYW50U3RhdGVzW3RoaXMuc2lnbmlmaWNhbnRTdGF0ZXMubGVuZ3RoIC0gMV07XHJcbiAgICBpZiAoIWxhc3RTaWduaWZpY2FudFN0YXRlVGltZXN0YW1wKVxyXG4gICAgICB0aHJvdyBuZXcgVW5yZWFjaGFibGVDb2RlKCk7XHJcbiAgICBjb25zdCBvbGRTdGF0ZUpTT04gPSBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlc1tsYXN0U2lnbmlmaWNhbnRTdGF0ZVRpbWVzdGFtcF0pO1xyXG4gICAgY29uc3QgbmV3U3RhdGVKU09OID0gSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZXNbdGltZXN0YW1wXSk7XHJcblxyXG4gICAgaWYgKGxhc3RTaWduaWZpY2FudFN0YXRlVGltZXN0YW1wICE9PSB0aW1lc3RhbXAgJiYgbmV3U3RhdGVKU09OICE9PSBvbGRTdGF0ZUpTT04pXHJcbiAgICAgIHRoaXMuc2lnbmlmaWNhbnRTdGF0ZXMucHVzaCh0aW1lc3RhbXApO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3RhdGUodGltZXN0YW1wOiBudW1iZXIpOiBDb21iYXRhbnRTdGF0ZSB7XHJcbiAgICBjb25zdCBzdGF0ZUJ5VGltZXN0YW1wID0gdGhpcy5zdGF0ZXNbdGltZXN0YW1wXTtcclxuICAgIGlmIChzdGF0ZUJ5VGltZXN0YW1wKVxyXG4gICAgICByZXR1cm4gc3RhdGVCeVRpbWVzdGFtcDtcclxuXHJcbiAgICBjb25zdCBpbml0aWFsVGltZXN0YW1wID0gdGhpcy5zaWduaWZpY2FudFN0YXRlc1swXTtcclxuICAgIGlmIChpbml0aWFsVGltZXN0YW1wID09PSB1bmRlZmluZWQpXHJcbiAgICAgIHRocm93IG5ldyBVbnJlYWNoYWJsZUNvZGUoKTtcclxuICAgIGlmICh0aW1lc3RhbXAgPCBpbml0aWFsVGltZXN0YW1wKVxyXG4gICAgICByZXR1cm4gdGhpcy5nZXRTdGF0ZUJ5SW5kZXgoMCk7XHJcblxyXG4gICAgbGV0IGkgPSAwO1xyXG4gICAgZm9yICg7IGkgPCB0aGlzLnNpZ25pZmljYW50U3RhdGVzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgIGNvbnN0IHByZXZUaW1lc3RhbXAgPSB0aGlzLnNpZ25pZmljYW50U3RhdGVzW2ldO1xyXG4gICAgICBpZiAocHJldlRpbWVzdGFtcCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHRocm93IG5ldyBVbnJlYWNoYWJsZUNvZGUoKTtcclxuICAgICAgaWYgKHByZXZUaW1lc3RhbXAgPiB0aW1lc3RhbXApXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RhdGVCeUluZGV4KGkgLSAxKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5nZXRTdGF0ZUJ5SW5kZXgoaSAtIDEpO1xyXG4gIH1cclxuXHJcbiAgLy8gU2hvdWxkIG9ubHkgYmUgY2FsbGVkIHdoZW4gYGluZGV4YCBpcyB2YWxpZC5cclxuICBwcml2YXRlIGdldFN0YXRlQnlJbmRleChpbmRleDogbnVtYmVyKTogQ29tYmF0YW50U3RhdGUge1xyXG4gICAgY29uc3Qgc3RhdGVJbmRleCA9IHRoaXMuc2lnbmlmaWNhbnRTdGF0ZXNbaW5kZXhdO1xyXG4gICAgaWYgKHN0YXRlSW5kZXggPT09IHVuZGVmaW5lZClcclxuICAgICAgdGhyb3cgbmV3IFVucmVhY2hhYmxlQ29kZSgpO1xyXG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLnN0YXRlc1tzdGF0ZUluZGV4XTtcclxuICAgIGlmIChzdGF0ZSA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICB0aHJvdyBuZXcgVW5yZWFjaGFibGVDb2RlKCk7XHJcbiAgICByZXR1cm4gc3RhdGU7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEpvYiB9IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL2pvYic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21iYXRhbnRKb2JTZWFyY2gge1xyXG4gIHN0YXRpYyBnZXRKb2IoYWJpbGl0eUlkOiBudW1iZXIpOiBKb2IgfCB1bmRlZmluZWQge1xyXG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoQ29tYmF0YW50Sm9iU2VhcmNoLmFiaWxpdGllcykpIHtcclxuICAgICAgaWYgKHZhbHVlPy5pbmNsdWRlcyhhYmlsaXR5SWQpKVxyXG4gICAgICAgIHJldHVybiBrZXkgYXMga2V5b2YgdHlwZW9mIENvbWJhdGFudEpvYlNlYXJjaC5hYmlsaXRpZXM7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcmVhZG9ubHkgYWJpbGl0eU1hdGNoUmVnZXggPSAvW2EtZkEtRjAtOV17MSw0fS9pO1xyXG5cclxuICBzdGF0aWMgcmVhZG9ubHkgYWJpbGl0aWVzOiB7IFtqb2IgaW4gSm9iXT86IG51bWJlcltdIH0gPSB7XHJcbiAgICBQTEQ6IFtcclxuICAgICAgMTI5NTksIDEyOTYxLCAxMjk2NCwgMTI5NjcsIDEyOTY4LCAxMjk2OSwgMTI5NzAsIDEyOTcxLCAxMjk3MiwgMTI5NzMsIDEyOTc0LCAxMjk3NSxcclxuICAgICAgMTI5NzYsIDEyOTc4LCAxMjk4MCwgMTI5ODEsIDEyOTgyLCAxMjk4MywgMTI5ODQsIDEyOTg1LCAxMjk4NiwgMTI5ODcsIDEyOTg4LCAxMjk4OSxcclxuICAgICAgMTI5OTEsIDEyOTkyLCAxMjk5MywgMTI5OTQsIDEyOTk2LCAxMzAwMCwgMTMwMDEsIDEzMDA2LCAxNDQ4MCwgMTY0NTcsIDE2NDU4LCAxNjQ1OSxcclxuICAgICAgMTY0NjAsIDE2NDYxLCAxNzY2OSwgMTc2NzEsIDE3NjcyLCAxNzY5MSwgMTc2OTIsIDE3NjkzLCAxNzY5NCwgMTc4NjYsIDE4MDUwLCAyNywgMjksXHJcbiAgICAgIDMwLCAzNTM4LCAzNTM5LCAzNTQwLCAzNTQxLCAzNTQyLCA0Mjg0LCA0Mjg1LCA0Mjg2LCA1MDIwNywgNTAyMDksIDUwMjQ2LCA1MDI2MCwgNTAyNjEsXHJcbiAgICAgIDUwMjYyLCA1MDI2MywgNTAyNjQsIDczODIsIDczODMsIDczODQsIDczODUsIDg3NDYsIDg3NDksIDg3NTAsIDg3NTEsIDg3NTIsIDg3NTQsIDg3NTUsXHJcbiAgICAgIDg3NTYsXHJcbiAgICBdLFxyXG4gICAgV0FSOiBbXHJcbiAgICAgIDE2NDYyLCAxNjQ2MywgMTY0NjQsIDE2NDY1LCAxNzY5NSwgMTc2OTYsIDE3Njk3LCAxNzY5OCwgMTc4ODksIDM1NDksIDM1NTAsIDM1NTEsIDM1NTIsXHJcbiAgICAgIDQyODksIDQyOTAsIDQyOTEsIDQ5LCA1MDE1NywgNTAyMTgsIDUwMjQ5LCA1MDI2NSwgNTAyNjYsIDUwMjY3LCA1MDI2OCwgNTAyNjksIDUxLCA1MixcclxuICAgICAgNzM4NiwgNzM4NywgNzM4OCwgNzM4OSwgODc1OCwgODc2MSwgODc2MiwgODc2MywgODc2NCwgODc2NSwgODc2NywgODc2OCxcclxuICAgIF0sXHJcbiAgICBEUks6IFtcclxuICAgICAgMTY0NjYsIDE2NDY3LCAxNjQ2OCwgMTY0NjksIDE2NDcwLCAxNjQ3MSwgMTY0NzIsIDE3NzAwLCAxNzcwMSwgMTc3MDIsIDM2MTcsIDM2MjEsIDM2MjMsXHJcbiAgICAgIDM2MjQsIDM2MjUsIDM2MjksIDM2MzIsIDM2MzQsIDM2MzYsIDM2MzgsIDM2MzksIDM2NDAsIDM2NDEsIDM2NDMsIDQzMDMsIDQzMDQsIDQzMDUsIDQzMDYsXHJcbiAgICAgIDQzMDcsIDQzMDgsIDQzMDksIDQzMTAsIDQzMTEsIDQzMTIsIDQ2ODAsIDUwMTU4LCA1MDE1OSwgNTAyNzEsIDUwMjcyLCA1MDMxOSwgNzM5MCwgNzM5MSxcclxuICAgICAgNzM5MiwgNzM5MywgODc2OSwgODc3MiwgODc3MywgODc3NSwgODc3NiwgODc3NywgODc3OCwgODc3OSxcclxuICAgIF0sXHJcbiAgICBHTkI6IFtcclxuICAgICAgMTc3MDMsIDE3NzA0LCAxNzcwNSwgMTc3MDYsIDE3NzA3LCAxNzcwOCwgMTc3MDksIDE3NzEwLCAxNzcxMSwgMTc3MTIsIDE3NzEzLCAxNzcxNCxcclxuICAgICAgMTc3MTYsIDE3NzE3LCAxNzg5MCwgMTc4OTEsIDE2MTM3LCA1MDMyMCwgMTYxMzgsIDE2MTM5LCAxNjE0MCwgMTYxNDEsIDE2MTQyLCAxNjE0MyxcclxuICAgICAgMTYxNDQsIDE2MTQ1LCAxNjE2MiwgNTAyNTcsIDE2MTQ4LCAxNjE0OSwgMTYxNTEsIDE2MTUyLCA1MDI1OCwgMTYxNTMsIDE2MTU0LCAxNjE0NixcclxuICAgICAgMTYxNDcsIDE2MTUwLCAxNjE1OSwgMTYxNjAsIDE2MTYxLCAxNjE1NSwgMTYxNTYsIDE2MTU3LCAxNjE1OCwgMTYxNjMsIDE2MTY0LCAxNjE2NSxcclxuICAgICAgNTAyNTksXHJcbiAgICBdLFxyXG4gICAgV0hNOiBbXHJcbiAgICAgIDEyOTU4LCAxMjk2MiwgMTI5NjUsIDEyOTk3LCAxMzAwMiwgMTMwMDMsIDEzMDA0LCAxMzAwNSwgMTMxLCAxMzYsIDEzNywgMTM5LCAxNDAsIDE0NDgxLFxyXG4gICAgICAxNTg0LCAxNjUzMSwgMTY1MzIsIDE2NTMzLCAxNjUzNCwgMTY1MzUsIDE2NTM2LCAxNzY4OCwgMTc2ODksIDE3NjkwLCAxNzc4OSwgMTc3OTAsIDE3NzkxLFxyXG4gICAgICAxNzc5MywgMTc3OTQsIDE3ODMyLCAzNTY4LCAzNTY5LCAzNTcwLCAzNTcxLCA0Mjk2LCA0Mjk3LCA1MDE4MSwgNTAxODIsIDUwMTk2LCA1MDMwNyxcclxuICAgICAgNTAzMDgsIDUwMzA5LCA1MDMxMCwgNzQzMCwgNzQzMSwgNzQzMiwgNzQzMywgODg5NSwgODg5NiwgODkwMCwgOTYyMSwgMTI3LCAxMzMsXHJcbiAgICBdLFxyXG4gICAgU0NIOiBbXHJcbiAgICAgIDE2NTM3LCAxNjUzOCwgMTY1MzksIDE2NTQwLCAxNjU0MSwgMTY1NDIsIDE2NTQzLCAxNjU0NCwgMTY1NDUsIDE2NTQ2LCAxNjU0NywgMTY1NDgsIDE2NTUwLFxyXG4gICAgICAxNjU1MSwgMTY2LCAxNjcsIDE3MjE1LCAxNzIxNiwgMTc3OTUsIDE3Nzk2LCAxNzc5NywgMTc3OTgsIDE3ODAyLCAxNzg2NCwgMTc4NjUsIDE3ODY5LFxyXG4gICAgICAxNzg3MCwgMTc5OTAsIDE4NSwgMTg2LCAxODgsIDE4OSwgMTkwLCAzNTgzLCAzNTg0LCAzNTg1LCAzNTg2LCAzNTg3LCA0MzAwLCA1MDE4NCwgNTAyMTQsXHJcbiAgICAgIDUwMzExLCA1MDMxMiwgNTAzMTMsIDUwMzI0LCA3NDM0LCA3NDM1LCA3NDM2LCA3NDM3LCA3NDM4LCA3ODY5LCA4MDIsIDgwMywgODA1LCA4OTA0LCA4OTA1LFxyXG4gICAgICA4OTA5LCA5NjIyLFxyXG4gICAgXSxcclxuICAgIEFTVDogW1xyXG4gICAgICAxMDAyNywgMTAwMjgsIDEwMDI5LCAxNjU1MiwgMTY1NTMsIDE2NTU0LCAxNjU1NSwgMTY1NTYsIDE2NTU3LCAxNjU1OCwgMTY1NTksIDE3MDU1LCAxNzE1MSxcclxuICAgICAgMTcxNTIsIDE3ODA0LCAxNzgwNSwgMTc4MDYsIDE3ODA3LCAxNzgwOSwgMTc5OTEsIDM1OTAsIDM1OTMsIDM1OTQsIDM1OTUsIDM1OTYsIDM1OTgsIDM1OTksXHJcbiAgICAgIDM2MDAsIDM2MDEsIDM2MDMsIDM2MDQsIDM2MDUsIDM2MDYsIDM2MDgsIDM2MTAsIDM2MTIsIDM2MTMsIDM2MTQsIDM2MTUsIDQzMDEsIDQzMDIsIDQ0MDEsXHJcbiAgICAgIDQ0MDIsIDQ0MDMsIDQ0MDQsIDQ0MDUsIDQ0MDYsIDQ2NzcsIDQ2NzgsIDQ2NzksIDUwMTIyLCA1MDEyNCwgNTAxMjUsIDUwMTg2LCA1MDE4NywgNTAxODgsXHJcbiAgICAgIDUwMTg5LCA1MDMxNCwgNTAzMTUsIDUwMzE2LCA3NDM5LCA3NDQwLCA3NDQxLCA3NDQyLCA3NDQzLCA3NDQ0LCA3NDQ1LCA3NDQ4LCA4MzI0LCA4OTEzLFxyXG4gICAgICA4OTE0LCA4OTE2LCA5NjI5LFxyXG4gICAgXSxcclxuICAgIE1OSzogW1xyXG4gICAgICAxMjk2MCwgMTI5NjMsIDEyOTY2LCAxMjk3NywgMTI5NzksIDEyOTkwLCAxMjk5NSwgMTI5OTgsIDEyOTk5LCAxNDQ3NiwgMTQ0NzgsIDE2NDczLCAxNjQ3NCxcclxuICAgICAgMTY0NzUsIDE2NDc2LCAxNzY3NCwgMTc2NzUsIDE3Njc2LCAxNzY3NywgMTc3MTksIDE3NzIwLCAxNzcyMSwgMTc3MjIsIDE3NzIzLCAxNzcyNCwgMTc3MjUsXHJcbiAgICAgIDE3NzI2LCAzNTQzLCAzNTQ1LCAzNTQ2LCAzNTQ3LCA0MjYyLCA0Mjg3LCA0Mjg4LCA1MDE2MCwgNTAxNjEsIDUwMjQ1LCA1MDI3MywgNTAyNzQsIDYzLCA3MCxcclxuICAgICAgNzEsIDczOTQsIDczOTUsIDczOTYsIDc0LCA4NzgwLCA4NzgxLCA4NzgyLCA4NzgzLCA4Nzg0LCA4Nzg1LCA4Nzg3LCA4Nzg5LCA4OTI1LFxyXG4gICAgXSxcclxuICAgIERSRzogW1xyXG4gICAgICAxNjQ3NywgMTY0NzgsIDE2NDc5LCAxNjQ4MCwgMTc3MjgsIDE3NzI5LCAzNTUzLCAzNTU0LCAzNTU1LCAzNTU2LCAzNTU3LCA0MjkyLCA0MjkzLCA1MDE2MixcclxuICAgICAgNTAxNjMsIDUwMjQ3LCA1MDI3NSwgNTAyNzYsIDczOTcsIDczOTgsIDczOTksIDc0MDAsIDg2LCA4NzkxLCA4NzkyLCA4NzkzLCA4Nzk0LCA4Nzk1LFxyXG4gICAgICA4Nzk2LCA4Nzk3LCA4Nzk4LCA4Nzk5LCA4ODAyLCA4ODAzLCA4ODA0LCA4ODA1LCA4ODA2LCA5MiwgOTQsIDk1LCA5NiwgOTY0MCwgNzUsIDc4LFxyXG4gICAgXSxcclxuICAgIE5JTjogW1xyXG4gICAgICAxNjQ4OCwgMTY0ODksIDE2NDkxLCAxNjQ5MiwgMTY0OTMsIDE3NDEzLCAxNzQxNCwgMTc0MTUsIDE3NDE2LCAxNzQxNywgMTc0MTgsIDE3NDE5LCAxNzQyMCxcclxuICAgICAgMTc3MzIsIDE3NzMzLCAxNzczNCwgMTc3MzUsIDE3NzM2LCAxNzczNywgMTc3MzgsIDE3NzM5LCAyMjQ2LCAyMjU5LCAyMjYwLCAyMjYxLCAyMjYyLFxyXG4gICAgICAyMjYzLCAyMjY0LCAyMjY1LCAyMjY2LCAyMjY3LCAyMjY4LCAyMjY5LCAyMjcwLCAyMjcxLCAyMjcyLCAzNTYzLCAzNTY2LCA0Mjk1LCA1MDE2NSxcclxuICAgICAgNTAxNjYsIDUwMTY3LCA1MDI1MCwgNTAyNzksIDUwMjgwLCA3NDAxLCA3NDAyLCA3NDAzLCA4ODA3LCA4ODA4LCA4ODA5LCA4ODEwLCA4ODEyLCA4ODE0LFxyXG4gICAgICA4ODE1LCA4ODE2LCA4ODIwLCA5NDYxLFxyXG4gICAgXSxcclxuICAgIFNBTTogW1xyXG4gICAgICAxNjQ4MSwgMTY0ODIsIDE2NDgzLCAxNjQ4NCwgMTY0ODUsIDE2NDg2LCAxNjQ4NywgMTc3NDAsIDE3NzQxLCAxNzc0MiwgMTc3NDMsIDE3NzQ0LCA1MDIwOCxcclxuICAgICAgNTAyMTUsIDUwMjc3LCA1MDI3OCwgNzQ3NywgNzQ3OCwgNzQ3OSwgNzQ4MCwgNzQ4MSwgNzQ4MiwgNzQ4MywgNzQ4NCwgNzQ4NSwgNzQ4NiwgNzQ4NyxcclxuICAgICAgNzQ4OCwgNzQ4OSwgNzQ5MCwgNzQ5MSwgNzQ5MiwgNzQ5MywgNzQ5NCwgNzQ5NSwgNzQ5NiwgNzQ5NywgNzQ5OCwgNzQ5OSwgNzUwMSwgNzUwMiwgNzg1NSxcclxuICAgICAgNzg1NywgNzg2NywgODgyMSwgODgyMiwgODgyMywgODgyNCwgODgyNSwgODgyNiwgODgyOCwgODgyOSwgODgzMCwgODgzMSwgODgzMyxcclxuICAgIF0sXHJcbiAgICBCUkQ6IFtcclxuICAgICAgMTAwMjMsIDExNCwgMTE2LCAxMTcsIDExOCwgMTMwMDcsIDE0NDc5LCAxNjQ5NCwgMTY0OTUsIDE2NDk2LCAxNzY3OCwgMTc2NzksIDE3NjgwLCAxNzY4MSxcclxuICAgICAgMTc2ODIsIDE3NzQ1LCAxNzc0NywgMzU1OCwgMzU1OSwgMzU2MCwgMzU2MSwgMzU2MiwgNDI5NCwgNTAxNjgsIDUwMTY5LCA1MDI4MiwgNTAyODMsIDUwMjg0LFxyXG4gICAgICA1MDI4NSwgNTAyODYsIDUwMjg3LCA3NDA0LCA3NDA1LCA3NDA2LCA3NDA3LCA3NDA4LCA3NDA5LCA4ODM2LCA4ODM3LCA4ODM4LCA4ODM5LCA4ODQxLFxyXG4gICAgICA4ODQyLCA4ODQzLCA4ODQ0LCA5NjI1LCAxMDYsXHJcbiAgICBdLFxyXG4gICAgTUNIOiBbXHJcbiAgICAgIDE2NDk3LCAxNjQ5OCwgMTY0OTksIDE2NTAwLCAxNjUwMSwgMTY1MDIsIDE2NTAzLCAxNjUwNCwgMTY3NjYsIDE2ODg5LCAxNzIwNiwgMTcyMDksIDE3NzQ5LFxyXG4gICAgICAxNzc1MCwgMTc3NTEsIDE3NzUyLCAxNzc1MywgMTc3NTQsIDI4NjQsIDI4NjYsIDI4NjgsIDI4NzAsIDI4NzIsIDI4NzMsIDI4NzQsIDI4NzYsIDI4NzgsXHJcbiAgICAgIDI4OTAsIDQyNzYsIDQ2NzUsIDQ2NzYsIDUwMTE3LCA1MDExOSwgNTAyODgsIDUwMjg5LCA1MDI5MCwgNTAyOTEsIDUwMjkyLCA1MDI5MywgNTAyOTQsXHJcbiAgICAgIDc0MTAsIDc0MTEsIDc0MTIsIDc0MTMsIDc0MTQsIDc0MTUsIDc0MTYsIDc0MTgsIDg4NDgsIDg4NDksIDg4NTAsIDg4NTEsIDg4NTMsIDg4NTUsXHJcbiAgICBdLFxyXG4gICAgRE5DOiBbXHJcbiAgICAgIDE3NzU2LCAxNzc1NywgMTc3NTgsIDE3NzU5LCAxNzc2MCwgMTc3NjEsIDE3NzYyLCAxNzc2MywgMTc3NjQsIDE3NzY1LCAxNzc2NiwgMTc3NjcsXHJcbiAgICAgIDE3NzY4LCAxNzc2OSwgMTc3NzAsIDE3NzcxLCAxNzc3MiwgMTc3NzMsIDE3ODI0LCAxNzgyNSwgMTc4MjYsIDE3ODI3LCAxNzgyOCwgMTc4MjksXHJcbiAgICAgIDE4MDc2LCAxNTk4OSwgMTU5OTAsIDE1OTkzLCAxNTk5NywgMTU5OTksIDE2MDAwLCAxNjAwMSwgMTYwMDIsIDE2MDAzLCAxNjE5MSwgMTYxOTIsXHJcbiAgICAgIDE1OTkxLCAxNTk5NCwgMTYwMDcsIDUwMjUyLCAxNTk5NSwgMTU5OTIsIDE1OTk2LCAxNjAwOCwgMTYwMTAsIDUwMjUxLCAxNjAxNSwgMTYwMTIsXHJcbiAgICAgIDE2MDA2LCAxODA3MywgNTAyNTMsIDE2MDExLCAxNjAwOSwgNTAyNTQsIDE1OTk4LCAxNjAwNCwgMTYxOTMsIDE2MTk0LCAxNjE5NSwgMTYxOTYsXHJcbiAgICAgIDE2MDEzLCAxNjAwNSwgNTAyNTUsIDUwMjU2LCAxNjAxNCxcclxuICAgIF0sXHJcbiAgICBCTE06IFtcclxuICAgICAgMTQ0NzcsIDE1MywgMTU0LCAxNTgsIDE1OSwgMTYyLCAxNjUwNSwgMTY1MDYsIDE2NTA3LCAxNzY4MywgMTc2ODQsIDE3Njg1LCAxNzY4NiwgMTc2ODcsXHJcbiAgICAgIDE3Nzc0LCAxNzc3NSwgMzU3MywgMzU3NCwgMzU3NSwgMzU3NiwgMzU3NywgNDI5OCwgNTAxNzEsIDUwMTcyLCA1MDE3MywgNTAxNzQsIDUwMjk1LFxyXG4gICAgICA1MDI5NiwgNTAyOTcsIDUwMzIxLCA1MDMyMiwgNzQxOSwgNzQyMCwgNzQyMSwgNzQyMiwgODg1OCwgODg1OSwgODg2MCwgODg2MSwgODg2MiwgODg2MyxcclxuICAgICAgODg2NCwgODg2NSwgODg2NiwgODg2NywgODg2OSwgOTYzNywgMTQ5LCAxNTUsIDE0MSwgMTUyLFxyXG4gICAgXSxcclxuICAgIFNNTjogW1xyXG4gICAgICAxNjUxMCwgMTY1MTEsIDE2NTEzLCAxNjUxNCwgMTY1MTUsIDE2NTE2LCAxNjUxNywgMTY1MTgsIDE2NTE5LCAxNjUyMiwgMTY1MjMsIDE2NTQ5LFxyXG4gICAgICAxNjc5NSwgMTY3OTYsIDE2Nzk3LCAxNjc5OCwgMTY3OTksIDE2ODAwLCAxNjgwMSwgMTY4MDIsIDE2ODAzLCAxNzc3NywgMTc3NzgsIDE3Nzc5LFxyXG4gICAgICAxNzc4MCwgMTc3ODEsIDE3NzgyLCAxNzc4MywgMTc3ODQsIDE3Nzg1LCAxODAsIDE4NCwgMzU3OCwgMzU3OSwgMzU4MCwgMzU4MSwgMzU4MiwgNDI5OSxcclxuICAgICAgNTAxNzYsIDUwMTc3LCA1MDE3OCwgNTAyMTMsIDUwMjE3LCA1MDI5OCwgNTAyOTksIDUwMzAwLCA1MDMwMSwgNTAzMDIsIDc0MjMsIDc0MjQsIDc0MjUsXHJcbiAgICAgIDc0MjYsIDc0MjcsIDc0MjgsIDc0MjksIDc0NDksIDc0NTAsIDc4NywgNzg4LCA3OTEsIDc5MiwgNzk0LCA3OTYsIDc5NywgNzk4LCA4MDAsIDgwMSxcclxuICAgICAgODg3MiwgODg3MywgODg3NCwgODg3NywgODg3OCwgODg3OSwgODg4MCwgODg4MSwgOTAxNCwgOTQzMixcclxuICAgIF0sXHJcbiAgICBSRE06IFtcclxuICAgICAgMTAwMjUsIDE2NTI0LCAxNjUyNSwgMTY1MjYsIDE2NTI3LCAxNjUyOCwgMTY1MjksIDE2NTMwLCAxNzc4NiwgMTc3ODcsIDE3Nzg4LCA1MDE5NSxcclxuICAgICAgNTAyMDAsIDUwMjAxLCA1MDIxNiwgNTAzMDMsIDUwMzA0LCA1MDMwNSwgNTAzMDYsIDc1MDMsIDc1MDQsIDc1MDUsIDc1MDYsIDc1MDcsIDc1MDksXHJcbiAgICAgIDc1MTAsIDc1MTEsIDc1MTIsIDc1MTMsIDc1MTQsIDc1MTUsIDc1MTYsIDc1MTcsIDc1MTgsIDc1MTksIDc1MjAsIDc1MjEsIDc1MjMsIDc1MjQsXHJcbiAgICAgIDc1MjUsIDc1MjYsIDc1MjcsIDc1MjgsIDc1MjksIDc1MzAsIDg4ODIsIDg4ODMsIDg4ODQsIDg4ODUsIDg4ODcsIDg4ODgsIDg4ODksIDg4OTAsXHJcbiAgICAgIDg4OTEsIDg4OTIsIDk0MzMsIDk0MzQsXHJcbiAgICBdLFxyXG4gICAgQkxVOiBbXHJcbiAgICAgIDExNzE1LCAxMTM4MywgMTEzODQsIDExMzg1LCAxMTM4NiwgMTEzODcsIDExMzg4LCAxMTM4OSwgMTEzOTAsIDExMzkxLCAxMTM5MiwgMTEzOTMsXHJcbiAgICAgIDExMzk0LCAxMTM5NSwgMTEzOTYsIDExMzk3LCAxMTM5OCwgMTEzOTksIDExNDAwLCAxMTQwMSwgMTE0MDIsIDExNDAzLCAxMTQwNCwgMTE0MDUsXHJcbiAgICAgIDExNDA2LCAxMTQwNywgMTE0MDgsIDExNDA5LCAxMTQxMCwgMTE0MTEsIDExNDEyLCAxMTQxMywgMTE0MTQsIDExNDE1LCAxMTQxNiwgMTE0MTcsXHJcbiAgICAgIDExNDE4LCAxMTQxOSwgMTE0MjAsIDExNDIxLCAxMTQyMiwgMTE0MjMsIDExNDI0LCAxMTQyNSwgMTE0MjYsIDExNDI3LCAxMTQyOCwgMTE0MjksXHJcbiAgICAgIDExNDMwLCAxMTQzMSwgNTAyMTksIDUwMjIwLCA1MDIyMSwgNTAyMjIsIDUwMjIzLCA1MDIyNCxcclxuICAgIF0sXHJcbiAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBQbHVnaW5Db21iYXRhbnRTdGF0ZSB9IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL2V2ZW50JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbWJhdGFudFN0YXRlIHtcclxuICBwb3NYOiBudW1iZXI7XHJcbiAgcG9zWTogbnVtYmVyO1xyXG4gIHBvc1o6IG51bWJlcjtcclxuICBoZWFkaW5nOiBudW1iZXI7XHJcbiAgdGFyZ2V0YWJsZTogYm9vbGVhbjtcclxuICBocDogbnVtYmVyO1xyXG4gIG1heEhwOiBudW1iZXI7XHJcbiAgbXA6IG51bWJlcjtcclxuICBtYXhNcDogbnVtYmVyO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwb3NYOiBudW1iZXIsIHBvc1k6IG51bWJlciwgcG9zWjogbnVtYmVyLCBoZWFkaW5nOiBudW1iZXIsXHJcbiAgICAgIHRhcmdldGFibGU6IGJvb2xlYW4sXHJcbiAgICAgIGhwOiBudW1iZXIsIG1heEhwOiBudW1iZXIsIG1wOiBudW1iZXIsIG1heE1wOiBudW1iZXIpIHtcclxuICAgIHRoaXMucG9zWCA9IHBvc1g7XHJcbiAgICB0aGlzLnBvc1kgPSBwb3NZO1xyXG4gICAgdGhpcy5wb3NaID0gcG9zWjtcclxuICAgIHRoaXMuaGVhZGluZyA9IGhlYWRpbmc7XHJcbiAgICB0aGlzLnRhcmdldGFibGUgPSB0YXJnZXRhYmxlO1xyXG4gICAgdGhpcy5ocCA9IGhwO1xyXG4gICAgdGhpcy5tYXhIcCA9IG1heEhwO1xyXG4gICAgdGhpcy5tcCA9IG1wO1xyXG4gICAgdGhpcy5tYXhNcCA9IG1heE1wO1xyXG4gIH1cclxuXHJcbiAgcGFydGlhbENsb25lKHByb3BzOiBQYXJ0aWFsPENvbWJhdGFudFN0YXRlPik6IENvbWJhdGFudFN0YXRlIHtcclxuICAgIHJldHVybiBuZXcgQ29tYmF0YW50U3RhdGUoXHJcbiAgICAgICAgcHJvcHMucG9zWCA/PyB0aGlzLnBvc1gsXHJcbiAgICAgICAgcHJvcHMucG9zWSA/PyB0aGlzLnBvc1ksXHJcbiAgICAgICAgcHJvcHMucG9zWiA/PyB0aGlzLnBvc1osXHJcbiAgICAgICAgcHJvcHMuaGVhZGluZyA/PyB0aGlzLmhlYWRpbmcsXHJcbiAgICAgICAgcHJvcHMudGFyZ2V0YWJsZSA/PyB0aGlzLnRhcmdldGFibGUsXHJcbiAgICAgICAgcHJvcHMuaHAgPz8gdGhpcy5ocCxcclxuICAgICAgICBwcm9wcy5tYXhIcCA/PyB0aGlzLm1heEhwLFxyXG4gICAgICAgIHByb3BzLm1wID8/IHRoaXMubXAsXHJcbiAgICAgICAgcHJvcHMubWF4TXAgPz8gdGhpcy5tYXhNcCk7XHJcbiAgfVxyXG5cclxuICB0b1BsdWdpblN0YXRlKCk6IFBsdWdpbkNvbWJhdGFudFN0YXRlIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIFBvc1g6IHRoaXMucG9zWCxcclxuICAgICAgUG9zWTogdGhpcy5wb3NZLFxyXG4gICAgICBQb3NaOiB0aGlzLnBvc1osXHJcbiAgICAgIEhlYWRpbmc6IHRoaXMuaGVhZGluZyxcclxuICAgICAgQ3VycmVudEhQOiB0aGlzLmhwLFxyXG4gICAgICBNYXhIUDogdGhpcy5tYXhIcCxcclxuICAgICAgQ3VycmVudE1QOiB0aGlzLm1wLFxyXG4gICAgICBNYXhNUDogdGhpcy5tYXhNcCxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiIsIi8vIEF1dG8tZ2VuZXJhdGVkIGZyb20gZ2VuX3BldF9uYW1lcy5weVxyXG4vLyBETyBOT1QgRURJVCBUSElTIEZJTEUgRElSRUNUTFlcclxuXHJcbmltcG9ydCB7IExhbmcgfSBmcm9tICcuL2xhbmd1YWdlcyc7XHJcblxyXG50eXBlIFBldERhdGEgPSB7XHJcbiAgW25hbWUgaW4gTGFuZ106IHJlYWRvbmx5IHN0cmluZ1tdO1xyXG59O1xyXG5cclxuY29uc3QgZGF0YTogUGV0RGF0YSA9IHtcclxuICAnY24nOiBbXHJcbiAgICAn57u/5a6d55+z5YW9JyxcclxuICAgICfpu4Tlrp3nn7Plhb0nLFxyXG4gICAgJ+S8iuW8l+WIqeeJueS5i+eBtScsXHJcbiAgICAn5rOw5Z2m5LmL54G1JyxcclxuICAgICfov6bmpbznvZfkuYvngbUnLFxyXG4gICAgJ+acneaXpeWwj+S7meWlsycsXHJcbiAgICAn5aSV5pyI5bCP5LuZ5aWzJyxcclxuICAgICfovablvI/mta7nqbrngq7loZQnLFxyXG4gICAgJ+ixoeW8j+a1ruepuueCruWhlCcsXHJcbiAgICAn5Lqa54G156We5be05ZOI5aeG54m5JyxcclxuICAgICfkuprngbXnpZ7kuI3mrbvpuJ8nLFxyXG4gICAgJ+eCveWkqeS9vycsXHJcbiAgICAn5pyI6ZW/5a6d55+z5YW9JyxcclxuICAgICfoi7Hpm4TnmoTmjqDlvbEnLFxyXG4gICAgJ+WQjuW8j+iHqui1sOS6uuWBticsXHJcbiAgICAn5YiG6LqrJyxcclxuICBdLFxyXG4gICdkZSc6IFtcclxuICAgICdTbWFyYWdkLUthcmZ1bmtlbCcsXHJcbiAgICAnVG9wYXMtS2FyZnVua2VsJyxcclxuICAgICdJZnJpdC1FZ2knLFxyXG4gICAgJ1RpdGFuLUVnaScsXHJcbiAgICAnR2FydWRhLUVnaScsXHJcbiAgICAnRW9zJyxcclxuICAgICdTZWxlbmUnLFxyXG4gICAgJ1NlbGJzdHNjaHVzcy1HeXJvY29wdGVyIFRVUk0nLFxyXG4gICAgJ1NlbGJzdHNjaHVzcy1HeXJvY29wdGVyIEzDhFVGRVInLFxyXG4gICAgJ0RlbWktQmFoYW11dCcsXHJcbiAgICAnRGVtaS1QaMO2bml4JyxcclxuICAgICdTZXJhcGgnLFxyXG4gICAgJ01vbmRzdGVpbi1LYXJmdW5rZWwnLFxyXG4gICAgJ1NjaGF0dGVuc2NoZW1lbicsXHJcbiAgICAnQXV0b21hdG9uIERBTUUnLFxyXG4gICAgJ0dlZG9wcGVsdGVzIEljaCcsXHJcbiAgXSxcclxuICAnZW4nOiBbXHJcbiAgICAnRW1lcmFsZCBDYXJidW5jbGUnLFxyXG4gICAgJ1RvcGF6IENhcmJ1bmNsZScsXHJcbiAgICAnSWZyaXQtRWdpJyxcclxuICAgICdUaXRhbi1FZ2knLFxyXG4gICAgJ0dhcnVkYS1FZ2knLFxyXG4gICAgJ0VvcycsXHJcbiAgICAnU2VsZW5lJyxcclxuICAgICdSb29rIEF1dG90dXJyZXQnLFxyXG4gICAgJ0Jpc2hvcCBBdXRvdHVycmV0JyxcclxuICAgICdEZW1pLUJhaGFtdXQnLFxyXG4gICAgJ0RlbWktUGhvZW5peCcsXHJcbiAgICAnU2VyYXBoJyxcclxuICAgICdNb29uc3RvbmUgQ2FyYnVuY2xlJyxcclxuICAgICdFc3RlZW0nLFxyXG4gICAgJ0F1dG9tYXRvbiBRdWVlbicsXHJcbiAgICAnQnVuc2hpbicsXHJcbiAgXSxcclxuICAnZnInOiBbXHJcbiAgICAnQ2FyYnVuY2xlIMOpbWVyYXVkZScsXHJcbiAgICAnQ2FyYnVuY2xlIHRvcGF6ZScsXHJcbiAgICAnSWZyaXQtRWdpJyxcclxuICAgICdUaXRhbi1FZ2knLFxyXG4gICAgJ0dhcnVkYS1FZ2knLFxyXG4gICAgJ0VvcycsXHJcbiAgICAnU2VsZW5lJyxcclxuICAgICdBdXRvLXRvdXJlbGxlIFRvdXInLFxyXG4gICAgJ0F1dG8tdG91cmVsbGUgRm91JyxcclxuICAgICdEZW1pLUJhaGFtdXQnLFxyXG4gICAgJ0RlbWktUGjDqW5peCcsXHJcbiAgICAnU8OpcmFwaGluJyxcclxuICAgICdDYXJidW5jbGUgaMOpY2F0b2xpdGUnLFxyXG4gICAgJ0VzdGltZScsXHJcbiAgICAnQXV0b21hdGUgUmVpbmUnLFxyXG4gICAgJ09tYnJlJyxcclxuICBdLFxyXG4gICdqYSc6IFtcclxuICAgICfjgqvjg7zjg5Djg7Pjgq/jg6vjg7vjgqjjg6Hjg6njg6vjg4knLFxyXG4gICAgJ+OCq+ODvOODkOODs+OCr+ODq+ODu+ODiOODkeODvOOCuicsXHJcbiAgICAn44Kk44OV44Oq44O844OI44O744Ko44KuJyxcclxuICAgICfjgr/jgqTjgr/jg7Pjg7vjgqjjgq4nLFxyXG4gICAgJ+OCrOODq+ODvOODgOODu+OCqOOCricsXHJcbiAgICAn44OV44Kn44Ki44Oq44O844O744Ko44Kq44K5JyxcclxuICAgICfjg5XjgqfjgqLjg6rjg7zjg7vjgrvjg6zjg40nLFxyXG4gICAgJ+OCquODvOODiOOCv+ODrOODg+ODiOODu+ODq+ODvOOCrycsXHJcbiAgICAn44Kq44O844OI44K/44Os44OD44OI44O744OT44K344On44OD44OXJyxcclxuICAgICfjg4fjg5/jg7vjg5Djg4/jg6Djg7zjg4gnLFxyXG4gICAgJ+ODh+ODn+ODu+ODleOCp+ODi+ODg+OCr+OCuScsXHJcbiAgICAn44K744Op44OV44Kj44OgJyxcclxuICAgICfjgqvjg7zjg5Djg7Pjgq/jg6vjg7vjg6Djg7zjg7Pjgrnjg4jjg7zjg7MnLFxyXG4gICAgJ+iLsembhOOBruW9sei6qycsXHJcbiAgICAn44Kq44O844OI44Oe44OI44Oz44O744Kv44Kk44O844OzJyxcclxuICAgICfliIbouqsnLFxyXG4gIF0sXHJcbiAgJ2tvJzogW1xyXG4gICAgJ+y5tOuyme2BtCDsl5DrqZTrnoTrk5wnLFxyXG4gICAgJ+y5tOuyme2BtCDthqDtjIzspognLFxyXG4gICAgJ+ydtO2UhOumrO2KuCDsl5DquLAnLFxyXG4gICAgJ+2DgOydtO2DhCDsl5DquLAnLFxyXG4gICAgJ+qwgOujqOuLpCDsl5DquLAnLFxyXG4gICAgJ+yalOyglSDsl5DsmKTsiqQnLFxyXG4gICAgJ+yalOyglSDshYDroIjrhKQnLFxyXG4gICAgJ+yekOuPme2PrO2DkSDro6knLFxyXG4gICAgJ+yekOuPme2PrO2DkSDruYTsiI0nLFxyXG4gICAgJ+uNsOuvuOuwlO2VmOustO2KuCcsXHJcbiAgICAn642w66+47ZS864uJ7IqkJyxcclxuICAgICfshLjrnbztlYwnLFxyXG4gICAgJ+y5tOuyme2BtCDrrLjsiqTthqQnLFxyXG4gICAgJ+yYgeybheydmCDtmZjsmIEnLFxyXG4gICAgJ+yekOuPmeyduO2YlSDtgLgnLFxyXG4gICAgJ+u2hOyLoCcsXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRhdGE7XHJcbiIsImltcG9ydCB7IEpvYiB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2pvYic7XHJcbmltcG9ydCBFbXVsYXRvckNvbW1vbiBmcm9tICcuLi8uLi9FbXVsYXRvckNvbW1vbic7XHJcbmltcG9ydCBMb2dSZXBvc2l0b3J5IGZyb20gJy4vTG9nUmVwb3NpdG9yeSc7XHJcblxyXG5jb25zdCBmaWVsZHMgPSB7XHJcbiAgZXZlbnQ6IDAsXHJcbiAgdGltZXN0YW1wOiAxLFxyXG59IGFzIGNvbnN0O1xyXG5cclxuLyoqXHJcbiAqIEdlbmVyaWMgY2xhc3MgdG8gdHJhY2sgYW4gRkZYSVYgbG9nIGxpbmVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpbmVFdmVudCB7XHJcbiAgcHVibGljIG9mZnNldCA9IDA7XHJcbiAgcHVibGljIGNvbnZlcnRlZExpbmU6IHN0cmluZztcclxuICBwdWJsaWMgaW52YWxpZCA9IGZhbHNlO1xyXG4gIHB1YmxpYyBpbmRleCA9IDA7XHJcbiAgcHVibGljIHJlYWRvbmx5IGRlY0V2ZW50OiBudW1iZXI7XHJcbiAgcHVibGljIHJlYWRvbmx5IGhleEV2ZW50OiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IHRpbWVzdGFtcDogbnVtYmVyO1xyXG4gIHB1YmxpYyByZWFkb25seSBjaGVja3N1bTogc3RyaW5nO1xyXG4gIHB1YmxpYyByZWFkb25seSBwcm9wZXJDYXNlQ29udmVydGVkTGluZT86IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IocmVwbzogTG9nUmVwb3NpdG9yeSwgcHVibGljIG5ldHdvcmtMaW5lOiBzdHJpbmcsIHBhcnRzOiBzdHJpbmdbXSkge1xyXG4gICAgdGhpcy5kZWNFdmVudCA9IHBhcnNlSW50KHBhcnRzW2ZpZWxkcy5ldmVudF0gPz8gJzAnKTtcclxuICAgIHRoaXMuaGV4RXZlbnQgPSBFbXVsYXRvckNvbW1vbi56ZXJvUGFkKHRoaXMuZGVjRXZlbnQudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkpO1xyXG4gICAgdGhpcy50aW1lc3RhbXAgPSBuZXcgRGF0ZShwYXJ0c1tmaWVsZHMudGltZXN0YW1wXSA/PyAnMCcpLmdldFRpbWUoKTtcclxuICAgIHRoaXMuY2hlY2tzdW0gPSBwYXJ0cy5zbGljZSgtMSlbMF0gPz8gJyc7XHJcbiAgICByZXBvLnVwZGF0ZVRpbWVzdGFtcCh0aGlzLnRpbWVzdGFtcCk7XHJcbiAgICB0aGlzLmNvbnZlcnRlZExpbmUgPSB0aGlzLnByZWZpeCgpICsgKHBhcnRzLmpvaW4oJzonKSkucmVwbGFjZSgnfCcsICc6Jyk7XHJcbiAgfVxyXG5cclxuICBwcmVmaXgoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAnWycgKyBFbXVsYXRvckNvbW1vbi50aW1lVG9UaW1lU3RyaW5nKHRoaXMudGltZXN0YW1wLCB0cnVlKSArICddICcgKyB0aGlzLmhleEV2ZW50ICsgJzonO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGlzRGFtYWdlSGFsbG93ZWQoZGFtYWdlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIHJldHVybiAocGFyc2VJbnQoZGFtYWdlLCAxNikgJiBwYXJzZUludCgnMTAwMCcsIDE2KSkgPiAwO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGlzRGFtYWdlQmlnKGRhbWFnZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gKHBhcnNlSW50KGRhbWFnZSwgMTYpICYgcGFyc2VJbnQoJzQwMDAnLCAxNikpID4gMDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBjYWxjdWxhdGVEYW1hZ2UoZGFtYWdlOiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgaWYgKExpbmVFdmVudC5pc0RhbWFnZUhhbGxvd2VkKGRhbWFnZSkpXHJcbiAgICAgIHJldHVybiAwO1xyXG5cclxuICAgIGRhbWFnZSA9IEVtdWxhdG9yQ29tbW9uLnplcm9QYWQoZGFtYWdlLCA4KTtcclxuICAgIGNvbnN0IHBhcnRzID0gW1xyXG4gICAgICBkYW1hZ2Uuc3Vic3RyKDAsIDIpLFxyXG4gICAgICBkYW1hZ2Uuc3Vic3RyKDIsIDIpLFxyXG4gICAgICBkYW1hZ2Uuc3Vic3RyKDQsIDIpLFxyXG4gICAgICBkYW1hZ2Uuc3Vic3RyKDYsIDIpLFxyXG4gICAgXSBhcyBjb25zdDtcclxuXHJcbiAgICBpZiAoIUxpbmVFdmVudC5pc0RhbWFnZUJpZyhkYW1hZ2UpKVxyXG4gICAgICByZXR1cm4gcGFyc2VJbnQocGFydHMuc2xpY2UoMCwgMikucmV2ZXJzZSgpLmpvaW4oJycpLCAxNik7XHJcblxyXG4gICAgcmV0dXJuIHBhcnNlSW50KFxyXG4gICAgICAgIChwYXJ0c1szXSArIHBhcnRzWzBdKSArXHJcbiAgICAgIChwYXJzZUludChwYXJ0c1sxXSwgMTYpIC0gcGFyc2VJbnQocGFydHNbM10sIDE2KVxyXG4gICAgICApLnRvU3RyaW5nKDE2KSwgMTYpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gVHlwZSBndWFyZHMgZm9yIHRoZXNlIGludGVyZmFjZXMgcmVxdWlyZSB0aGVpciBvd24gZGVzY3JpcHRvciBwcm9wZXJ0eVxyXG4vLyBiZWNhdXNlIHdlIGRvbid0IHdhbnQgZXZlcnkgbGluZSBldmVudCB3aXRoIGFuIGlkL25hbWVcclxuLy8gdG8gdXBkYXRlIGNvbWJhdGFudCBzdGF0ZSwgZm9yIGV4YW1wbGVcclxuZXhwb3J0IGludGVyZmFjZSBMaW5lRXZlbnRTb3VyY2UgZXh0ZW5kcyBMaW5lRXZlbnQge1xyXG4gIHJlYWRvbmx5IGlzU291cmNlOiB0cnVlO1xyXG4gIHJlYWRvbmx5IGlkOiBzdHJpbmc7XHJcbiAgcmVhZG9ubHkgbmFtZTogc3RyaW5nO1xyXG4gIHJlYWRvbmx5IHg/OiBudW1iZXI7XHJcbiAgcmVhZG9ubHkgeT86IG51bWJlcjtcclxuICByZWFkb25seSB6PzogbnVtYmVyO1xyXG4gIHJlYWRvbmx5IGhlYWRpbmc/OiBudW1iZXI7XHJcbiAgcmVhZG9ubHkgdGFyZ2V0YWJsZT86IGJvb2xlYW47XHJcbiAgcmVhZG9ubHkgaHA/OiBudW1iZXI7XHJcbiAgcmVhZG9ubHkgbWF4SHA/OiBudW1iZXI7XHJcbiAgcmVhZG9ubHkgbXA/OiBudW1iZXI7XHJcbiAgcmVhZG9ubHkgbWF4TXA/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBpc0xpbmVFdmVudFNvdXJjZSA9IChsaW5lOiBMaW5lRXZlbnQpOiBsaW5lIGlzIExpbmVFdmVudFNvdXJjZSA9PiB7XHJcbiAgcmV0dXJuICdpc1NvdXJjZScgaW4gbGluZTtcclxufTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTGluZUV2ZW50VGFyZ2V0IGV4dGVuZHMgTGluZUV2ZW50IHtcclxuICByZWFkb25seSBpc1RhcmdldDogdHJ1ZTtcclxuICByZWFkb25seSB0YXJnZXRJZDogc3RyaW5nO1xyXG4gIHJlYWRvbmx5IHRhcmdldE5hbWU6IHN0cmluZztcclxuICByZWFkb25seSB0YXJnZXRYPzogbnVtYmVyO1xyXG4gIHJlYWRvbmx5IHRhcmdldFk/OiBudW1iZXI7XHJcbiAgcmVhZG9ubHkgdGFyZ2V0Wj86IG51bWJlcjtcclxuICByZWFkb25seSB0YXJnZXRIZWFkaW5nPzogbnVtYmVyO1xyXG4gIHJlYWRvbmx5IHRhcmdldEhwPzogbnVtYmVyO1xyXG4gIHJlYWRvbmx5IHRhcmdldE1heEhwPzogbnVtYmVyO1xyXG4gIHJlYWRvbmx5IHRhcmdldE1wPzogbnVtYmVyO1xyXG4gIHJlYWRvbmx5IHRhcmdldE1heE1wPzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgaXNMaW5lRXZlbnRUYXJnZXQgPSAobGluZTogTGluZUV2ZW50KTogbGluZSBpcyBMaW5lRXZlbnRUYXJnZXQgPT4ge1xyXG4gIHJldHVybiAnaXNUYXJnZXQnIGluIGxpbmU7XHJcbn07XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExpbmVFdmVudEpvYkxldmVsIGV4dGVuZHMgTGluZUV2ZW50IHtcclxuICByZWFkb25seSBpc0pvYkxldmVsOiB0cnVlO1xyXG4gIHJlYWRvbmx5IGpvYjogSm9iO1xyXG4gIHJlYWRvbmx5IGpvYklkOiBudW1iZXI7XHJcbiAgcmVhZG9ubHkgbGV2ZWw6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGlzTGluZUV2ZW50Sm9iTGV2ZWwgPSAobGluZTogTGluZUV2ZW50KTogbGluZSBpcyBMaW5lRXZlbnRKb2JMZXZlbCA9PiB7XHJcbiAgcmV0dXJuICdpc0pvYkxldmVsJyBpbiBsaW5lO1xyXG59O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBMaW5lRXZlbnRBYmlsaXR5IGV4dGVuZHMgTGluZUV2ZW50IHtcclxuICByZWFkb25seSBpc0FiaWxpdHk6IHRydWU7XHJcbiAgcmVhZG9ubHkgYWJpbGl0eUlkOiBudW1iZXI7XHJcbiAgcmVhZG9ubHkgYWJpbGl0eU5hbWU6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGlzTGluZUV2ZW50QWJpbGl0eSA9IChsaW5lOiBMaW5lRXZlbnQpOiBsaW5lIGlzIExpbmVFdmVudEFiaWxpdHkgPT4ge1xyXG4gIHJldHVybiAnaXNBYmlsaXR5JyBpbiBsaW5lO1xyXG59O1xyXG4iLCJpbXBvcnQgQ29tYmF0YW50IGZyb20gJy4vQ29tYmF0YW50JztcclxuaW1wb3J0IENvbWJhdGFudEpvYlNlYXJjaCBmcm9tICcuL0NvbWJhdGFudEpvYlNlYXJjaCc7XHJcbmltcG9ydCBDb21iYXRhbnRTdGF0ZSBmcm9tICcuL0NvbWJhdGFudFN0YXRlJztcclxuaW1wb3J0IFBldE5hbWVzQnlMYW5nIGZyb20gJy4uLy4uLy4uLy4uL3Jlc291cmNlcy9wZXRfbmFtZXMnO1xyXG5pbXBvcnQgTGluZUV2ZW50LCB7IGlzTGluZUV2ZW50Sm9iTGV2ZWwsIGlzTGluZUV2ZW50QWJpbGl0eSwgaXNMaW5lRXZlbnRTb3VyY2UsIGlzTGluZUV2ZW50VGFyZ2V0LCBMaW5lRXZlbnRTb3VyY2UsIExpbmVFdmVudFRhcmdldCB9IGZyb20gJy4vbmV0d29ya19sb2dfY29udmVydGVyL0xpbmVFdmVudCc7XHJcbmltcG9ydCB7IExhbmcgfSBmcm9tICcuLi8uLi8uLi8uLi9yZXNvdXJjZXMvbGFuZ3VhZ2VzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbWJhdGFudFRyYWNrZXIge1xyXG4gIGxhbmd1YWdlOiBMYW5nO1xyXG4gIGZpcnN0VGltZXN0YW1wOiBudW1iZXI7XHJcbiAgbGFzdFRpbWVzdGFtcDogbnVtYmVyO1xyXG4gIGNvbWJhdGFudHM6IHsgW2lkOiBzdHJpbmddOiBDb21iYXRhbnQgfSA9IHt9O1xyXG4gIHBhcnR5TWVtYmVyczogc3RyaW5nW10gPSBbXTtcclxuICBlbmVtaWVzOiBzdHJpbmdbXSA9IFtdO1xyXG4gIG90aGVyczogc3RyaW5nW10gPSBbXTtcclxuICBwZXRzOiBzdHJpbmdbXSA9IFtdO1xyXG4gIG1haW5Db21iYXRhbnRJRD86IHN0cmluZztcclxuICBpbml0aWFsU3RhdGVzOiB7IFtpZDogc3RyaW5nXTogUGFydGlhbDxDb21iYXRhbnRTdGF0ZT4gfSA9IHt9O1xyXG4gIGNvbnN0cnVjdG9yKGxvZ0xpbmVzOiBMaW5lRXZlbnRbXSwgbGFuZ3VhZ2U6IExhbmcpIHtcclxuICAgIHRoaXMubGFuZ3VhZ2UgPSBsYW5ndWFnZTtcclxuICAgIHRoaXMuZmlyc3RUaW1lc3RhbXAgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcclxuICAgIHRoaXMubGFzdFRpbWVzdGFtcCA9IDA7XHJcbiAgICB0aGlzLmluaXRpYWxpemUobG9nTGluZXMpO1xyXG4gICAgLy8gQ2xlYXIgaW5pdGlhbFN0YXRlcyBhZnRlciB3ZSBpbml0aWFsaXplLCB3ZSBkb24ndCBuZWVkIGl0IGFueW1vcmVcclxuICAgIHRoaXMuaW5pdGlhbFN0YXRlcyA9IHt9O1xyXG4gIH1cclxuXHJcbiAgaW5pdGlhbGl6ZShsb2dMaW5lczogTGluZUV2ZW50W10pOiB2b2lkIHtcclxuICAgIC8vIEZpcnN0IHBhc3M6IEdldCBsaXN0IG9mIGNvbWJhdGFudHMsIGZpZ3VyZSBvdXQgd2hlcmUgdGhleVxyXG4gICAgLy8gc3RhcnQgYXQgaWYgcG9zc2libGVcclxuICAgIGZvciAoY29uc3QgbGluZSBvZiBsb2dMaW5lcykge1xyXG4gICAgICB0aGlzLmZpcnN0VGltZXN0YW1wID0gTWF0aC5taW4odGhpcy5maXJzdFRpbWVzdGFtcCwgbGluZS50aW1lc3RhbXApO1xyXG4gICAgICB0aGlzLmxhc3RUaW1lc3RhbXAgPSBNYXRoLm1heCh0aGlzLmxhc3RUaW1lc3RhbXAsIGxpbmUudGltZXN0YW1wKTtcclxuXHJcbiAgICAgIGlmIChpc0xpbmVFdmVudFNvdXJjZShsaW5lKSlcclxuICAgICAgICB0aGlzLmFkZENvbWJhdGFudEZyb21MaW5lKGxpbmUpO1xyXG5cclxuICAgICAgaWYgKGlzTGluZUV2ZW50VGFyZ2V0KGxpbmUpKVxyXG4gICAgICAgIHRoaXMuYWRkQ29tYmF0YW50RnJvbVRhcmdldExpbmUobGluZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQmV0d2VlbiBwYXNzZXM6IENyZWF0ZSBvdXIgaW5pdGlhbCBjb21iYXRhbnQgc3RhdGVzXHJcbiAgICBmb3IgKGNvbnN0IGlkIGluIHRoaXMuaW5pdGlhbFN0YXRlcykge1xyXG4gICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuaW5pdGlhbFN0YXRlc1tpZF0gPz8ge307XHJcbiAgICAgIHRoaXMuY29tYmF0YW50c1tpZF0/LnB1c2hTdGF0ZSh0aGlzLmZpcnN0VGltZXN0YW1wLCBuZXcgQ29tYmF0YW50U3RhdGUoXHJcbiAgICAgICAgICBOdW1iZXIoc3RhdGUucG9zWCksXHJcbiAgICAgICAgICBOdW1iZXIoc3RhdGUucG9zWSksXHJcbiAgICAgICAgICBOdW1iZXIoc3RhdGUucG9zWiksXHJcbiAgICAgICAgICBOdW1iZXIoc3RhdGUuaGVhZGluZyksXHJcbiAgICAgICAgICBzdGF0ZS50YXJnZXRhYmxlID8/IGZhbHNlLFxyXG4gICAgICAgICAgTnVtYmVyKHN0YXRlLmhwKSxcclxuICAgICAgICAgIE51bWJlcihzdGF0ZS5tYXhIcCksXHJcbiAgICAgICAgICBOdW1iZXIoc3RhdGUubXApLFxyXG4gICAgICAgICAgTnVtYmVyKHN0YXRlLm1heE1wKSxcclxuICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2Vjb25kIHBhc3M6IEFuYWx5emUgY29tYmF0YW50IGluZm9ybWF0aW9uIGZvciB0cmFja2luZ1xyXG4gICAgY29uc3QgZXZlbnRUcmFja2VyOiB7IFtrZXk6IHN0cmluZ106IG51bWJlciB9ID0ge307XHJcbiAgICBmb3IgKGNvbnN0IGxpbmUgb2YgbG9nTGluZXMpIHtcclxuICAgICAgaWYgKGlzTGluZUV2ZW50U291cmNlKGxpbmUpKSB7XHJcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLmV4dHJhY3RTdGF0ZUZyb21MaW5lKGxpbmUpO1xyXG4gICAgICAgIGlmIChzdGF0ZSkge1xyXG4gICAgICAgICAgZXZlbnRUcmFja2VyW2xpbmUuaWRdID0gZXZlbnRUcmFja2VyW2xpbmUuaWRdID8/IDA7XHJcbiAgICAgICAgICArK2V2ZW50VHJhY2tlcltsaW5lLmlkXTtcclxuICAgICAgICAgIHRoaXMuY29tYmF0YW50c1tsaW5lLmlkXT8ucHVzaFBhcnRpYWxTdGF0ZShsaW5lLnRpbWVzdGFtcCwgc3RhdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoaXNMaW5lRXZlbnRUYXJnZXQobGluZSkpIHtcclxuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuZXh0cmFjdFN0YXRlRnJvbVRhcmdldExpbmUobGluZSk7XHJcbiAgICAgICAgaWYgKHN0YXRlKSB7XHJcbiAgICAgICAgICBldmVudFRyYWNrZXJbbGluZS50YXJnZXRJZF0gPSBldmVudFRyYWNrZXJbbGluZS50YXJnZXRJZF0gPz8gMDtcclxuICAgICAgICAgICsrZXZlbnRUcmFja2VyW2xpbmUudGFyZ2V0SWRdO1xyXG4gICAgICAgICAgdGhpcy5jb21iYXRhbnRzW2xpbmUudGFyZ2V0SWRdPy5wdXNoUGFydGlhbFN0YXRlKGxpbmUudGltZXN0YW1wLCBzdGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRmlndXJlIG91dCBwYXJ0eS9lbmVteS9vdGhlciBzdGF0dXNcclxuICAgIGNvbnN0IHBldE5hbWVzID0gUGV0TmFtZXNCeUxhbmdbdGhpcy5sYW5ndWFnZV07XHJcbiAgICB0aGlzLm90aGVycyA9IHRoaXMub3RoZXJzLmZpbHRlcigoSUQpID0+IHtcclxuICAgICAgaWYgKHRoaXMuY29tYmF0YW50c1tJRF0/LmpvYiAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgdGhpcy5jb21iYXRhbnRzW0lEXT8uam9iICE9PSAnTk9ORScgJiZcclxuICAgICAgICBJRC5zdGFydHNXaXRoKCcxJykpIHtcclxuICAgICAgICB0aGlzLnBhcnR5TWVtYmVycy5wdXNoKElEKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH0gZWxzZSBpZiAocGV0TmFtZXMuaW5jbHVkZXModGhpcy5jb21iYXRhbnRzW0lEXT8ubmFtZSA/PyAnJykpIHtcclxuICAgICAgICB0aGlzLnBldHMucHVzaChJRCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9IGVsc2UgaWYgKChldmVudFRyYWNrZXJbSURdID8/IDApID4gMCkge1xyXG4gICAgICAgIHRoaXMuZW5lbWllcy5wdXNoKElEKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBNYWluIGNvbWJhdGFudCBpcyB0aGUgb25lIHRoYXQgdG9vayB0aGUgbW9zdCBhY3Rpb25zXHJcbiAgICB0aGlzLm1haW5Db21iYXRhbnRJRCA9IHRoaXMuZW5lbWllcy5zb3J0KChsLCByKSA9PiB7XHJcbiAgICAgIHJldHVybiAoZXZlbnRUcmFja2VyW3JdID8/IDApIC0gKGV2ZW50VHJhY2tlcltsXSA/PyAwKTtcclxuICAgIH0pWzBdO1xyXG4gIH1cclxuXHJcbiAgYWRkQ29tYmF0YW50RnJvbUxpbmUobGluZTogTGluZUV2ZW50U291cmNlKTogdm9pZCB7XHJcbiAgICBjb25zdCBjb21iYXRhbnQgPSB0aGlzLmluaXRDb21iYXRhbnQobGluZS5pZCwgbGluZS5uYW1lKTtcclxuICAgIGNvbnN0IGluaXRTdGF0ZSA9IHRoaXMuaW5pdGlhbFN0YXRlc1tsaW5lLmlkXSA/PyB7fTtcclxuXHJcbiAgICBjb25zdCBleHRyYWN0ZWRTdGF0ZSA9IHRoaXMuZXh0cmFjdFN0YXRlRnJvbUxpbmUobGluZSkgPz8ge307XHJcblxyXG4gICAgaW5pdFN0YXRlLnBvc1ggPSBpbml0U3RhdGUucG9zWCA/PyBleHRyYWN0ZWRTdGF0ZS5wb3NYO1xyXG4gICAgaW5pdFN0YXRlLnBvc1kgPSBpbml0U3RhdGUucG9zWSA/PyBleHRyYWN0ZWRTdGF0ZS5wb3NZO1xyXG4gICAgaW5pdFN0YXRlLnBvc1ogPSBpbml0U3RhdGUucG9zWiA/PyBleHRyYWN0ZWRTdGF0ZS5wb3NaO1xyXG4gICAgaW5pdFN0YXRlLmhlYWRpbmcgPSBpbml0U3RhdGUuaGVhZGluZyA/PyBleHRyYWN0ZWRTdGF0ZS5oZWFkaW5nO1xyXG4gICAgaW5pdFN0YXRlLnRhcmdldGFibGUgPSBpbml0U3RhdGUudGFyZ2V0YWJsZSA/PyBleHRyYWN0ZWRTdGF0ZS50YXJnZXRhYmxlO1xyXG4gICAgaW5pdFN0YXRlLmhwID0gaW5pdFN0YXRlLmhwID8/IGV4dHJhY3RlZFN0YXRlLmhwO1xyXG4gICAgaW5pdFN0YXRlLm1heEhwID0gaW5pdFN0YXRlLm1heEhwID8/IGV4dHJhY3RlZFN0YXRlLm1heEhwO1xyXG4gICAgaW5pdFN0YXRlLm1wID0gaW5pdFN0YXRlLm1wID8/IGV4dHJhY3RlZFN0YXRlLm1wO1xyXG4gICAgaW5pdFN0YXRlLm1heE1wID0gaW5pdFN0YXRlLm1heE1wID8/IGV4dHJhY3RlZFN0YXRlLm1heE1wO1xyXG5cclxuICAgIGlmIChpc0xpbmVFdmVudEpvYkxldmVsKGxpbmUpKSB7XHJcbiAgICAgIGNvbWJhdGFudC5qb2IgPSB0aGlzLmNvbWJhdGFudHNbbGluZS5pZF0/LmpvYiA/PyBsaW5lLmpvYjtcclxuICAgICAgY29tYmF0YW50LmxldmVsID0gdGhpcy5jb21iYXRhbnRzW2xpbmUuaWRdPy5sZXZlbCA/PyBsaW5lLmxldmVsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpc0xpbmVFdmVudEFiaWxpdHkobGluZSkpIHtcclxuICAgICAgaWYgKCFjb21iYXRhbnQuam9iICYmICFsaW5lLmlkLnN0YXJ0c1dpdGgoJzQnKSAmJiBsaW5lLmFiaWxpdHlJZCAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIGNvbWJhdGFudC5qb2IgPSBDb21iYXRhbnRKb2JTZWFyY2guZ2V0Sm9iKGxpbmUuYWJpbGl0eUlkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFkZENvbWJhdGFudEZyb21UYXJnZXRMaW5lKGxpbmU6IExpbmVFdmVudFRhcmdldCk6IHZvaWQge1xyXG4gICAgdGhpcy5pbml0Q29tYmF0YW50KGxpbmUudGFyZ2V0SWQsIGxpbmUudGFyZ2V0TmFtZSk7XHJcbiAgICBjb25zdCBpbml0U3RhdGUgPSB0aGlzLmluaXRpYWxTdGF0ZXNbbGluZS50YXJnZXRJZF0gPz8ge307XHJcblxyXG4gICAgY29uc3QgZXh0cmFjdGVkU3RhdGUgPSB0aGlzLmV4dHJhY3RTdGF0ZUZyb21UYXJnZXRMaW5lKGxpbmUpID8/IHt9O1xyXG5cclxuICAgIGluaXRTdGF0ZS5wb3NYID0gaW5pdFN0YXRlLnBvc1ggPz8gZXh0cmFjdGVkU3RhdGUucG9zWDtcclxuICAgIGluaXRTdGF0ZS5wb3NZID0gaW5pdFN0YXRlLnBvc1kgPz8gZXh0cmFjdGVkU3RhdGUucG9zWTtcclxuICAgIGluaXRTdGF0ZS5wb3NaID0gaW5pdFN0YXRlLnBvc1ogPz8gZXh0cmFjdGVkU3RhdGUucG9zWjtcclxuICAgIGluaXRTdGF0ZS5oZWFkaW5nID0gaW5pdFN0YXRlLmhlYWRpbmcgPz8gZXh0cmFjdGVkU3RhdGUuaGVhZGluZztcclxuICAgIGluaXRTdGF0ZS5ocCA9IGluaXRTdGF0ZS5ocCA/PyBleHRyYWN0ZWRTdGF0ZS5ocDtcclxuICAgIGluaXRTdGF0ZS5tYXhIcCA9IGluaXRTdGF0ZS5tYXhIcCA/PyBleHRyYWN0ZWRTdGF0ZS5tYXhIcDtcclxuICAgIGluaXRTdGF0ZS5tcCA9IGluaXRTdGF0ZS5tcCA/PyBleHRyYWN0ZWRTdGF0ZS5tcDtcclxuICAgIGluaXRTdGF0ZS5tYXhNcCA9IGluaXRTdGF0ZS5tYXhNcCA/PyBleHRyYWN0ZWRTdGF0ZS5tYXhNcDtcclxuICB9XHJcblxyXG4gIGV4dHJhY3RTdGF0ZUZyb21MaW5lKGxpbmU6IExpbmVFdmVudFNvdXJjZSk6IFBhcnRpYWw8Q29tYmF0YW50U3RhdGU+IHtcclxuICAgIGNvbnN0IHN0YXRlOiBQYXJ0aWFsPENvbWJhdGFudFN0YXRlPiA9IHt9O1xyXG5cclxuICAgIGlmIChsaW5lLnggIT09IHVuZGVmaW5lZClcclxuICAgICAgc3RhdGUucG9zWCA9IGxpbmUueDtcclxuICAgIGlmIChsaW5lLnkgIT09IHVuZGVmaW5lZClcclxuICAgICAgc3RhdGUucG9zWSA9IGxpbmUueTtcclxuICAgIGlmIChsaW5lLnogIT09IHVuZGVmaW5lZClcclxuICAgICAgc3RhdGUucG9zWiA9IGxpbmUuejtcclxuICAgIGlmIChsaW5lLmhlYWRpbmcgIT09IHVuZGVmaW5lZClcclxuICAgICAgc3RhdGUuaGVhZGluZyA9IGxpbmUuaGVhZGluZztcclxuICAgIGlmIChsaW5lLnRhcmdldGFibGUgIT09IHVuZGVmaW5lZClcclxuICAgICAgc3RhdGUudGFyZ2V0YWJsZSA9IGxpbmUudGFyZ2V0YWJsZTtcclxuICAgIGlmIChsaW5lLmhwICE9PSB1bmRlZmluZWQpXHJcbiAgICAgIHN0YXRlLmhwID0gbGluZS5ocDtcclxuICAgIGlmIChsaW5lLm1heEhwICE9PSB1bmRlZmluZWQpXHJcbiAgICAgIHN0YXRlLm1heEhwID0gbGluZS5tYXhIcDtcclxuICAgIGlmIChsaW5lLm1wICE9PSB1bmRlZmluZWQpXHJcbiAgICAgIHN0YXRlLm1wID0gbGluZS5tcDtcclxuICAgIGlmIChsaW5lLm1heE1wICE9PSB1bmRlZmluZWQpXHJcbiAgICAgIHN0YXRlLm1heE1wID0gbGluZS5tYXhNcDtcclxuXHJcbiAgICByZXR1cm4gc3RhdGU7XHJcbiAgfVxyXG5cclxuICBleHRyYWN0U3RhdGVGcm9tVGFyZ2V0TGluZShsaW5lOiBMaW5lRXZlbnRUYXJnZXQpOiBQYXJ0aWFsPENvbWJhdGFudFN0YXRlPiB7XHJcbiAgICBjb25zdCBzdGF0ZTogUGFydGlhbDxDb21iYXRhbnRTdGF0ZT4gPSB7fTtcclxuXHJcbiAgICBpZiAobGluZS50YXJnZXRYICE9PSB1bmRlZmluZWQpXHJcbiAgICAgIHN0YXRlLnBvc1ggPSBsaW5lLnRhcmdldFg7XHJcbiAgICBpZiAobGluZS50YXJnZXRZICE9PSB1bmRlZmluZWQpXHJcbiAgICAgIHN0YXRlLnBvc1kgPSBsaW5lLnRhcmdldFk7XHJcbiAgICBpZiAobGluZS50YXJnZXRaICE9PSB1bmRlZmluZWQpXHJcbiAgICAgIHN0YXRlLnBvc1ogPSBsaW5lLnRhcmdldFo7XHJcbiAgICBpZiAobGluZS50YXJnZXRIZWFkaW5nICE9PSB1bmRlZmluZWQpXHJcbiAgICAgIHN0YXRlLmhlYWRpbmcgPSBsaW5lLnRhcmdldEhlYWRpbmc7XHJcbiAgICBpZiAobGluZS50YXJnZXRIcCAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICBzdGF0ZS5ocCA9IGxpbmUudGFyZ2V0SHA7XHJcbiAgICBpZiAobGluZS50YXJnZXRNYXhIcCAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICBzdGF0ZS5tYXhIcCA9IGxpbmUudGFyZ2V0TWF4SHA7XHJcbiAgICBpZiAobGluZS50YXJnZXRNcCAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICBzdGF0ZS5tcCA9IGxpbmUudGFyZ2V0TXA7XHJcbiAgICBpZiAobGluZS50YXJnZXRNYXhNcCAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICBzdGF0ZS5tYXhNcCA9IGxpbmUudGFyZ2V0TWF4TXA7XHJcblxyXG4gICAgcmV0dXJuIHN0YXRlO1xyXG4gIH1cclxuXHJcbiAgaW5pdENvbWJhdGFudChpZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcpOiBDb21iYXRhbnQge1xyXG4gICAgbGV0IGNvbWJhdGFudCA9IHRoaXMuY29tYmF0YW50c1tpZF07XHJcbiAgICBpZiAoY29tYmF0YW50ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgY29tYmF0YW50ID0gdGhpcy5jb21iYXRhbnRzW2lkXSA9IG5ldyBDb21iYXRhbnQoaWQsIG5hbWUpO1xyXG4gICAgICB0aGlzLm90aGVycy5wdXNoKGlkKTtcclxuICAgICAgdGhpcy5pbml0aWFsU3RhdGVzW2lkXSA9IHtcclxuICAgICAgICB0YXJnZXRhYmxlOiB0cnVlLFxyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIGlmIChjb21iYXRhbnQubmFtZSA9PT0gJycpIHtcclxuICAgICAgY29tYmF0YW50LnNldE5hbWUobmFtZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY29tYmF0YW50O1xyXG4gIH1cclxuXHJcbiAgZ2V0TWFpbkNvbWJhdGFudE5hbWUoKTogc3RyaW5nIHtcclxuICAgIGlmICh0aGlzLm1haW5Db21iYXRhbnRJRClcclxuICAgICAgcmV0dXJuIHRoaXMuY29tYmF0YW50c1t0aGlzLm1haW5Db21iYXRhbnRJRF0/Lm5hbWUgPz8gJ1Vua25vd24nO1xyXG4gICAgcmV0dXJuICdVbmtub3duJztcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IHR5cGUgQ29tYmF0YW50ID0ge1xyXG4gIG5hbWU/OiBzdHJpbmc7XHJcbiAgam9iPzogc3RyaW5nO1xyXG4gIHNwYXduOiBudW1iZXI7XHJcbiAgZGVzcGF3bjogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dSZXBvc2l0b3J5IHtcclxuICBDb21iYXRhbnRzOiB7IFtpZDogc3RyaW5nXTogQ29tYmF0YW50IH0gPSB7fTtcclxuICBmaXJzdFRpbWVzdGFtcCA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xyXG5cclxuICB1cGRhdGVUaW1lc3RhbXAodGltZXN0YW1wOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIHRoaXMuZmlyc3RUaW1lc3RhbXAgPSBNYXRoLm1pbih0aGlzLmZpcnN0VGltZXN0YW1wLCB0aW1lc3RhbXApO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlQ29tYmF0YW50KGlkOiBzdHJpbmcsIGM6IENvbWJhdGFudCk6IHZvaWQge1xyXG4gICAgaWQgPSBpZC50b1VwcGVyQ2FzZSgpO1xyXG4gICAgaWYgKGlkICYmIGlkLmxlbmd0aCkge1xyXG4gICAgICBsZXQgY29tYmF0YW50ID0gdGhpcy5Db21iYXRhbnRzW2lkXTtcclxuICAgICAgaWYgKGNvbWJhdGFudCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY29tYmF0YW50ID0ge1xyXG4gICAgICAgICAgbmFtZTogYy5uYW1lLFxyXG4gICAgICAgICAgam9iOiBjLmpvYixcclxuICAgICAgICAgIHNwYXduOiBjLnNwYXduLFxyXG4gICAgICAgICAgZGVzcGF3bjogYy5kZXNwYXduLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5Db21iYXRhbnRzW2lkXSA9IGNvbWJhdGFudDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb21iYXRhbnQubmFtZSA9IGMubmFtZSB8fCBjb21iYXRhbnQubmFtZTtcclxuICAgICAgICBjb21iYXRhbnQuam9iID0gYy5qb2IgfHwgY29tYmF0YW50LmpvYjtcclxuICAgICAgICBjb21iYXRhbnQuc3Bhd24gPSBNYXRoLm1pbihjb21iYXRhbnQuc3Bhd24sIGMuc3Bhd24pO1xyXG4gICAgICAgIGNvbWJhdGFudC5kZXNwYXduID0gTWF0aC5tYXgoY29tYmF0YW50LmRlc3Bhd24sIGMuZGVzcGF3bik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlc29sdmVOYW1lKFxyXG4gICAgICBpZDogc3RyaW5nLFxyXG4gICAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICAgIGZhbGxiYWNrSWQ6IHN0cmluZyB8IG51bGwgPSBudWxsLFxyXG4gICAgICBmYWxsYmFja05hbWU6IHN0cmluZyB8IG51bGwgPSBudWxsKTogc3RyaW5nIHtcclxuICAgIGxldCByZXQgPSBuYW1lO1xyXG5cclxuICAgIGlmIChmYWxsYmFja0lkICE9PSBudWxsKSB7XHJcbiAgICAgIGlmIChpZCA9PT0gJ0UwMDAwMDAwJyAmJiByZXQgPT09ICcnKSB7XHJcbiAgICAgICAgaWYgKGZhbGxiYWNrSWQuc3RhcnRzV2l0aCgnNCcpKVxyXG4gICAgICAgICAgcmV0ID0gZmFsbGJhY2tOYW1lID8/ICcnO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgIHJldCA9ICdVbmtub3duJztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChyZXQgPT09ICcnKVxyXG4gICAgICByZXQgPSB0aGlzLkNvbWJhdGFudHNbaWRdPy5uYW1lID8/ICcnO1xyXG5cclxuICAgIHJldHVybiByZXQ7XHJcbiAgfVxyXG59XHJcbiIsIi8vIEV2ZW50QnVzIGJ5IGRlZmluaXRpb24gcmVxdWlyZXMgZ2VuZXJpYyBwYXJhbWV0ZXJzLlxyXG4vLyBNYXAgb3VyIHN0YW5kLWluIGdlbmVyaWNzIHRvIGFjdHVhbCBnZW5lcmljcyBoZXJlLlxyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10eXBlc1xyXG50eXBlIFNjb3BlID0gb2JqZWN0O1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG50eXBlIFBhcmFtID0gYW55O1xyXG5cclxudHlwZSBDYWxsYmFja0Z1bmN0aW9uID0gKC4uLmFyZ3M6IFBhcmFtKSA9PiAodm9pZCB8IFByb21pc2U8dm9pZD4pO1xyXG50eXBlIEV2ZW50TWFwRW50cnkgPSB7XHJcbiAgZXZlbnQ6IHN0cmluZztcclxuICBzY29wZTogU2NvcGU7XHJcbiAgY2FsbGJhY2s6IENhbGxiYWNrRnVuY3Rpb247XHJcbn07XHJcbnR5cGUgRXZlbnRNYXAgPSB7IFtldmVudDogc3RyaW5nXTogRXZlbnRNYXBFbnRyeVtdIH07XHJcblxyXG4vKipcclxuICogVGhpcyBpcyBhIGJhc2UgY2xhc3MgdGhhdCBjbGFzc2VzIGNhbiBleHRlbmQgdG8gaW5oZXJpdCBldmVudCBidXMgY2FwYWJpbGl0aWVzLlxyXG4gKiBUaGlzIGFsbG93cyBvdGhlciBjbGFzc2VzIHRvIGxpc3RlbiBmb3IgZXZlbnRzIHdpdGggdGhlIGBvbmAgZnVuY3Rpb24uXHJcbiAqIFRoZSBpbmhlcml0aW5nIGNsYXNzIGNhbiBmaXJlIHRob3NlIGV2ZW50cyB3aXRoIHRoZSBgZGlzcGF0Y2hgIGZ1bmN0aW9uLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRCdXMge1xyXG4gIHByaXZhdGUgbGlzdGVuZXJzOiBFdmVudE1hcCA9IHt9O1xyXG4gIC8qKlxyXG4gICAqIFN1YnNjcmliZSB0byBhbiBldmVudFxyXG4gICAqXHJcbiAgICogQHBhcmFtIGV2ZW50IFRoZSBldmVudChzKSB0byBzdWJzY3JpYmUgdG8sIHNwYWNlIHNlcGFyYXRlZFxyXG4gICAqIEBwYXJhbSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgdG8gaW52b2tlXHJcbiAgICogQHBhcmFtIHNjb3BlIE9wdGlvbmFsLiBUaGUgc2NvcGUgdG8gYXBwbHkgdGhlIGZ1bmN0aW9uIGFnYWluc3RcclxuICAgKiBAcmV0dXJucyBUaGUgY2FsbGJhY2tzIHJlZ2lzdGVyZWQgdG8gdGhlIGV2ZW50KHMpXHJcbiAgICovXHJcbiAgb24oZXZlbnQ6IHN0cmluZywgY2FsbGJhY2s/OiBDYWxsYmFja0Z1bmN0aW9uLCBzY29wZT86IFNjb3BlKTogRXZlbnRNYXBFbnRyeVtdIHtcclxuICAgIGNvbnN0IGV2ZW50cyA9IGV2ZW50LnNwbGl0KCcgJyk7XHJcbiAgICBjb25zdCByZXQ6IEV2ZW50TWFwRW50cnlbXSA9IFtdO1xyXG4gICAgc2NvcGUgPSBzY29wZSA/PyAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyB7fSA6IHdpbmRvdyk7XHJcbiAgICBmb3IgKGNvbnN0IGV2ZW50IG9mIGV2ZW50cykge1xyXG4gICAgICBjb25zdCBldmVudHM6IEV2ZW50TWFwRW50cnlbXSA9IHRoaXMubGlzdGVuZXJzW2V2ZW50XSA/Pz0gW107XHJcbiAgICAgIGlmIChjYWxsYmFjayAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIGV2ZW50cy5wdXNoKHsgZXZlbnQ6IGV2ZW50LCBzY29wZTogc2NvcGUsIGNhbGxiYWNrOiBjYWxsYmFjayB9KTtcclxuICAgICAgcmV0LnB1c2goLi4uKHRoaXMubGlzdGVuZXJzW2V2ZW50XSA/PyBbXSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJldDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERpc3BhdGNoIGFuIGV2ZW50IHRvIGFueSBzdWJzY3JpYmVyc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIGV2ZW50IFRoZSBldmVudCB0byBkaXNwYXRjaFxyXG4gICAqIEBwYXJhbSBldmVudEFyZ3VtZW50cyBUaGUgZXZlbnQgYXJndW1lbnRzIHRvIHBhc3MgdG8gbGlzdGVuZXJzXHJcbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgY2FuIGJlIGF3YWl0J2Qgb3IgaWdub3JlZFxyXG4gICAqL1xyXG4gIGFzeW5jIGRpc3BhdGNoKGV2ZW50OiBzdHJpbmcsIC4uLmV2ZW50QXJndW1lbnRzOiBQYXJhbSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgaWYgKHRoaXMubGlzdGVuZXJzW2V2ZW50XSA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICByZXR1cm47XHJcblxyXG4gICAgZm9yIChjb25zdCBsIG9mIHRoaXMubGlzdGVuZXJzW2V2ZW50XSA/PyBbXSkge1xyXG4gICAgICBjb25zdCByZXMgPSBsLmNhbGxiYWNrLmFwcGx5KGwuc2NvcGUsIGV2ZW50QXJndW1lbnRzKTtcclxuICAgICAgYXdhaXQgUHJvbWlzZS5yZXNvbHZlKHJlcyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBMaW5lRXZlbnQgZnJvbSAnLi9MaW5lRXZlbnQnO1xyXG5pbXBvcnQgTG9nUmVwb3NpdG9yeSBmcm9tICcuL0xvZ1JlcG9zaXRvcnknO1xyXG5cclxuY29uc3QgZmllbGRzID0ge1xyXG4gIHR5cGU6IDIsXHJcbiAgc3BlYWtlcjogMyxcclxufSBhcyBjb25zdDtcclxuXHJcbi8vIENoYXQgZXZlbnRcclxuZXhwb3J0IGNsYXNzIExpbmVFdmVudDB4MDAgZXh0ZW5kcyBMaW5lRXZlbnQge1xyXG4gIHB1YmxpYyByZWFkb25seSB0eXBlOiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IHNwZWFrZXI6IHN0cmluZztcclxuICBwdWJsaWMgcmVhZG9ubHkgbWVzc2FnZTogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihyZXBvOiBMb2dSZXBvc2l0b3J5LCBsaW5lOiBzdHJpbmcsIHBhcnRzOiBzdHJpbmdbXSkge1xyXG4gICAgc3VwZXIocmVwbywgbGluZSwgcGFydHMpO1xyXG5cclxuICAgIHRoaXMudHlwZSA9IHBhcnRzW2ZpZWxkcy50eXBlXSA/PyAnJztcclxuICAgIHRoaXMuc3BlYWtlciA9IHBhcnRzW2ZpZWxkcy5zcGVha2VyXSA/PyAnJztcclxuICAgIHRoaXMubWVzc2FnZSA9IHBhcnRzLnNsaWNlKDQsIC0xKS5qb2luKCd8Jyk7XHJcblxyXG4gICAgLy8gVGhlIGV4YWN0IHJlYXNvbiBmb3IgdGhpcyBjaGVjayBpc24ndCBjbGVhciBhbnltb3JlIGJ1dCBtYXkgYmUgcmVsYXRlZCB0b1xyXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3JhdmFobi9GRlhJVl9BQ1RfUGx1Z2luL2lzc3Vlcy8yNTBcclxuICAgIGlmICh0aGlzLm1lc3NhZ2Uuc3BsaXQoJ1xcdTAwMWZcXHUwMDFmJykubGVuZ3RoID4gMSlcclxuICAgICAgdGhpcy5pbnZhbGlkID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLmNvbnZlcnRlZExpbmUgPVxyXG4gICAgICB0aGlzLnByZWZpeCgpICsgdGhpcy50eXBlICsgJzonICtcclxuICAgICAgICAvLyBJZiBzcGVha2VyIGlzIGJsYW5rLCBpdCdzIGV4Y2x1ZGVkIGZyb20gdGhlIGNvbnZlcnRlZCBsaW5lXHJcbiAgICAgICAgKHRoaXMuc3BlYWtlciAhPT0gJycgPyB0aGlzLnNwZWFrZXIgKyAnOicgOiAnJykgK1xyXG4gICAgICAgIHRoaXMubWVzc2FnZS50cmltKCk7XHJcbiAgICB0aGlzLmNvbnZlcnRlZExpbmUgPSBMaW5lRXZlbnQwMC5yZXBsYWNlQ2hhdFN5bWJvbHModGhpcy5jb252ZXJ0ZWRMaW5lKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyByZXBsYWNlQ2hhdFN5bWJvbHMobGluZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGZvciAoY29uc3QgcmVwIG9mIExpbmVFdmVudDAwLmNoYXRTeW1ib2xSZXBsYWNlbWVudHMpXHJcbiAgICAgIGxpbmUgPSBsaW5lLnJlcGxhY2UocmVwLlNlYXJjaCwgcmVwLlJlcGxhY2UpO1xyXG5cclxuICAgIHJldHVybiBsaW5lO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGNoYXRTeW1ib2xSZXBsYWNlbWVudHMgPSBbXHJcbiAgICB7XHJcbiAgICAgIFNlYXJjaDogLzpcXHVFMDZGL2csXHJcbiAgICAgIFJlcGxhY2U6ICc64oeSJyxcclxuICAgICAgVHlwZTogJ1N5bWJvbCcsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBTZWFyY2g6IC8gXFx1RTBCQlxcdUUwNUMvZyxcclxuICAgICAgUmVwbGFjZTogJyAnLFxyXG4gICAgICBUeXBlOiAnUG9zaXRpdmUgRWZmZWN0JyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIFNlYXJjaDogLyBcXHVFMEJCXFx1RTA1Qi9nLFxyXG4gICAgICBSZXBsYWNlOiAnICcsXHJcbiAgICAgIFR5cGU6ICdOZWdhdGl2ZSBFZmZlY3QnLFxyXG4gICAgfSxcclxuICBdO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTGluZUV2ZW50MDAgZXh0ZW5kcyBMaW5lRXZlbnQweDAwIHt9XHJcbiIsImltcG9ydCBMaW5lRXZlbnQgZnJvbSAnLi9MaW5lRXZlbnQnO1xyXG5pbXBvcnQgRW11bGF0b3JDb21tb24gZnJvbSAnLi4vLi4vRW11bGF0b3JDb21tb24nO1xyXG5pbXBvcnQgTG9nUmVwb3NpdG9yeSBmcm9tICcuL0xvZ1JlcG9zaXRvcnknO1xyXG5cclxuY29uc3QgZmllbGRzID0ge1xyXG4gIHpvbmVJZDogMixcclxuICB6b25lTmFtZTogMyxcclxufSBhcyBjb25zdDtcclxuXHJcbi8vIFpvbmUgY2hhbmdlIGV2ZW50XHJcbmV4cG9ydCBjbGFzcyBMaW5lRXZlbnQweDAxIGV4dGVuZHMgTGluZUV2ZW50IHtcclxuICBwdWJsaWMgcmVhZG9ubHkgcHJvcGVyQ2FzZUNvbnZlcnRlZExpbmU6IHN0cmluZztcclxuXHJcbiAgcHVibGljIHJlYWRvbmx5IHpvbmVJZDogc3RyaW5nO1xyXG4gIHB1YmxpYyByZWFkb25seSB6b25lTmFtZTogc3RyaW5nO1xyXG4gIHB1YmxpYyByZWFkb25seSB6b25lTmFtZVByb3BlckNhc2U6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IocmVwbzogTG9nUmVwb3NpdG9yeSwgbmV0d29ya0xpbmU6IHN0cmluZywgcGFydHM6IHN0cmluZ1tdKSB7XHJcbiAgICBzdXBlcihyZXBvLCBuZXR3b3JrTGluZSwgcGFydHMpO1xyXG5cclxuICAgIHRoaXMuem9uZUlkID0gcGFydHNbZmllbGRzLnpvbmVJZF0gPz8gJyc7XHJcbiAgICB0aGlzLnpvbmVOYW1lID0gcGFydHNbZmllbGRzLnpvbmVOYW1lXSA/PyAnJztcclxuICAgIHRoaXMuem9uZU5hbWVQcm9wZXJDYXNlID0gRW11bGF0b3JDb21tb24ucHJvcGVyQ2FzZSh0aGlzLnpvbmVOYW1lKTtcclxuXHJcbiAgICB0aGlzLmNvbnZlcnRlZExpbmUgPSB0aGlzLnByZWZpeCgpICtcclxuICAgICAgJ0NoYW5nZWQgWm9uZSB0byAnICsgdGhpcy56b25lTmFtZSArICcuJztcclxuICAgIHRoaXMucHJvcGVyQ2FzZUNvbnZlcnRlZExpbmUgPSB0aGlzLnByZWZpeCgpICtcclxuICAgICAgJ0NoYW5nZWQgWm9uZSB0byAnICsgdGhpcy56b25lTmFtZVByb3BlckNhc2UgKyAnLic7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTGluZUV2ZW50MDEgZXh0ZW5kcyBMaW5lRXZlbnQweDAxIHt9XHJcbiIsImltcG9ydCBMaW5lRXZlbnQgZnJvbSAnLi9MaW5lRXZlbnQnO1xyXG5pbXBvcnQgTG9nUmVwb3NpdG9yeSBmcm9tICcuL0xvZ1JlcG9zaXRvcnknO1xyXG5cclxuY29uc3QgZmllbGRzID0ge1xyXG4gIGlkOiAyLFxyXG4gIG5hbWU6IDMsXHJcbn0gYXMgY29uc3Q7XHJcblxyXG4vLyBQbGF5ZXIgY2hhbmdlIGV2ZW50XHJcbmV4cG9ydCBjbGFzcyBMaW5lRXZlbnQweDAyIGV4dGVuZHMgTGluZUV2ZW50IHtcclxuICBwdWJsaWMgcmVhZG9ubHkgaWQ6IHN0cmluZztcclxuICBwdWJsaWMgcmVhZG9ubHkgbmFtZTogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihyZXBvOiBMb2dSZXBvc2l0b3J5LCBsaW5lOiBzdHJpbmcsIHBhcnRzOiBzdHJpbmdbXSkge1xyXG4gICAgc3VwZXIocmVwbywgbGluZSwgcGFydHMpO1xyXG5cclxuICAgIHRoaXMuaWQgPSBwYXJ0c1tmaWVsZHMuaWRdPy50b1VwcGVyQ2FzZSgpID8/ICcnO1xyXG4gICAgdGhpcy5uYW1lID0gcGFydHNbZmllbGRzLm5hbWVdID8/ICcnO1xyXG5cclxuICAgIHRoaXMuY29udmVydGVkTGluZSA9IHRoaXMucHJlZml4KCkgKyAnQ2hhbmdlZCBwcmltYXJ5IHBsYXllciB0byAnICsgdGhpcy5uYW1lICsgJy4nO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIExpbmVFdmVudDAyIGV4dGVuZHMgTGluZUV2ZW50MHgwMiB7fVxyXG4iLCIvLyBPdmVybGF5UGx1Z2luIEFQSSBzZXR1cFxyXG5cclxuaW1wb3J0IHsgRXZlbnRNYXAsIEV2ZW50VHlwZSwgSU92ZXJsYXlIYW5kbGVyIH0gZnJvbSAnLi4vdHlwZXMvZXZlbnQnO1xyXG5cclxuZGVjbGFyZSBnbG9iYWwge1xyXG4gIGludGVyZmFjZSBXaW5kb3cge1xyXG4gICAgX19PdmVybGF5Q2FsbGJhY2s6IEV2ZW50TWFwW0V2ZW50VHlwZV07XHJcbiAgICBkaXNwYXRjaE92ZXJsYXlFdmVudD86IHR5cGVvZiBwcm9jZXNzRXZlbnQ7XHJcbiAgICBPdmVybGF5UGx1Z2luQXBpOiB7XHJcbiAgICAgIHJlYWR5OiBib29sZWFuO1xyXG4gICAgICBjYWxsSGFuZGxlcjogKG1zZzogc3RyaW5nLCBjYj86ICh2YWx1ZTogc3RyaW5nKSA9PiB1bmtub3duKSA9PiB2b2lkO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQGRlcHJlY2F0ZWQgVGhpcyBpcyBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eS5cclxuICAgICAqXHJcbiAgICAgKiBJdCBpcyByZWNvbW1lbmRlZCB0byBpbXBvcnQgZnJvbSB0aGlzIGZpbGU6XHJcbiAgICAgKlxyXG4gICAgICogYGltcG9ydCB7IGFkZE92ZXJsYXlMaXN0ZW5lciB9IGZyb20gJy9wYXRoL3RvL292ZXJsYXlfcGx1Z2luX2FwaSc7YFxyXG4gICAgICovXHJcbiAgICBhZGRPdmVybGF5TGlzdGVuZXI6IElBZGRPdmVybGF5TGlzdGVuZXI7XHJcbiAgICAvKipcclxuICAgICAqIEBkZXByZWNhdGVkIFRoaXMgaXMgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkuXHJcbiAgICAgKlxyXG4gICAgICogSXQgaXMgcmVjb21tZW5kZWQgdG8gaW1wb3J0IGZyb20gdGhpcyBmaWxlOlxyXG4gICAgICpcclxuICAgICAqIGBpbXBvcnQgeyByZW1vdmVPdmVybGF5TGlzdGVuZXIgfSBmcm9tICcvcGF0aC90by9vdmVybGF5X3BsdWdpbl9hcGknO2BcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlT3ZlcmxheUxpc3RlbmVyOiBJUmVtb3ZlT3ZlcmxheUxpc3RlbmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVwcmVjYXRlZCBUaGlzIGlzIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5LlxyXG4gICAgICpcclxuICAgICAqIEl0IGlzIHJlY29tbWVuZGVkIHRvIGltcG9ydCBmcm9tIHRoaXMgZmlsZTpcclxuICAgICAqXHJcbiAgICAgKiBgaW1wb3J0IHsgY2FsbE92ZXJsYXlIYW5kbGVyIH0gZnJvbSAnL3BhdGgvdG8vb3ZlcmxheV9wbHVnaW5fYXBpJztgXHJcbiAgICAgKi9cclxuICAgIGNhbGxPdmVybGF5SGFuZGxlcjogSU92ZXJsYXlIYW5kbGVyO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbnR5cGUgSUFkZE92ZXJsYXlMaXN0ZW5lciA9IDxUIGV4dGVuZHMgRXZlbnRUeXBlPihldmVudDogVCwgY2I6IEV2ZW50TWFwW1RdKSA9PiB2b2lkO1xyXG50eXBlIElSZW1vdmVPdmVybGF5TGlzdGVuZXIgPSA8VCBleHRlbmRzIEV2ZW50VHlwZT4oZXZlbnQ6IFQsIGNiOiBFdmVudE1hcFtUXSkgPT4gdm9pZDtcclxuXHJcbnR5cGUgU3Vic2NyaWJlcjxUPiA9IHtcclxuICBba2V5IGluIEV2ZW50VHlwZV0/OiBUW107XHJcbn07XHJcbnR5cGUgRXZlbnRQYXJhbWV0ZXIgPSBQYXJhbWV0ZXJzPEV2ZW50TWFwW0V2ZW50VHlwZV0+WzBdO1xyXG50eXBlIFZvaWRGdW5jPFQ+ID0gKC4uLmFyZ3M6IFRbXSkgPT4gdm9pZDtcclxuXHJcbmxldCBpbml0ZWQgPSBmYWxzZTtcclxuXHJcbmxldCB3c1VybDogUmVnRXhwRXhlY0FycmF5IHwgbnVsbCA9IG51bGw7XHJcbmxldCB3czogV2ViU29ja2V0IHwgbnVsbCA9IG51bGw7XHJcbmxldCBxdWV1ZTogKFxyXG4gIHsgW3M6IHN0cmluZ106IHVua25vd24gfSB8XHJcbiAgW3sgW3M6IHN0cmluZ106IHVua25vd24gfSwgKCh2YWx1ZTogc3RyaW5nIHwgbnVsbCkgPT4gdW5rbm93bikgfCB1bmRlZmluZWRdXHJcbilbXSB8IG51bGwgPSBbXTtcclxubGV0IHJzZXFDb3VudGVyID0gMDtcclxuY29uc3QgcmVzcG9uc2VQcm9taXNlczogUmVjb3JkPG51bWJlciwgKHZhbHVlOiB1bmtub3duKSA9PiB2b2lkPiA9IHt9O1xyXG5cclxuY29uc3Qgc3Vic2NyaWJlcnM6IFN1YnNjcmliZXI8Vm9pZEZ1bmM8dW5rbm93bj4+ID0ge307XHJcblxyXG5jb25zdCBzZW5kTWVzc2FnZSA9IChcclxuICAgIG1zZzogeyBbczogc3RyaW5nXTogdW5rbm93biB9LFxyXG4gICAgY2I/OiAodmFsdWU6IHN0cmluZyB8IG51bGwpID0+IHVua25vd24sXHJcbik6IHZvaWQgPT4ge1xyXG4gIGlmICh3cykge1xyXG4gICAgaWYgKHF1ZXVlKVxyXG4gICAgICBxdWV1ZS5wdXNoKG1zZyk7XHJcbiAgICBlbHNlXHJcbiAgICAgIHdzLnNlbmQoSlNPTi5zdHJpbmdpZnkobXNnKSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGlmIChxdWV1ZSlcclxuICAgICAgcXVldWUucHVzaChbbXNnLCBjYl0pO1xyXG4gICAgZWxzZVxyXG4gICAgICB3aW5kb3cuT3ZlcmxheVBsdWdpbkFwaS5jYWxsSGFuZGxlcihKU09OLnN0cmluZ2lmeShtc2cpLCBjYik7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgcHJvY2Vzc0V2ZW50ID0gPFQgZXh0ZW5kcyBFdmVudFR5cGU+KG1zZzogUGFyYW1ldGVyczxFdmVudE1hcFtUXT5bMF0pOiB2b2lkID0+IHtcclxuICBpbml0KCk7XHJcblxyXG4gIGNvbnN0IHN1YnMgPSBzdWJzY3JpYmVyc1ttc2cudHlwZV07XHJcbiAgc3Vicz8uZm9yRWFjaCgoc3ViKSA9PiBzdWIobXNnKSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZGlzcGF0Y2hPdmVybGF5RXZlbnQgPSBwcm9jZXNzRXZlbnQ7XHJcblxyXG5leHBvcnQgY29uc3QgYWRkT3ZlcmxheUxpc3RlbmVyOiBJQWRkT3ZlcmxheUxpc3RlbmVyID0gKGV2ZW50LCBjYik6IHZvaWQgPT4ge1xyXG4gIGluaXQoKTtcclxuXHJcbiAgaWYgKCFzdWJzY3JpYmVyc1tldmVudF0pIHtcclxuICAgIHN1YnNjcmliZXJzW2V2ZW50XSA9IFtdO1xyXG5cclxuICAgIGlmICghcXVldWUpIHtcclxuICAgICAgc2VuZE1lc3NhZ2Uoe1xyXG4gICAgICAgIGNhbGw6ICdzdWJzY3JpYmUnLFxyXG4gICAgICAgIGV2ZW50czogW2V2ZW50XSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdWJzY3JpYmVyc1tldmVudF0/LnB1c2goY2IgYXMgVm9pZEZ1bmM8dW5rbm93bj4pO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlbW92ZU92ZXJsYXlMaXN0ZW5lcjogSVJlbW92ZU92ZXJsYXlMaXN0ZW5lciA9IChldmVudCwgY2IpOiB2b2lkID0+IHtcclxuICBpbml0KCk7XHJcblxyXG4gIGlmIChzdWJzY3JpYmVyc1tldmVudF0pIHtcclxuICAgIGNvbnN0IGxpc3QgPSBzdWJzY3JpYmVyc1tldmVudF07XHJcbiAgICBjb25zdCBwb3MgPSBsaXN0Py5pbmRleE9mKGNiIGFzIFZvaWRGdW5jPHVua25vd24+KTtcclxuXHJcbiAgICBpZiAocG9zICYmIHBvcyA+IC0xKVxyXG4gICAgICBsaXN0Py5zcGxpY2UocG9zLCAxKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBjYWxsT3ZlcmxheUhhbmRsZXJJbnRlcm5hbDogSU92ZXJsYXlIYW5kbGVyID0gKFxyXG4gICAgX21zZzogeyBbczogc3RyaW5nXTogdW5rbm93biB9LFxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuKTogUHJvbWlzZTxhbnk+ID0+IHtcclxuICBpbml0KCk7XHJcblxyXG4gIGNvbnN0IG1zZyA9IHtcclxuICAgIC4uLl9tc2csXHJcbiAgICByc2VxOiAwLFxyXG4gIH07XHJcbiAgbGV0IHA6IFByb21pc2U8dW5rbm93bj47XHJcblxyXG4gIGlmICh3cykge1xyXG4gICAgbXNnLnJzZXEgPSByc2VxQ291bnRlcisrO1xyXG4gICAgcCA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHJlc3BvbnNlUHJvbWlzZXNbbXNnLnJzZXFdID0gcmVzb2x2ZTtcclxuICAgIH0pO1xyXG5cclxuICAgIHNlbmRNZXNzYWdlKG1zZyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHAgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICBzZW5kTWVzc2FnZShtc2csIChkYXRhKSA9PiB7XHJcbiAgICAgICAgcmVzb2x2ZShkYXRhID09PSBudWxsID8gbnVsbCA6IEpTT04ucGFyc2UoZGF0YSkpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHA7XHJcbn07XHJcblxyXG5sZXQgY2FsbE92ZXJsYXlIYW5kbGVyT3ZlcnJpZGU6IElPdmVybGF5SGFuZGxlciB8IHVuZGVmaW5lZDtcclxuXHJcbmV4cG9ydCBjb25zdCBjYWxsT3ZlcmxheUhhbmRsZXI6IElPdmVybGF5SGFuZGxlciA9IChcclxuICAgIF9tc2c6IHsgW3M6IHN0cmluZ106IHVua25vd24gfSxcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbik6IFByb21pc2U8YW55PiA9PiB7XHJcbiAgaW5pdCgpO1xyXG4gIGlmIChjYWxsT3ZlcmxheUhhbmRsZXJPdmVycmlkZSkge1xyXG4gICAgcmV0dXJuIGNhbGxPdmVybGF5SGFuZGxlck92ZXJyaWRlKFxyXG4gICAgICBfbXNnIGFzIFBhcmFtZXRlcnM8SU92ZXJsYXlIYW5kbGVyPlswXSxcclxuICAgICkgYXMgUHJvbWlzZTx1bmtub3duPjtcclxuICB9XHJcbiAgcmV0dXJuIGNhbGxPdmVybGF5SGFuZGxlckludGVybmFsKF9tc2cgYXMgUGFyYW1ldGVyczxJT3ZlcmxheUhhbmRsZXI+WzBdKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZXRDYWxsT3ZlcmxheUhhbmRsZXJPdmVycmlkZSA9IChvdmVycmlkZT86IElPdmVybGF5SGFuZGxlcik6IElPdmVybGF5SGFuZGxlciA9PiB7XHJcbiAgY2FsbE92ZXJsYXlIYW5kbGVyT3ZlcnJpZGUgPSBvdmVycmlkZTtcclxuICByZXR1cm4gY2FsbE92ZXJsYXlIYW5kbGVySW50ZXJuYWw7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaW5pdCA9ICgpOiB2b2lkID0+IHtcclxuICBpZiAoaW5pdGVkKVxyXG4gICAgcmV0dXJuO1xyXG5cclxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIHdzVXJsID0gL1tcXD8mXU9WRVJMQVlfV1M9KFteJl0rKS8uZXhlYyh3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcbiAgICBpZiAod3NVcmwpIHtcclxuICAgICAgY29uc3QgY29ubmVjdFdzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgd3MgPSBuZXcgV2ViU29ja2V0KHdzVXJsPy5bMV0gYXMgc3RyaW5nKTtcclxuXHJcbiAgICAgICAgd3MuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoZSkgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgd3MuYWRkRXZlbnRMaXN0ZW5lcignb3BlbicsICgpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdDb25uZWN0ZWQhJyk7XHJcblxyXG4gICAgICAgICAgY29uc3QgcSA9IHF1ZXVlID8/IFtdO1xyXG4gICAgICAgICAgcXVldWUgPSBudWxsO1xyXG5cclxuICAgICAgICAgIHNlbmRNZXNzYWdlKHtcclxuICAgICAgICAgICAgY2FsbDogJ3N1YnNjcmliZScsXHJcbiAgICAgICAgICAgIGV2ZW50czogT2JqZWN0LmtleXMoc3Vic2NyaWJlcnMpLFxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgZm9yIChjb25zdCBtc2cgb2YgcSkge1xyXG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkobXNnKSlcclxuICAgICAgICAgICAgICBzZW5kTWVzc2FnZShtc2cpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB3cy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKF9tc2cpID0+IHtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1zZyA9IEpTT04ucGFyc2UoX21zZy5kYXRhKSBhcyBFdmVudFBhcmFtZXRlciAmIHsgcnNlcT86IG51bWJlciB9O1xyXG5cclxuICAgICAgICAgICAgaWYgKG1zZy5yc2VxICE9PSB1bmRlZmluZWQgJiYgcmVzcG9uc2VQcm9taXNlc1ttc2cucnNlcV0pIHtcclxuICAgICAgICAgICAgICByZXNwb25zZVByb21pc2VzW21zZy5yc2VxXT8uKG1zZyk7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIHJlc3BvbnNlUHJvbWlzZXNbbXNnLnJzZXFdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHByb2Nlc3NFdmVudChtc2cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ludmFsaWQgbWVzc2FnZSByZWNlaXZlZDogJywgX21zZyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgd3MuYWRkRXZlbnRMaXN0ZW5lcignY2xvc2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICBxdWV1ZSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgY29uc29sZS5sb2coJ1RyeWluZyB0byByZWNvbm5lY3QuLi4nKTtcclxuICAgICAgICAgIC8vIERvbid0IHNwYW0gdGhlIHNlcnZlciB3aXRoIHJldHJpZXMuXHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgY29ubmVjdFdzKCk7XHJcbiAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgY29ubmVjdFdzKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCB3YWl0Rm9yQXBpID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCF3aW5kb3cuT3ZlcmxheVBsdWdpbkFwaSB8fCAhd2luZG93Lk92ZXJsYXlQbHVnaW5BcGkucmVhZHkpIHtcclxuICAgICAgICAgIHNldFRpbWVvdXQod2FpdEZvckFwaSwgMzAwKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHEgPSBxdWV1ZSA/PyBbXTtcclxuICAgICAgICBxdWV1ZSA9IG51bGw7XHJcblxyXG4gICAgICAgIHdpbmRvdy5fX092ZXJsYXlDYWxsYmFjayA9IHByb2Nlc3NFdmVudDtcclxuXHJcbiAgICAgICAgc2VuZE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgY2FsbDogJ3N1YnNjcmliZScsXHJcbiAgICAgICAgICBldmVudHM6IE9iamVjdC5rZXlzKHN1YnNjcmliZXJzKSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHEpIHtcclxuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKVxyXG4gICAgICAgICAgICBzZW5kTWVzc2FnZShpdGVtWzBdLCBpdGVtWzFdKTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICB3YWl0Rm9yQXBpKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSGVyZSB0aGUgT3ZlcmxheVBsdWdpbiBBUEkgaXMgcmVnaXN0ZXJlZCB0byB0aGUgd2luZG93IG9iamVjdCxcclxuICAgIC8vIGJ1dCB0aGlzIGlzIG1haW5seSBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuRm9yIGNhY3Rib3QncyBidWlsdC1pbiBmaWxlcyxcclxuICAgIC8vIGl0IGlzIHJlY29tbWVuZGVkIHRvIHVzZSB0aGUgdmFyaW91cyBmdW5jdGlvbnMgZXhwb3J0ZWQgaW4gcmVzb3VyY2VzL292ZXJsYXlfcGx1Z2luX2FwaS50cy5cclxuICAgIHdpbmRvdy5hZGRPdmVybGF5TGlzdGVuZXIgPSBhZGRPdmVybGF5TGlzdGVuZXI7XHJcbiAgICB3aW5kb3cucmVtb3ZlT3ZlcmxheUxpc3RlbmVyID0gcmVtb3ZlT3ZlcmxheUxpc3RlbmVyO1xyXG4gICAgd2luZG93LmNhbGxPdmVybGF5SGFuZGxlciA9IGNhbGxPdmVybGF5SGFuZGxlcjtcclxuICAgIHdpbmRvdy5kaXNwYXRjaE92ZXJsYXlFdmVudCA9IGRpc3BhdGNoT3ZlcmxheUV2ZW50O1xyXG4gIH1cclxuXHJcbiAgaW5pdGVkID0gdHJ1ZTtcclxufTtcclxuIiwiaW1wb3J0IHsgR2V0Q29tYmF0YW50c0NhbGwsIEdldENvbWJhdGFudHNSZXQgfSBmcm9tICcuLi90eXBlcy9ldmVudCc7XHJcbmltcG9ydCB7IEpvYiwgUm9sZSB9IGZyb20gJy4uL3R5cGVzL2pvYic7XHJcbmltcG9ydCB7IGNhbGxPdmVybGF5SGFuZGxlciB9IGZyb20gJy4vb3ZlcmxheV9wbHVnaW5fYXBpJztcclxuXHJcbi8vIFRPRE86IGl0J2QgYmUgbmljZSB0byBub3QgcmVwZWF0IGpvYiBuYW1lcywgYnV0IGF0IGxlYXN0IFJlY29yZCBlbmZvcmNlcyB0aGF0IGFsbCBhcmUgc2V0LlxyXG5jb25zdCBuYW1lVG9Kb2JFbnVtOiBSZWNvcmQ8Sm9iLCBudW1iZXI+ID0ge1xyXG4gIE5PTkU6IDAsXHJcbiAgR0xBOiAxLFxyXG4gIFBHTDogMixcclxuICBNUkQ6IDMsXHJcbiAgTE5DOiA0LFxyXG4gIEFSQzogNSxcclxuICBDTko6IDYsXHJcbiAgVEhNOiA3LFxyXG4gIENSUDogOCxcclxuICBCU006IDksXHJcbiAgQVJNOiAxMCxcclxuICBHU006IDExLFxyXG4gIExUVzogMTIsXHJcbiAgV1ZSOiAxMyxcclxuICBBTEM6IDE0LFxyXG4gIENVTDogMTUsXHJcbiAgTUlOOiAxNixcclxuICBCVE46IDE3LFxyXG4gIEZTSDogMTgsXHJcbiAgUExEOiAxOSxcclxuICBNTks6IDIwLFxyXG4gIFdBUjogMjEsXHJcbiAgRFJHOiAyMixcclxuICBCUkQ6IDIzLFxyXG4gIFdITTogMjQsXHJcbiAgQkxNOiAyNSxcclxuICBBQ046IDI2LFxyXG4gIFNNTjogMjcsXHJcbiAgU0NIOiAyOCxcclxuICBST0c6IDI5LFxyXG4gIE5JTjogMzAsXHJcbiAgTUNIOiAzMSxcclxuICBEUks6IDMyLFxyXG4gIEFTVDogMzMsXHJcbiAgU0FNOiAzNCxcclxuICBSRE06IDM1LFxyXG4gIEJMVTogMzYsXHJcbiAgR05COiAzNyxcclxuICBETkM6IDM4LFxyXG59O1xyXG5cclxuY29uc3QgYWxsSm9icyA9IE9iamVjdC5rZXlzKG5hbWVUb0pvYkVudW0pIGFzIEpvYltdO1xyXG5jb25zdCBhbGxSb2xlcyA9IFsndGFuaycsICdoZWFsZXInLCAnZHBzJywgJ2NyYWZ0ZXInLCAnZ2F0aGVyZXInLCAnbm9uZSddIGFzIFJvbGVbXTtcclxuXHJcbmNvbnN0IHRhbmtKb2JzOiBKb2JbXSA9IFsnR0xBJywgJ1BMRCcsICdNUkQnLCAnV0FSJywgJ0RSSycsICdHTkInXTtcclxuY29uc3QgaGVhbGVySm9iczogSm9iW10gPSBbJ0NOSicsICdXSE0nLCAnU0NIJywgJ0FTVCddO1xyXG5jb25zdCBtZWxlZURwc0pvYnM6IEpvYltdID0gWydQR0wnLCAnTU5LJywgJ0xOQycsICdEUkcnLCAnUk9HJywgJ05JTicsICdTQU0nXTtcclxuY29uc3QgcmFuZ2VkRHBzSm9iczogSm9iW10gPSBbJ0FSQycsICdCUkQnLCAnRE5DJywgJ01DSCddO1xyXG5jb25zdCBjYXN0ZXJEcHNKb2JzOiBKb2JbXSA9IFsnQkxVJywgJ1JETScsICdCTE0nLCAnU01OJywgJ0FDTicsICdUSE0nXTtcclxuY29uc3QgZHBzSm9iczogSm9iW10gPSBbLi4ubWVsZWVEcHNKb2JzLCAuLi5yYW5nZWREcHNKb2JzLCAuLi5jYXN0ZXJEcHNKb2JzXTtcclxuY29uc3QgY3JhZnRpbmdKb2JzOiBKb2JbXSA9IFsnQ1JQJywgJ0JTTScsICdBUk0nLCAnR1NNJywgJ0xUVycsICdXVlInLCAnQUxDJywgJ0NVTCddO1xyXG5jb25zdCBnYXRoZXJpbmdKb2JzOiBKb2JbXSA9IFsnTUlOJywgJ0JUTicsICdGU0gnXTtcclxuXHJcbmNvbnN0IHN0dW5Kb2JzOiBKb2JbXSA9IFsnQkxVJywgLi4udGFua0pvYnMsIC4uLm1lbGVlRHBzSm9ic107XHJcbmNvbnN0IHNpbGVuY2VKb2JzOiBKb2JbXSA9IFsnQkxVJywgLi4udGFua0pvYnMsIC4uLnJhbmdlZERwc0pvYnNdO1xyXG5jb25zdCBzbGVlcEpvYnM6IEpvYltdID0gWydCTE0nLCAnQkxVJywgLi4uaGVhbGVySm9ic107XHJcbmNvbnN0IGZlaW50Sm9iczogSm9iW10gPSBbLi4ubWVsZWVEcHNKb2JzXTtcclxuY29uc3QgYWRkbGVKb2JzOiBKb2JbXSA9IFsuLi5jYXN0ZXJEcHNKb2JzXTtcclxuY29uc3QgY2xlYW5zZUpvYnM6IEpvYltdID0gWydCTFUnLCAnQlJEJywgLi4uaGVhbGVySm9ic107XHJcblxyXG5jb25zdCBqb2JUb1JvbGVNYXA6IE1hcDxKb2IsIFJvbGU+ID0gKCgpID0+IHtcclxuICBjb25zdCBhZGRUb01hcCA9IChtYXA6IE1hcDxKb2IsIFJvbGU+LCBqb2JzOiBKb2JbXSwgcm9sZTogUm9sZSkgPT4ge1xyXG4gICAgam9icy5mb3JFYWNoKChqb2IpID0+IG1hcC5zZXQoam9iLCByb2xlKSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbWFwOiBNYXA8Sm9iLCBSb2xlPiA9IG5ldyBNYXAoW1snTk9ORScsICdub25lJ11dKTtcclxuICBhZGRUb01hcChtYXAsIHRhbmtKb2JzLCAndGFuaycpO1xyXG4gIGFkZFRvTWFwKG1hcCwgaGVhbGVySm9icywgJ2hlYWxlcicpO1xyXG4gIGFkZFRvTWFwKG1hcCwgZHBzSm9icywgJ2RwcycpO1xyXG4gIGFkZFRvTWFwKG1hcCwgY3JhZnRpbmdKb2JzLCAnY3JhZnRlcicpO1xyXG4gIGFkZFRvTWFwKG1hcCwgZ2F0aGVyaW5nSm9icywgJ2dhdGhlcmVyJyk7XHJcblxyXG4gIHJldHVybiBtYXA7XHJcbn0pKCk7XHJcblxyXG50eXBlIFdhdGNoQ29tYmF0YW50UGFyYW1zID0ge1xyXG4gIGlkcz86IG51bWJlcltdO1xyXG4gIG5hbWVzPzogc3RyaW5nW107XHJcbiAgcHJvcHM/OiBzdHJpbmdbXTtcclxuICBkZWxheT86IG51bWJlcjtcclxuICBtYXhEdXJhdGlvbj86IG51bWJlcjtcclxufTtcclxuXHJcbnR5cGUgV2F0Y2hDb21iYXRhbnRGdW5jID0gKHBhcmFtczogV2F0Y2hDb21iYXRhbnRQYXJhbXMsXHJcbiAgZnVuYzogKHJldDogR2V0Q29tYmF0YW50c1JldCkgPT4gYm9vbGVhbikgPT4gUHJvbWlzZTxib29sZWFuPjtcclxuXHJcbnR5cGUgV2F0Y2hDb21iYXRhbnRNYXBFbnRyeSA9IHtcclxuICBjYW5jZWw6IGJvb2xlYW47XHJcbiAgc3RhcnQ6IG51bWJlcjtcclxufTtcclxuXHJcbmNvbnN0IHdhdGNoQ29tYmF0YW50TWFwOiBXYXRjaENvbWJhdGFudE1hcEVudHJ5W10gPSBbXTtcclxuXHJcbmNvbnN0IHNob3VsZENhbmNlbFdhdGNoID1cclxuICAocGFyYW1zOiBXYXRjaENvbWJhdGFudFBhcmFtcywgZW50cnk6IFdhdGNoQ29tYmF0YW50TWFwRW50cnkpOiBib29sZWFuID0+IHtcclxuICAgIGlmIChlbnRyeS5jYW5jZWwpXHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgaWYgKHBhcmFtcy5tYXhEdXJhdGlvbiAhPT0gdW5kZWZpbmVkICYmIERhdGUubm93KCkgLSBlbnRyeS5zdGFydCA+IHBhcmFtcy5tYXhEdXJhdGlvbilcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfTtcclxuXHJcbmNvbnN0IHdhdGNoQ29tYmF0YW50OiBXYXRjaENvbWJhdGFudEZ1bmMgPSAocGFyYW1zLCBmdW5jKSA9PiB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXMsIHJlaikgPT4ge1xyXG4gICAgY29uc3QgZGVsYXkgPSBwYXJhbXMuZGVsYXkgPz8gMTAwMDtcclxuXHJcbiAgICBjb25zdCBjYWxsOiBHZXRDb21iYXRhbnRzQ2FsbCA9IHtcclxuICAgICAgY2FsbDogJ2dldENvbWJhdGFudHMnLFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAocGFyYW1zLmlkcylcclxuICAgICAgY2FsbC5pZHMgPSBwYXJhbXMuaWRzO1xyXG5cclxuICAgIGlmIChwYXJhbXMubmFtZXMpXHJcbiAgICAgIGNhbGwubmFtZXMgPSBwYXJhbXMubmFtZXM7XHJcblxyXG4gICAgaWYgKHBhcmFtcy5wcm9wcylcclxuICAgICAgY2FsbC5wcm9wcyA9IHBhcmFtcy5wcm9wcztcclxuXHJcbiAgICBjb25zdCBlbnRyeTogV2F0Y2hDb21iYXRhbnRNYXBFbnRyeSA9IHtcclxuICAgICAgY2FuY2VsOiBmYWxzZSxcclxuICAgICAgc3RhcnQ6IERhdGUubm93KCksXHJcbiAgICB9O1xyXG5cclxuICAgIHdhdGNoQ29tYmF0YW50TWFwLnB1c2goZW50cnkpO1xyXG5cclxuICAgIGNvbnN0IGNoZWNrRnVuYyA9ICgpID0+IHtcclxuICAgICAgaWYgKHNob3VsZENhbmNlbFdhdGNoKHBhcmFtcywgZW50cnkpKSB7XHJcbiAgICAgICAgcmVqKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHZvaWQgY2FsbE92ZXJsYXlIYW5kbGVyKGNhbGwpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgaWYgKGVudHJ5LmNhbmNlbCkge1xyXG4gICAgICAgICAgcmVqKCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChmdW5jKHJlc3BvbnNlKSlcclxuICAgICAgICAgIHJlcyh0cnVlKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChjaGVja0Z1bmMsIGRlbGF5KTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNoZWNrRnVuYywgZGVsYXkpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgVXRpbCA9IHtcclxuICBqb2JFbnVtVG9Kb2I6IChpZDogbnVtYmVyKSA9PiB7XHJcbiAgICBjb25zdCBqb2IgPSBhbGxKb2JzLmZpbmQoKGpvYjogSm9iKSA9PiBuYW1lVG9Kb2JFbnVtW2pvYl0gPT09IGlkKTtcclxuICAgIHJldHVybiBqb2IgPz8gJ05PTkUnO1xyXG4gIH0sXHJcbiAgam9iVG9Kb2JFbnVtOiAoam9iOiBKb2IpID0+IG5hbWVUb0pvYkVudW1bam9iXSxcclxuICBqb2JUb1JvbGU6IChqb2I6IEpvYikgPT4ge1xyXG4gICAgY29uc3Qgcm9sZSA9IGpvYlRvUm9sZU1hcC5nZXQoam9iKTtcclxuICAgIHJldHVybiByb2xlID8/ICdub25lJztcclxuICB9LFxyXG4gIGdldEFsbFJvbGVzOiAoKTogcmVhZG9ubHkgUm9sZVtdID0+IGFsbFJvbGVzLFxyXG4gIGlzVGFua0pvYjogKGpvYjogSm9iKSA9PiB0YW5rSm9icy5pbmNsdWRlcyhqb2IpLFxyXG4gIGlzSGVhbGVySm9iOiAoam9iOiBKb2IpID0+IGhlYWxlckpvYnMuaW5jbHVkZXMoam9iKSxcclxuICBpc01lbGVlRHBzSm9iOiAoam9iOiBKb2IpID0+IG1lbGVlRHBzSm9icy5pbmNsdWRlcyhqb2IpLFxyXG4gIGlzUmFuZ2VkRHBzSm9iOiAoam9iOiBKb2IpID0+IHJhbmdlZERwc0pvYnMuaW5jbHVkZXMoam9iKSxcclxuICBpc0Nhc3RlckRwc0pvYjogKGpvYjogSm9iKSA9PiBjYXN0ZXJEcHNKb2JzLmluY2x1ZGVzKGpvYiksXHJcbiAgaXNEcHNKb2I6IChqb2I6IEpvYikgPT4gZHBzSm9icy5pbmNsdWRlcyhqb2IpLFxyXG4gIGlzQ3JhZnRpbmdKb2I6IChqb2I6IEpvYikgPT4gY3JhZnRpbmdKb2JzLmluY2x1ZGVzKGpvYiksXHJcbiAgaXNHYXRoZXJpbmdKb2I6IChqb2I6IEpvYikgPT4gZ2F0aGVyaW5nSm9icy5pbmNsdWRlcyhqb2IpLFxyXG4gIGlzQ29tYmF0Sm9iOiAoam9iOiBKb2IpID0+IHtcclxuICAgIHJldHVybiAhY3JhZnRpbmdKb2JzLmluY2x1ZGVzKGpvYikgJiYgIWdhdGhlcmluZ0pvYnMuaW5jbHVkZXMoam9iKTtcclxuICB9LFxyXG4gIGNhblN0dW46IChqb2I6IEpvYikgPT4gc3R1bkpvYnMuaW5jbHVkZXMoam9iKSxcclxuICBjYW5TaWxlbmNlOiAoam9iOiBKb2IpID0+IHNpbGVuY2VKb2JzLmluY2x1ZGVzKGpvYiksXHJcbiAgY2FuU2xlZXA6IChqb2I6IEpvYikgPT4gc2xlZXBKb2JzLmluY2x1ZGVzKGpvYiksXHJcbiAgY2FuQ2xlYW5zZTogKGpvYjogSm9iKSA9PiBjbGVhbnNlSm9icy5pbmNsdWRlcyhqb2IpLFxyXG4gIGNhbkZlaW50OiAoam9iOiBKb2IpID0+IGZlaW50Sm9icy5pbmNsdWRlcyhqb2IpLFxyXG4gIGNhbkFkZGxlOiAoam9iOiBKb2IpID0+IGFkZGxlSm9icy5pbmNsdWRlcyhqb2IpLFxyXG4gIHdhdGNoQ29tYmF0YW50OiB3YXRjaENvbWJhdGFudCxcclxuICBjbGVhcldhdGNoQ29tYmF0YW50czogKCkgPT4ge1xyXG4gICAgd2hpbGUgKHdhdGNoQ29tYmF0YW50TWFwLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc3Qgd2F0Y2ggPSB3YXRjaENvbWJhdGFudE1hcC5wb3AoKTtcclxuICAgICAgaWYgKHdhdGNoKVxyXG4gICAgICAgIHdhdGNoLmNhbmNlbCA9IHRydWU7XHJcbiAgICB9XHJcbiAgfSxcclxufSBhcyBjb25zdDtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFV0aWw7XHJcbiIsImltcG9ydCBMaW5lRXZlbnQsIHsgTGluZUV2ZW50Sm9iTGV2ZWwsIExpbmVFdmVudFNvdXJjZSB9IGZyb20gJy4vTGluZUV2ZW50JztcclxuaW1wb3J0IEVtdWxhdG9yQ29tbW9uIGZyb20gJy4uLy4uL0VtdWxhdG9yQ29tbW9uJztcclxuaW1wb3J0IFV0aWwgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3V0aWwnO1xyXG5pbXBvcnQgTG9nUmVwb3NpdG9yeSBmcm9tICcuL0xvZ1JlcG9zaXRvcnknO1xyXG5pbXBvcnQgeyBKb2IgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9qb2InO1xyXG5cclxuY29uc3QgZmllbGRzID0ge1xyXG4gIGlkOiAyLFxyXG4gIG5hbWU6IDMsXHJcbiAgam9iSWRIZXg6IDQsXHJcbiAgbGV2ZWxTdHJpbmc6IDUsXHJcbiAgb3duZXJJZDogNixcclxuICB3b3JsZElkOiA3LFxyXG4gIHdvcmxkTmFtZTogOCxcclxuICBucGNOYW1lSWQ6IDksXHJcbiAgbnBjQmFzZUlkOiAxMCxcclxuICBjdXJyZW50SHA6IDExLFxyXG4gIG1heEhwU3RyaW5nOiAxNCxcclxuICBjdXJyZW50TXA6IDEzLFxyXG4gIG1heE1wU3RyaW5nOiAxNCxcclxuICBjdXJyZW50VHA6IDE1LFxyXG4gIG1heFRwOiAxNixcclxuICB4U3RyaW5nOiAxNyxcclxuICB5U3RyaW5nOiAxOCxcclxuICB6U3RyaW5nOiAxOSxcclxuICBoZWFkaW5nOiAyMCxcclxufSBhcyBjb25zdDtcclxuXHJcbi8vIEFkZGVkIGNvbWJhdGFudCBldmVudFxyXG5leHBvcnQgY2xhc3MgTGluZUV2ZW50MHgwMyBleHRlbmRzIExpbmVFdmVudCBpbXBsZW1lbnRzIExpbmVFdmVudFNvdXJjZSwgTGluZUV2ZW50Sm9iTGV2ZWwge1xyXG4gIHB1YmxpYyByZWFkb25seSBpZDogc3RyaW5nO1xyXG4gIHB1YmxpYyByZWFkb25seSBuYW1lOiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IGpvYklkSGV4OiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IGpvYklkOiBudW1iZXI7XHJcbiAgcHVibGljIHJlYWRvbmx5IGpvYjogSm9iO1xyXG4gIHB1YmxpYyByZWFkb25seSBsZXZlbFN0cmluZzogc3RyaW5nO1xyXG4gIHB1YmxpYyByZWFkb25seSBsZXZlbDogbnVtYmVyO1xyXG4gIHB1YmxpYyByZWFkb25seSBvd25lcklkOiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IHdvcmxkSWQ6IHN0cmluZztcclxuICBwdWJsaWMgcmVhZG9ubHkgd29ybGROYW1lOiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IG5wY05hbWVJZDogc3RyaW5nO1xyXG4gIHB1YmxpYyByZWFkb25seSBucGNCYXNlSWQ6IHN0cmluZztcclxuICBwdWJsaWMgcmVhZG9ubHkgaHA6IG51bWJlcjtcclxuICBwdWJsaWMgcmVhZG9ubHkgbWF4SHBTdHJpbmc6IHN0cmluZztcclxuICBwdWJsaWMgcmVhZG9ubHkgbWF4SHA6IG51bWJlcjtcclxuICBwdWJsaWMgcmVhZG9ubHkgbXA6IG51bWJlcjtcclxuICBwdWJsaWMgcmVhZG9ubHkgbWF4TXBTdHJpbmc6IHN0cmluZztcclxuICBwdWJsaWMgcmVhZG9ubHkgbWF4TXA6IG51bWJlcjtcclxuICBwdWJsaWMgcmVhZG9ubHkgdHA6IG51bWJlcjtcclxuICBwdWJsaWMgcmVhZG9ubHkgbWF4VHA6IG51bWJlcjtcclxuICBwdWJsaWMgcmVhZG9ubHkgeFN0cmluZzogc3RyaW5nO1xyXG4gIHB1YmxpYyByZWFkb25seSB4OiBudW1iZXI7XHJcbiAgcHVibGljIHJlYWRvbmx5IHlTdHJpbmc6IHN0cmluZztcclxuICBwdWJsaWMgcmVhZG9ubHkgeTogbnVtYmVyO1xyXG4gIHB1YmxpYyByZWFkb25seSB6U3RyaW5nOiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IHo6IG51bWJlcjtcclxuICBwdWJsaWMgcmVhZG9ubHkgaGVhZGluZzogbnVtYmVyO1xyXG4gIHB1YmxpYyByZWFkb25seSBpc1NvdXJjZSA9IHRydWU7XHJcbiAgcHVibGljIHJlYWRvbmx5IGlzSm9iTGV2ZWwgPSB0cnVlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihyZXBvOiBMb2dSZXBvc2l0b3J5LCBsaW5lOiBzdHJpbmcsIHBhcnRzOiBzdHJpbmdbXSkge1xyXG4gICAgc3VwZXIocmVwbywgbGluZSwgcGFydHMpO1xyXG5cclxuICAgIHRoaXMuaWQgPSBwYXJ0c1tmaWVsZHMuaWRdPy50b1VwcGVyQ2FzZSgpID8/ICcnO1xyXG4gICAgdGhpcy5uYW1lID0gcGFydHNbZmllbGRzLm5hbWVdID8/ICcnO1xyXG4gICAgdGhpcy5qb2JJZEhleCA9IHBhcnRzW2ZpZWxkcy5qb2JJZEhleF0/LnRvVXBwZXJDYXNlKCkgPz8gJyc7XHJcbiAgICB0aGlzLmpvYklkID0gcGFyc2VJbnQodGhpcy5qb2JJZEhleCwgMTYpO1xyXG4gICAgdGhpcy5qb2IgPSBVdGlsLmpvYkVudW1Ub0pvYih0aGlzLmpvYklkKTtcclxuICAgIHRoaXMubGV2ZWxTdHJpbmcgPSBwYXJ0c1tmaWVsZHMubGV2ZWxTdHJpbmddID8/ICcnO1xyXG4gICAgdGhpcy5sZXZlbCA9IHBhcnNlRmxvYXQodGhpcy5sZXZlbFN0cmluZyk7XHJcbiAgICB0aGlzLm93bmVySWQgPSBwYXJ0c1tmaWVsZHMub3duZXJJZF0/LnRvVXBwZXJDYXNlKCkgPz8gJyc7XHJcbiAgICB0aGlzLndvcmxkSWQgPSBwYXJ0c1tmaWVsZHMud29ybGRJZF0gPz8gJyc7XHJcbiAgICB0aGlzLndvcmxkTmFtZSA9IHBhcnRzW2ZpZWxkcy53b3JsZE5hbWVdID8/ICcnO1xyXG4gICAgdGhpcy5ucGNOYW1lSWQgPSBwYXJ0c1tmaWVsZHMubnBjTmFtZUlkXSA/PyAnJztcclxuICAgIHRoaXMubnBjQmFzZUlkID0gcGFydHNbZmllbGRzLm5wY0Jhc2VJZF0gPz8gJyc7XHJcbiAgICB0aGlzLmhwID0gcGFyc2VGbG9hdChwYXJ0c1tmaWVsZHMuY3VycmVudEhwXSA/PyAnJyk7XHJcbiAgICB0aGlzLm1heEhwU3RyaW5nID0gcGFydHNbZmllbGRzLm1heEhwU3RyaW5nXSA/PyAnJztcclxuICAgIHRoaXMubWF4SHAgPSBwYXJzZUZsb2F0KHRoaXMubWF4SHBTdHJpbmcpO1xyXG4gICAgdGhpcy5tcCA9IHBhcnNlRmxvYXQocGFydHNbZmllbGRzLmN1cnJlbnRNcF0gPz8gJycpO1xyXG4gICAgdGhpcy5tYXhNcFN0cmluZyA9IHBhcnRzW2ZpZWxkcy5tYXhNcFN0cmluZ10gPz8gJyc7XHJcbiAgICB0aGlzLm1heE1wID0gcGFyc2VGbG9hdCh0aGlzLm1heE1wU3RyaW5nKTtcclxuICAgIHRoaXMudHAgPSBwYXJzZUZsb2F0KHBhcnRzW2ZpZWxkcy5jdXJyZW50VHBdID8/ICcnKTtcclxuICAgIHRoaXMubWF4VHAgPSBwYXJzZUZsb2F0KHBhcnRzW2ZpZWxkcy5tYXhUcF0gPz8gJycpO1xyXG4gICAgdGhpcy54U3RyaW5nID0gcGFydHNbZmllbGRzLnhTdHJpbmddID8/ICcnO1xyXG4gICAgdGhpcy54ID0gcGFyc2VGbG9hdCh0aGlzLnhTdHJpbmcpO1xyXG4gICAgdGhpcy55U3RyaW5nID0gcGFydHNbZmllbGRzLnlTdHJpbmddID8/ICcnO1xyXG4gICAgdGhpcy55ID0gcGFyc2VGbG9hdCh0aGlzLnlTdHJpbmcpO1xyXG4gICAgdGhpcy56U3RyaW5nID0gcGFydHNbZmllbGRzLnpTdHJpbmddID8/ICcnO1xyXG4gICAgdGhpcy56ID0gcGFyc2VGbG9hdCh0aGlzLnpTdHJpbmcpO1xyXG4gICAgdGhpcy5oZWFkaW5nID0gcGFyc2VGbG9hdChwYXJ0c1tmaWVsZHMuaGVhZGluZ10gPz8gJycpO1xyXG5cclxuICAgIHJlcG8udXBkYXRlQ29tYmF0YW50KHRoaXMuaWQsIHtcclxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxyXG4gICAgICBzcGF3bjogdGhpcy50aW1lc3RhbXAsXHJcbiAgICAgIGRlc3Bhd246IHRoaXMudGltZXN0YW1wLFxyXG4gICAgICBqb2I6IHRoaXMuam9iSWRIZXgsXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgY29tYmF0YW50TmFtZSA9IHRoaXMubmFtZTtcclxuICAgIGlmICh0aGlzLndvcmxkTmFtZSAhPT0gJycpXHJcbiAgICAgIGNvbWJhdGFudE5hbWUgPSBjb21iYXRhbnROYW1lICsgJygnICsgdGhpcy53b3JsZE5hbWUgKyAnKSc7XHJcblxyXG4gICAgdGhpcy5jb252ZXJ0ZWRMaW5lID0gdGhpcy5wcmVmaXgoKSArIHRoaXMuaWQudG9VcHBlckNhc2UoKSArXHJcbiAgICAgICc6QWRkZWQgbmV3IGNvbWJhdGFudCAnICsgY29tYmF0YW50TmFtZSArXHJcbiAgICAgICcuICBKb2I6ICcgKyB0aGlzLmpvYiArXHJcbiAgICAgICcgTGV2ZWw6ICcgKyB0aGlzLmxldmVsU3RyaW5nICtcclxuICAgICAgJyBNYXggSFA6ICcgKyB0aGlzLm1heEhwU3RyaW5nICtcclxuICAgICAgJyBNYXggTVA6ICcgKyB0aGlzLm1heE1wU3RyaW5nICtcclxuICAgICAgJyBQb3M6ICgnICsgdGhpcy54U3RyaW5nICsgJywnICsgdGhpcy55U3RyaW5nICsgJywnICsgdGhpcy56U3RyaW5nICsgJyknO1xyXG5cclxuICAgIC8vIFRoaXMgbGFzdCBwYXJ0IGlzIGd1ZXNzd29yayBmb3IgdGhlIGFyZWEgYmV0d2VlbiA5IGFuZCAxMC5cclxuICAgIGNvbnN0IHVua25vd25WYWx1ZSA9IHRoaXMubnBjTmFtZUlkICtcclxuICAgICAgRW11bGF0b3JDb21tb24uemVyb1BhZCh0aGlzLm5wY0Jhc2VJZCwgOCArIE1hdGgubWF4KDAsIDYgLSB0aGlzLm5wY05hbWVJZC5sZW5ndGgpKTtcclxuXHJcbiAgICBpZiAodW5rbm93blZhbHVlICE9PSAnMDAwMDAwMDAwMDAwMDAnKVxyXG4gICAgICB0aGlzLmNvbnZlcnRlZExpbmUgKz0gJyAoJyArIHVua25vd25WYWx1ZSArICcpJztcclxuXHJcbiAgICB0aGlzLmNvbnZlcnRlZExpbmUgKz0gJy4nO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIExpbmVFdmVudDAzIGV4dGVuZHMgTGluZUV2ZW50MHgwMyB7IH1cclxuIiwiaW1wb3J0IHsgTGluZUV2ZW50MHgwMyB9IGZyb20gJy4vTGluZUV2ZW50MHgwMyc7XHJcbmltcG9ydCBMb2dSZXBvc2l0b3J5IGZyb20gJy4vTG9nUmVwb3NpdG9yeSc7XHJcblxyXG4vLyBSZW1vdmVkIGNvbWJhdGFudCBldmVudFxyXG4vLyBFeHRlbmQgdGhlIGFkZCBjb21iYXRhbnQgZXZlbnQgdG8gcmVkdWNlIGR1cGxpY2F0ZSBjb2RlIHNpbmNlIHRoZXkncmVcclxuLy8gdGhlIHNhbWUgZnJvbSBhIGRhdGEgcGVyc3BlY3RpdmVcclxuZXhwb3J0IGNsYXNzIExpbmVFdmVudDB4MDQgZXh0ZW5kcyBMaW5lRXZlbnQweDAzIHtcclxuICBjb25zdHJ1Y3RvcihyZXBvOiBMb2dSZXBvc2l0b3J5LCBsaW5lOiBzdHJpbmcsIHBhcnRzOiBzdHJpbmdbXSkge1xyXG4gICAgc3VwZXIocmVwbywgbGluZSwgcGFydHMpO1xyXG5cclxuICAgIHRoaXMuY29udmVydGVkTGluZSA9IHRoaXMucHJlZml4KCkgKyB0aGlzLmlkLnRvVXBwZXJDYXNlKCkgK1xyXG4gICAgICAnOlJlbW92aW5nIGNvbWJhdGFudCAnICsgdGhpcy5uYW1lICtcclxuICAgICAgJy4gTWF4IE1QOiAnICsgdGhpcy5tYXhNcFN0cmluZyArXHJcbiAgICAgICcuIFBvczogKCcgKyB0aGlzLnhTdHJpbmcgKyAnLCcgKyB0aGlzLnlTdHJpbmcgKyAnLCcgKyB0aGlzLnpTdHJpbmcgKyAnKSc7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTGluZUV2ZW50MDQgZXh0ZW5kcyBMaW5lRXZlbnQweDA0IHsgfVxyXG4iLCJpbXBvcnQgTGluZUV2ZW50IGZyb20gJy4vTGluZUV2ZW50JztcclxuaW1wb3J0IExvZ1JlcG9zaXRvcnkgZnJvbSAnLi9Mb2dSZXBvc2l0b3J5JztcclxuXHJcbmNvbnN0IGZpZWxkcyA9IHtcclxuICBjbGFzczogMixcclxuICBzdHJlbmd0aDogMyxcclxuICBkZXh0ZXJpdHk6IDQsXHJcbiAgdml0YWxpdHk6IDUsXHJcbiAgaW50ZWxsaWdlbmNlOiA2LFxyXG4gIG1pbmQ6IDcsXHJcbiAgcGlldHk6IDgsXHJcbiAgYXR0YWNrUG93ZXI6IDksXHJcbiAgZGlyZWN0SGl0OiAxMCxcclxuICBjcml0aWNhbEhpdDogMTEsXHJcbiAgYXR0YWNrTWFnaWNQb3RlbmN5OiAxMixcclxuICBoZWFsTWFnaWNQb3RlbmN5OiAxMyxcclxuICBkZXRlcm1pbmF0aW9uOiAxNCxcclxuICBza2lsbFNwZWVkOiAxNSxcclxuICBzcGVsbFNwZWVkOiAxNixcclxuICB0ZW5hY2l0eTogMTgsXHJcbn0gYXMgY29uc3Q7XHJcblxyXG4vLyBQbGF5ZXIgc3RhdHMgZXZlbnRcclxuZXhwb3J0IGNsYXNzIExpbmVFdmVudDB4MEMgZXh0ZW5kcyBMaW5lRXZlbnQge1xyXG4gIHB1YmxpYyByZWFkb25seSBjbGFzczogc3RyaW5nO1xyXG4gIHB1YmxpYyByZWFkb25seSBzdHJlbmd0aDogc3RyaW5nO1xyXG4gIHB1YmxpYyByZWFkb25seSBkZXh0ZXJpdHk6IHN0cmluZztcclxuICBwdWJsaWMgcmVhZG9ubHkgdml0YWxpdHk6IHN0cmluZztcclxuICBwdWJsaWMgcmVhZG9ubHkgaW50ZWxsaWdlbmNlOiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IG1pbmQ6IHN0cmluZztcclxuICBwdWJsaWMgcmVhZG9ubHkgcGlldHk6IHN0cmluZztcclxuICBwdWJsaWMgcmVhZG9ubHkgYXR0YWNrUG93ZXI6IHN0cmluZztcclxuICBwdWJsaWMgcmVhZG9ubHkgZGlyZWN0SGl0OiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IGNyaXRpY2FsSGl0OiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IGF0dGFja01hZ2ljUG90ZW5jeTogc3RyaW5nO1xyXG4gIHB1YmxpYyByZWFkb25seSBoZWFsTWFnaWNQb3RlbmN5OiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IGRldGVybWluYXRpb246IHN0cmluZztcclxuICBwdWJsaWMgcmVhZG9ubHkgc2tpbGxTcGVlZDogc3RyaW5nO1xyXG4gIHB1YmxpYyByZWFkb25seSBzcGVsbFNwZWVkOiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IHRlbmFjaXR5OiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHJlcG86IExvZ1JlcG9zaXRvcnksIGxpbmU6IHN0cmluZywgcGFydHM6IHN0cmluZ1tdKSB7XHJcbiAgICBzdXBlcihyZXBvLCBsaW5lLCBwYXJ0cyk7XHJcblxyXG4gICAgdGhpcy5jbGFzcyA9IHBhcnRzW2ZpZWxkcy5jbGFzc10gPz8gJyc7XHJcbiAgICB0aGlzLnN0cmVuZ3RoID0gcGFydHNbZmllbGRzLnN0cmVuZ3RoXSA/PyAnJztcclxuICAgIHRoaXMuZGV4dGVyaXR5ID0gcGFydHNbZmllbGRzLmRleHRlcml0eV0gPz8gJyc7XHJcbiAgICB0aGlzLnZpdGFsaXR5ID0gcGFydHNbZmllbGRzLnZpdGFsaXR5XSA/PyAnJztcclxuICAgIHRoaXMuaW50ZWxsaWdlbmNlID0gcGFydHNbZmllbGRzLmludGVsbGlnZW5jZV0gPz8gJyc7XHJcbiAgICB0aGlzLm1pbmQgPSBwYXJ0c1tmaWVsZHMubWluZF0gPz8gJyc7XHJcbiAgICB0aGlzLnBpZXR5ID0gcGFydHNbZmllbGRzLnBpZXR5XSA/PyAnJztcclxuICAgIHRoaXMuYXR0YWNrUG93ZXIgPSBwYXJ0c1tmaWVsZHMuYXR0YWNrUG93ZXJdID8/ICcnO1xyXG4gICAgdGhpcy5kaXJlY3RIaXQgPSBwYXJ0c1tmaWVsZHMuZGlyZWN0SGl0XSA/PyAnJztcclxuICAgIHRoaXMuY3JpdGljYWxIaXQgPSBwYXJ0c1tmaWVsZHMuY3JpdGljYWxIaXRdID8/ICcnO1xyXG4gICAgdGhpcy5hdHRhY2tNYWdpY1BvdGVuY3kgPSBwYXJ0c1tmaWVsZHMuYXR0YWNrTWFnaWNQb3RlbmN5XSA/PyAnJztcclxuICAgIHRoaXMuaGVhbE1hZ2ljUG90ZW5jeSA9IHBhcnRzW2ZpZWxkcy5oZWFsTWFnaWNQb3RlbmN5XSA/PyAnJztcclxuICAgIHRoaXMuZGV0ZXJtaW5hdGlvbiA9IHBhcnRzW2ZpZWxkcy5kZXRlcm1pbmF0aW9uXSA/PyAnJztcclxuICAgIHRoaXMuc2tpbGxTcGVlZCA9IHBhcnRzW2ZpZWxkcy5za2lsbFNwZWVkXSA/PyAnJztcclxuICAgIHRoaXMuc3BlbGxTcGVlZCA9IHBhcnRzW2ZpZWxkcy5zcGVsbFNwZWVkXSA/PyAnJztcclxuICAgIHRoaXMudGVuYWNpdHkgPSBwYXJ0c1tmaWVsZHMudGVuYWNpdHldID8/ICcnO1xyXG5cclxuICAgIHRoaXMuY29udmVydGVkTGluZSA9IHRoaXMucHJlZml4KCkgK1xyXG4gICAgICAnUGxheWVyIFN0YXRzOiAnICsgcGFydHMuc2xpY2UoMiwgcGFydHMubGVuZ3RoIC0gMSkuam9pbignOicpLnJlcGxhY2UoL1xcfC9nLCAnOicpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIExpbmVFdmVudDEyIGV4dGVuZHMgTGluZUV2ZW50MHgwQyB7IH1cclxuIiwiaW1wb3J0IExpbmVFdmVudCwgeyBMaW5lRXZlbnRBYmlsaXR5LCBMaW5lRXZlbnRTb3VyY2UsIExpbmVFdmVudFRhcmdldCB9IGZyb20gJy4vTGluZUV2ZW50JztcclxuaW1wb3J0IEVtdWxhdG9yQ29tbW9uIGZyb20gJy4uLy4uL0VtdWxhdG9yQ29tbW9uJztcclxuaW1wb3J0IExvZ1JlcG9zaXRvcnkgZnJvbSAnLi9Mb2dSZXBvc2l0b3J5JztcclxuXHJcbmNvbnN0IGZpZWxkcyA9IHtcclxuICBpZDogMixcclxuICBuYW1lOiAzLFxyXG4gIGFiaWxpdHlJZDogNCxcclxuICBhYmlsaXR5TmFtZTogNSxcclxuICB0YXJnZXRJZDogNixcclxuICB0YXJnZXROYW1lOiA3LFxyXG4gIGR1cmF0aW9uOiA4LFxyXG59IGFzIGNvbnN0O1xyXG5cclxuLy8gQWJpbGl0eSB1c2UgZXZlbnRcclxuZXhwb3J0IGNsYXNzIExpbmVFdmVudDB4MTQgZXh0ZW5kcyBMaW5lRXZlbnRcclxuICBpbXBsZW1lbnRzIExpbmVFdmVudFNvdXJjZSwgTGluZUV2ZW50VGFyZ2V0LCBMaW5lRXZlbnRBYmlsaXR5IHtcclxuICBwdWJsaWMgcmVhZG9ubHkgcHJvcGVyQ2FzZUNvbnZlcnRlZExpbmU6IHN0cmluZztcclxuXHJcbiAgcHVibGljIHJlYWRvbmx5IGlkOiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IG5hbWU6IHN0cmluZztcclxuICBwdWJsaWMgcmVhZG9ubHkgYWJpbGl0eUlkOiBudW1iZXI7XHJcbiAgcHVibGljIHJlYWRvbmx5IGFiaWxpdHlJZEhleDogc3RyaW5nO1xyXG4gIHB1YmxpYyByZWFkb25seSBhYmlsaXR5TmFtZTogc3RyaW5nO1xyXG4gIHB1YmxpYyByZWFkb25seSB0YXJnZXRJZDogc3RyaW5nO1xyXG4gIHB1YmxpYyByZWFkb25seSB0YXJnZXROYW1lOiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IGR1cmF0aW9uOiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IGlzU291cmNlID0gdHJ1ZTtcclxuICBwdWJsaWMgcmVhZG9ubHkgaXNUYXJnZXQgPSB0cnVlO1xyXG4gIHB1YmxpYyByZWFkb25seSBpc0FiaWxpdHkgPSB0cnVlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihyZXBvOiBMb2dSZXBvc2l0b3J5LCBsaW5lOiBzdHJpbmcsIHBhcnRzOiBzdHJpbmdbXSkge1xyXG4gICAgc3VwZXIocmVwbywgbGluZSwgcGFydHMpO1xyXG5cclxuICAgIHRoaXMuaWQgPSBwYXJ0c1tmaWVsZHMuaWRdPy50b1VwcGVyQ2FzZSgpID8/ICcnO1xyXG4gICAgdGhpcy5uYW1lID0gcGFydHNbZmllbGRzLm5hbWVdID8/ICcnO1xyXG4gICAgdGhpcy5hYmlsaXR5SWRIZXggPSBwYXJ0c1tmaWVsZHMuYWJpbGl0eUlkXT8udG9VcHBlckNhc2UoKSA/PyAnJztcclxuICAgIHRoaXMuYWJpbGl0eUlkID0gcGFyc2VJbnQodGhpcy5hYmlsaXR5SWRIZXgpO1xyXG4gICAgdGhpcy5hYmlsaXR5TmFtZSA9IHBhcnRzW2ZpZWxkcy5hYmlsaXR5TmFtZV0gPz8gJyc7XHJcbiAgICB0aGlzLnRhcmdldElkID0gcGFydHNbZmllbGRzLnRhcmdldElkXT8udG9VcHBlckNhc2UoKSA/PyAnJztcclxuICAgIHRoaXMudGFyZ2V0TmFtZSA9IHBhcnRzW2ZpZWxkcy50YXJnZXROYW1lXSA/PyAnJztcclxuICAgIHRoaXMuZHVyYXRpb24gPSBwYXJ0c1tmaWVsZHMuZHVyYXRpb25dID8/ICcnO1xyXG5cclxuICAgIHJlcG8udXBkYXRlQ29tYmF0YW50KHRoaXMuaWQsIHtcclxuICAgICAgam9iOiB1bmRlZmluZWQsXHJcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcclxuICAgICAgc3Bhd246IHRoaXMudGltZXN0YW1wLFxyXG4gICAgICBkZXNwYXduOiB0aGlzLnRpbWVzdGFtcCxcclxuICAgIH0pO1xyXG5cclxuICAgIHJlcG8udXBkYXRlQ29tYmF0YW50KHRoaXMudGFyZ2V0SWQsIHtcclxuICAgICAgam9iOiB1bmRlZmluZWQsXHJcbiAgICAgIG5hbWU6IHRoaXMudGFyZ2V0TmFtZSxcclxuICAgICAgc3Bhd246IHRoaXMudGltZXN0YW1wLFxyXG4gICAgICBkZXNwYXduOiB0aGlzLnRpbWVzdGFtcCxcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHRhcmdldCA9IHRoaXMudGFyZ2V0TmFtZS5sZW5ndGggPT09IDAgPyAnVW5rbm93bicgOiB0aGlzLnRhcmdldE5hbWU7XHJcblxyXG4gICAgdGhpcy5jb252ZXJ0ZWRMaW5lID0gdGhpcy5wcmVmaXgoKSArIHRoaXMuYWJpbGl0eUlkSGV4ICtcclxuICAgICAgJzonICsgdGhpcy5uYW1lICtcclxuICAgICAgJyBzdGFydHMgdXNpbmcgJyArIHRoaXMuYWJpbGl0eU5hbWUgK1xyXG4gICAgICAnIG9uICcgKyB0YXJnZXQgKyAnLic7XHJcbiAgICB0aGlzLnByb3BlckNhc2VDb252ZXJ0ZWRMaW5lID0gdGhpcy5wcmVmaXgoKSArIHRoaXMuYWJpbGl0eUlkSGV4ICtcclxuICAgICAgJzonICsgRW11bGF0b3JDb21tb24ucHJvcGVyQ2FzZSh0aGlzLm5hbWUpICtcclxuICAgICAgJyBzdGFydHMgdXNpbmcgJyArIHRoaXMuYWJpbGl0eU5hbWUgK1xyXG4gICAgICAnIG9uICcgKyBFbXVsYXRvckNvbW1vbi5wcm9wZXJDYXNlKHRhcmdldCkgKyAnLic7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTGluZUV2ZW50MjAgZXh0ZW5kcyBMaW5lRXZlbnQweDE0IHsgfVxyXG4iLCJpbXBvcnQgTGluZUV2ZW50LCB7IExpbmVFdmVudEFiaWxpdHksIExpbmVFdmVudFNvdXJjZSwgTGluZUV2ZW50VGFyZ2V0IH0gZnJvbSAnLi9MaW5lRXZlbnQnO1xyXG5pbXBvcnQgTG9nUmVwb3NpdG9yeSBmcm9tICcuL0xvZ1JlcG9zaXRvcnknO1xyXG5cclxuY29uc3QgZmllbGRzID0ge1xyXG4gIGlkOiAyLFxyXG4gIG5hbWU6IDMsXHJcbiAgZmxhZ3M6IDgsXHJcbiAgZGFtYWdlOiA5LFxyXG4gIGFiaWxpdHlJZDogNCxcclxuICBhYmlsaXR5TmFtZTogNSxcclxuICB0YXJnZXRJZDogNixcclxuICB0YXJnZXROYW1lOiA3LFxyXG4gIHRhcmdldEhwOiAyNCxcclxuICB0YXJnZXRNYXhIcDogMjUsXHJcbiAgdGFyZ2V0TXA6IDI2LFxyXG4gIHRhcmdldE1heE1wOiAyNyxcclxuICB0YXJnZXRYOiAzMCxcclxuICB0YXJnZXRZOiAzMSxcclxuICB0YXJnZXRaOiAzMixcclxuICB0YXJnZXRIZWFkaW5nOiAzMyxcclxuICBzb3VyY2VIcDogMzQsXHJcbiAgc291cmNlTWF4SHA6IDM1LFxyXG4gIHNvdXJjZU1wOiAzNixcclxuICBzb3VyY2VNYXhNcDogMzcsXHJcbiAgeDogNDAsXHJcbiAgeTogNDEsXHJcbiAgejogNDIsXHJcbiAgaGVhZGluZzogNDMsXHJcbn0gYXMgY29uc3Q7XHJcblxyXG4vLyBBYmlsaXR5IGhpdCBzaW5nbGUgdGFyZ2V0IGV2ZW50XHJcbmV4cG9ydCBjbGFzcyBMaW5lRXZlbnQweDE1IGV4dGVuZHMgTGluZUV2ZW50XHJcbiAgaW1wbGVtZW50cyBMaW5lRXZlbnRTb3VyY2UsIExpbmVFdmVudFRhcmdldCwgTGluZUV2ZW50QWJpbGl0eSB7XHJcbiAgcHVibGljIHJlYWRvbmx5IGRhbWFnZTogbnVtYmVyO1xyXG4gIHB1YmxpYyByZWFkb25seSBpZDogc3RyaW5nO1xyXG4gIHB1YmxpYyByZWFkb25seSBuYW1lOiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IGFiaWxpdHlJZDogbnVtYmVyO1xyXG4gIHB1YmxpYyByZWFkb25seSBhYmlsaXR5TmFtZTogc3RyaW5nO1xyXG4gIHB1YmxpYyByZWFkb25seSB0YXJnZXRJZDogc3RyaW5nO1xyXG4gIHB1YmxpYyByZWFkb25seSB0YXJnZXROYW1lOiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IGZsYWdzOiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IHRhcmdldEhwOiBudW1iZXI7XHJcbiAgcHVibGljIHJlYWRvbmx5IHRhcmdldE1heEhwOiBudW1iZXI7XHJcbiAgcHVibGljIHJlYWRvbmx5IHRhcmdldE1wOiBudW1iZXI7XHJcbiAgcHVibGljIHJlYWRvbmx5IHRhcmdldE1heE1wOiBudW1iZXI7XHJcbiAgcHVibGljIHJlYWRvbmx5IHRhcmdldFg6IG51bWJlcjtcclxuICBwdWJsaWMgcmVhZG9ubHkgdGFyZ2V0WTogbnVtYmVyO1xyXG4gIHB1YmxpYyByZWFkb25seSB0YXJnZXRaOiBudW1iZXI7XHJcbiAgcHVibGljIHJlYWRvbmx5IHRhcmdldEhlYWRpbmc6IG51bWJlcjtcclxuICBwdWJsaWMgcmVhZG9ubHkgaHA6IG51bWJlcjtcclxuICBwdWJsaWMgcmVhZG9ubHkgbWF4SHA6IG51bWJlcjtcclxuICBwdWJsaWMgcmVhZG9ubHkgbXA6IG51bWJlcjtcclxuICBwdWJsaWMgcmVhZG9ubHkgbWF4TXA6IG51bWJlcjtcclxuICBwdWJsaWMgcmVhZG9ubHkgeDogbnVtYmVyO1xyXG4gIHB1YmxpYyByZWFkb25seSB5OiBudW1iZXI7XHJcbiAgcHVibGljIHJlYWRvbmx5IHo6IG51bWJlcjtcclxuICBwdWJsaWMgcmVhZG9ubHkgaGVhZGluZzogbnVtYmVyO1xyXG4gIHB1YmxpYyByZWFkb25seSBpc1NvdXJjZSA9IHRydWU7XHJcbiAgcHVibGljIHJlYWRvbmx5IGlzVGFyZ2V0ID0gdHJ1ZTtcclxuICBwdWJsaWMgcmVhZG9ubHkgaXNBYmlsaXR5ID0gdHJ1ZTtcclxuXHJcbiAgY29uc3RydWN0b3IocmVwbzogTG9nUmVwb3NpdG9yeSwgbGluZTogc3RyaW5nLCBwYXJ0czogc3RyaW5nW10pIHtcclxuICAgIHN1cGVyKHJlcG8sIGxpbmUsIHBhcnRzKTtcclxuXHJcbiAgICB0aGlzLmlkID0gcGFydHNbZmllbGRzLmlkXT8udG9VcHBlckNhc2UoKSA/PyAnJztcclxuICAgIHRoaXMubmFtZSA9IHBhcnRzW2ZpZWxkcy5uYW1lXSA/PyAnJztcclxuXHJcbiAgICB0aGlzLmZsYWdzID0gcGFydHNbZmllbGRzLmZsYWdzXSA/PyAnJztcclxuXHJcbiAgICBjb25zdCBmaWVsZE9mZnNldCA9IHRoaXMuZmxhZ3MgPT09ICczRicgPyAyIDogMDtcclxuXHJcbiAgICB0aGlzLmRhbWFnZSA9IExpbmVFdmVudC5jYWxjdWxhdGVEYW1hZ2UocGFydHNbZmllbGRzLmRhbWFnZSArIGZpZWxkT2Zmc2V0XSA/PyAnJyk7XHJcbiAgICB0aGlzLmFiaWxpdHlJZCA9IHBhcnNlSW50KHBhcnRzW2ZpZWxkcy5hYmlsaXR5SWRdPy50b1VwcGVyQ2FzZSgpID8/ICcnKTtcclxuICAgIHRoaXMuYWJpbGl0eU5hbWUgPSBwYXJ0c1tmaWVsZHMuYWJpbGl0eU5hbWVdID8/ICcnO1xyXG4gICAgdGhpcy50YXJnZXRJZCA9IHBhcnRzW2ZpZWxkcy50YXJnZXRJZF0/LnRvVXBwZXJDYXNlKCkgPz8gJyc7XHJcbiAgICB0aGlzLnRhcmdldE5hbWUgPSBwYXJ0c1tmaWVsZHMudGFyZ2V0TmFtZV0gPz8gJyc7XHJcblxyXG4gICAgdGhpcy50YXJnZXRIcCA9IHBhcnNlSW50KHBhcnRzW2ZpZWxkcy50YXJnZXRIcCArIGZpZWxkT2Zmc2V0XSA/PyAnJyk7XHJcbiAgICB0aGlzLnRhcmdldE1heEhwID0gcGFyc2VJbnQocGFydHNbZmllbGRzLnRhcmdldE1heEhwICsgZmllbGRPZmZzZXRdID8/ICcnKTtcclxuICAgIHRoaXMudGFyZ2V0TXAgPSBwYXJzZUludChwYXJ0c1tmaWVsZHMudGFyZ2V0TXAgKyBmaWVsZE9mZnNldF0gPz8gJycpO1xyXG4gICAgdGhpcy50YXJnZXRNYXhNcCA9IHBhcnNlSW50KHBhcnRzW2ZpZWxkcy50YXJnZXRNYXhNcCArIGZpZWxkT2Zmc2V0XSA/PyAnJyk7XHJcbiAgICB0aGlzLnRhcmdldFggPSBwYXJzZUZsb2F0KHBhcnRzW2ZpZWxkcy50YXJnZXRYICsgZmllbGRPZmZzZXRdID8/ICcnKTtcclxuICAgIHRoaXMudGFyZ2V0WSA9IHBhcnNlRmxvYXQocGFydHNbZmllbGRzLnRhcmdldFkgKyBmaWVsZE9mZnNldF0gPz8gJycpO1xyXG4gICAgdGhpcy50YXJnZXRaID0gcGFyc2VGbG9hdChwYXJ0c1tmaWVsZHMudGFyZ2V0WiArIGZpZWxkT2Zmc2V0XSA/PyAnJyk7XHJcbiAgICB0aGlzLnRhcmdldEhlYWRpbmcgPSBwYXJzZUZsb2F0KHBhcnRzW2ZpZWxkcy50YXJnZXRIZWFkaW5nICsgZmllbGRPZmZzZXRdID8/ICcnKTtcclxuXHJcbiAgICB0aGlzLmhwID0gcGFyc2VJbnQocGFydHNbZmllbGRzLnNvdXJjZUhwICsgZmllbGRPZmZzZXRdID8/ICcnKTtcclxuICAgIHRoaXMubWF4SHAgPSBwYXJzZUludChwYXJ0c1tmaWVsZHMuc291cmNlTWF4SHAgKyBmaWVsZE9mZnNldF0gPz8gJycpO1xyXG4gICAgdGhpcy5tcCA9IHBhcnNlSW50KHBhcnRzW2ZpZWxkcy5zb3VyY2VNcCArIGZpZWxkT2Zmc2V0XSA/PyAnJyk7XHJcbiAgICB0aGlzLm1heE1wID0gcGFyc2VJbnQocGFydHNbZmllbGRzLnNvdXJjZU1heE1wICsgZmllbGRPZmZzZXRdID8/ICcnKTtcclxuICAgIHRoaXMueCA9IHBhcnNlRmxvYXQocGFydHNbZmllbGRzLnggKyBmaWVsZE9mZnNldF0gPz8gJycpO1xyXG4gICAgdGhpcy55ID0gcGFyc2VGbG9hdChwYXJ0c1tmaWVsZHMueSArIGZpZWxkT2Zmc2V0XSA/PyAnJyk7XHJcbiAgICB0aGlzLnogPSBwYXJzZUZsb2F0KHBhcnRzW2ZpZWxkcy56ICsgZmllbGRPZmZzZXRdID8/ICcnKTtcclxuICAgIHRoaXMuaGVhZGluZyA9IHBhcnNlRmxvYXQocGFydHNbZmllbGRzLmhlYWRpbmcgKyBmaWVsZE9mZnNldF0gPz8gJycpO1xyXG5cclxuXHJcbiAgICByZXBvLnVwZGF0ZUNvbWJhdGFudCh0aGlzLmlkLCB7XHJcbiAgICAgIGpvYjogdW5kZWZpbmVkLFxyXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXHJcbiAgICAgIHNwYXduOiB0aGlzLnRpbWVzdGFtcCxcclxuICAgICAgZGVzcGF3bjogdGhpcy50aW1lc3RhbXAsXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXBvLnVwZGF0ZUNvbWJhdGFudCh0aGlzLnRhcmdldElkLCB7XHJcbiAgICAgIGpvYjogdW5kZWZpbmVkLFxyXG4gICAgICBuYW1lOiB0aGlzLnRhcmdldE5hbWUsXHJcbiAgICAgIHNwYXduOiB0aGlzLnRpbWVzdGFtcCxcclxuICAgICAgZGVzcGF3bjogdGhpcy50aW1lc3RhbXAsXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBMaW5lRXZlbnQyMSBleHRlbmRzIExpbmVFdmVudDB4MTUge31cclxuIiwiaW1wb3J0IHsgTGluZUV2ZW50MHgxNSB9IGZyb20gJy4vTGluZUV2ZW50MHgxNSc7XHJcbmltcG9ydCBMb2dSZXBvc2l0b3J5IGZyb20gJy4vTG9nUmVwb3NpdG9yeSc7XHJcblxyXG4vLyBBYmlsaXR5IGhpdCBtdWx0aXBsZS9ubyB0YXJnZXQgZXZlbnRcclxuLy8gRHVwbGljYXRlIG9mIDB4MTUgYXMgZmFyIGFzIGRhdGFcclxuZXhwb3J0IGNsYXNzIExpbmVFdmVudDB4MTYgZXh0ZW5kcyBMaW5lRXZlbnQweDE1IHtcclxuICBjb25zdHJ1Y3RvcihyZXBvOiBMb2dSZXBvc2l0b3J5LCBsaW5lOiBzdHJpbmcsIHBhcnRzOiBzdHJpbmdbXSkge1xyXG4gICAgc3VwZXIocmVwbywgbGluZSwgcGFydHMpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIExpbmVFdmVudDIyIGV4dGVuZHMgTGluZUV2ZW50MHgxNiB7fVxyXG4iLCJpbXBvcnQgTGluZUV2ZW50LCB7IExpbmVFdmVudEFiaWxpdHksIExpbmVFdmVudFNvdXJjZSB9IGZyb20gJy4vTGluZUV2ZW50JztcclxuaW1wb3J0IExvZ1JlcG9zaXRvcnkgZnJvbSAnLi9Mb2dSZXBvc2l0b3J5JztcclxuXHJcbmNvbnN0IGZpZWxkcyA9IHtcclxuICBpZDogMixcclxuICBuYW1lOiAzLFxyXG4gIGFiaWxpdHlJZDogNCxcclxuICBhYmlsaXR5TmFtZTogNSxcclxuICByZWFzb246IDYsXHJcbn0gYXMgY29uc3Q7XHJcblxyXG4vLyBDYW5jZWwgYWJpbGl0eSBldmVudFxyXG5leHBvcnQgY2xhc3MgTGluZUV2ZW50MHgxNyBleHRlbmRzIExpbmVFdmVudFxyXG4gIGltcGxlbWVudHMgTGluZUV2ZW50U291cmNlLCBMaW5lRXZlbnRBYmlsaXR5IHtcclxuICBwdWJsaWMgcmVhZG9ubHkgaWQ6IHN0cmluZztcclxuICBwdWJsaWMgcmVhZG9ubHkgbmFtZTogc3RyaW5nO1xyXG4gIHB1YmxpYyByZWFkb25seSBhYmlsaXR5SWQ6IG51bWJlcjtcclxuICBwdWJsaWMgcmVhZG9ubHkgYWJpbGl0eU5hbWU6IHN0cmluZztcclxuICBwdWJsaWMgcmVhZG9ubHkgcmVhc29uOiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IGlzU291cmNlID0gdHJ1ZTtcclxuICBwdWJsaWMgcmVhZG9ubHkgaXNBYmlsaXR5ID0gdHJ1ZTtcclxuXHJcbiAgY29uc3RydWN0b3IocmVwbzogTG9nUmVwb3NpdG9yeSwgbGluZTogc3RyaW5nLCBwYXJ0czogc3RyaW5nW10pIHtcclxuICAgIHN1cGVyKHJlcG8sIGxpbmUsIHBhcnRzKTtcclxuXHJcbiAgICB0aGlzLmlkID0gcGFydHNbZmllbGRzLmlkXT8udG9VcHBlckNhc2UoKSA/PyAnJztcclxuICAgIHRoaXMubmFtZSA9IHBhcnRzW2ZpZWxkcy5uYW1lXSA/PyAnJztcclxuICAgIHRoaXMuYWJpbGl0eUlkID0gcGFyc2VJbnQocGFydHNbZmllbGRzLmFiaWxpdHlJZF0/LnRvVXBwZXJDYXNlKCkgPz8gJycpO1xyXG4gICAgdGhpcy5hYmlsaXR5TmFtZSA9IHBhcnRzW2ZpZWxkcy5hYmlsaXR5TmFtZV0gPz8gJyc7XHJcbiAgICB0aGlzLnJlYXNvbiA9IHBhcnRzW2ZpZWxkcy5yZWFzb25dID8/ICcnO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIExpbmVFdmVudDIzIGV4dGVuZHMgTGluZUV2ZW50MHgxNyB7fVxyXG4iLCJpbXBvcnQgTGluZUV2ZW50LCB7IExpbmVFdmVudFNvdXJjZSB9IGZyb20gJy4vTGluZUV2ZW50JztcclxuaW1wb3J0IEVtdWxhdG9yQ29tbW9uIGZyb20gJy4uLy4uL0VtdWxhdG9yQ29tbW9uJztcclxuaW1wb3J0IExvZ1JlcG9zaXRvcnkgZnJvbSAnLi9Mb2dSZXBvc2l0b3J5JztcclxuXHJcbmNvbnN0IGZpZWxkcyA9IHtcclxuICBpZDogMixcclxuICBuYW1lOiAzLFxyXG4gIHR5cGU6IDQsXHJcbiAgZWZmZWN0SWQ6IDUsXHJcbiAgZGFtYWdlOiA2LFxyXG4gIGN1cnJlbnRIcDogNyxcclxuICBtYXhIcDogOCxcclxuICBjdXJyZW50TXA6IDksXHJcbiAgbWF4TXA6IDEwLFxyXG4gIGN1cnJlbnRUcDogMTEsXHJcbiAgbWF4VHA6IDEyLFxyXG4gIHg6IDEzLFxyXG4gIHk6IDE0LFxyXG4gIHo6IDE1LFxyXG4gIGhlYWRpbmc6IDE2LFxyXG59IGFzIGNvbnN0O1xyXG5cclxuLy8gRG9UL0hvVCBldmVudFxyXG5leHBvcnQgY2xhc3MgTGluZUV2ZW50MHgxOCBleHRlbmRzIExpbmVFdmVudCBpbXBsZW1lbnRzIExpbmVFdmVudFNvdXJjZSB7XHJcbiAgcHVibGljIHJlYWRvbmx5IHByb3BlckNhc2VDb252ZXJ0ZWRMaW5lOiBzdHJpbmc7XHJcblxyXG4gIHB1YmxpYyByZWFkb25seSBpZDogc3RyaW5nO1xyXG4gIHB1YmxpYyByZWFkb25seSBuYW1lOiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IHR5cGU6IHN0cmluZztcclxuICBwdWJsaWMgcmVhZG9ubHkgZWZmZWN0SWQ6IHN0cmluZztcclxuICBwdWJsaWMgcmVhZG9ubHkgZGFtYWdlOiBudW1iZXI7XHJcbiAgcHVibGljIHJlYWRvbmx5IGhwOiBudW1iZXI7XHJcbiAgcHVibGljIHJlYWRvbmx5IG1heEhwOiBudW1iZXI7XHJcbiAgcHVibGljIHJlYWRvbmx5IG1wOiBudW1iZXI7XHJcbiAgcHVibGljIHJlYWRvbmx5IG1heE1wOiBudW1iZXI7XHJcbiAgcHVibGljIHJlYWRvbmx5IHRwOiBudW1iZXI7XHJcbiAgcHVibGljIHJlYWRvbmx5IG1heFRwOiBudW1iZXI7XHJcbiAgcHVibGljIHJlYWRvbmx5IHg6IG51bWJlcjtcclxuICBwdWJsaWMgcmVhZG9ubHkgeTogbnVtYmVyO1xyXG4gIHB1YmxpYyByZWFkb25seSB6OiBudW1iZXI7XHJcbiAgcHVibGljIHJlYWRvbmx5IGhlYWRpbmc6IG51bWJlcjtcclxuICBwdWJsaWMgcmVhZG9ubHkgaXNTb3VyY2UgPSB0cnVlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihyZXBvOiBMb2dSZXBvc2l0b3J5LCBsaW5lOiBzdHJpbmcsIHBhcnRzOiBzdHJpbmdbXSkge1xyXG4gICAgc3VwZXIocmVwbywgbGluZSwgcGFydHMpO1xyXG5cclxuICAgIHRoaXMuaWQgPSBwYXJ0c1tmaWVsZHMuaWRdPy50b1VwcGVyQ2FzZSgpID8/ICcnO1xyXG4gICAgdGhpcy5uYW1lID0gcGFydHNbZmllbGRzLm5hbWVdID8/ICcnO1xyXG5cclxuICAgIHRoaXMudHlwZSA9IHBhcnRzW2ZpZWxkcy50eXBlXSA/PyAnJztcclxuICAgIHRoaXMuZWZmZWN0SWQgPSBwYXJ0c1tmaWVsZHMuZWZmZWN0SWRdPy50b1VwcGVyQ2FzZSgpID8/ICcnO1xyXG4gICAgdGhpcy5kYW1hZ2UgPSBwYXJzZUludChwYXJ0c1tmaWVsZHMuZGFtYWdlXSA/PyAnJywgMTYpO1xyXG5cclxuICAgIHRoaXMuaHAgPSBwYXJzZUludChwYXJ0c1tmaWVsZHMuY3VycmVudEhwXSA/PyAnJyk7XHJcbiAgICB0aGlzLm1heEhwID0gcGFyc2VJbnQocGFydHNbZmllbGRzLm1heEhwXSA/PyAnJyk7XHJcbiAgICB0aGlzLm1wID0gcGFyc2VJbnQocGFydHNbZmllbGRzLmN1cnJlbnRNcF0gPz8gJycpO1xyXG4gICAgdGhpcy5tYXhNcCA9IHBhcnNlSW50KHBhcnRzW2ZpZWxkcy5tYXhNcF0gPz8gJycpO1xyXG4gICAgdGhpcy50cCA9IHBhcnNlSW50KHBhcnRzW2ZpZWxkcy5jdXJyZW50VHBdID8/ICcnKTtcclxuICAgIHRoaXMubWF4VHAgPSBwYXJzZUludChwYXJ0c1tmaWVsZHMubWF4VHBdID8/ICcnKTtcclxuICAgIHRoaXMueCA9IHBhcnNlRmxvYXQocGFydHNbZmllbGRzLnhdID8/ICcnKTtcclxuICAgIHRoaXMueSA9IHBhcnNlRmxvYXQocGFydHNbZmllbGRzLnldID8/ICcnKTtcclxuICAgIHRoaXMueiA9IHBhcnNlRmxvYXQocGFydHNbZmllbGRzLnpdID8/ICcnKTtcclxuICAgIHRoaXMuaGVhZGluZyA9IHBhcnNlRmxvYXQocGFydHNbZmllbGRzLmhlYWRpbmddID8/ICcnKTtcclxuXHJcbiAgICByZXBvLnVwZGF0ZUNvbWJhdGFudCh0aGlzLmlkLCB7XHJcbiAgICAgIGpvYjogdW5kZWZpbmVkLFxyXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXHJcbiAgICAgIHNwYXduOiB0aGlzLnRpbWVzdGFtcCxcclxuICAgICAgZGVzcGF3bjogdGhpcy50aW1lc3RhbXAsXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgZWZmZWN0TmFtZSA9ICcnO1xyXG4gICAgY29uc3QgcmVzb2x2ZWROYW1lID0gcmVwby5yZXNvbHZlTmFtZSh0aGlzLmlkLCB0aGlzLm5hbWUpO1xyXG5cclxuICAgIGlmICh0aGlzLmVmZmVjdElkIGluIExpbmVFdmVudDB4MTguc2hvd0VmZmVjdE5hbWVzRm9yKVxyXG4gICAgICBlZmZlY3ROYW1lID0gTGluZUV2ZW50MHgxOC5zaG93RWZmZWN0TmFtZXNGb3JbdGhpcy5lZmZlY3RJZF0gPz8gJyc7XHJcblxyXG4gICAgbGV0IGVmZmVjdFBhcnQgPSAnJztcclxuICAgIGlmIChlZmZlY3ROYW1lKVxyXG4gICAgICBlZmZlY3RQYXJ0ID0gZWZmZWN0TmFtZSArICcgJztcclxuXHJcbiAgICB0aGlzLmNvbnZlcnRlZExpbmUgPSB0aGlzLnByZWZpeCgpICsgZWZmZWN0UGFydCArIHRoaXMudHlwZSArXHJcbiAgICAgICcgVGljayBvbiAnICsgcmVzb2x2ZWROYW1lICtcclxuICAgICAgJyBmb3IgJyArIHRoaXMuZGFtYWdlLnRvU3RyaW5nKCkgKyAnIGRhbWFnZS4nO1xyXG5cclxuICAgIHRoaXMucHJvcGVyQ2FzZUNvbnZlcnRlZExpbmUgPSB0aGlzLnByZWZpeCgpICsgZWZmZWN0UGFydCArIHRoaXMudHlwZSArXHJcbiAgICAgICcgVGljayBvbiAnICsgRW11bGF0b3JDb21tb24ucHJvcGVyQ2FzZShyZXNvbHZlZE5hbWUpICtcclxuICAgICAgJyBmb3IgJyArIHRoaXMuZGFtYWdlLnRvU3RyaW5nKCkgKyAnIGRhbWFnZS4nO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHNob3dFZmZlY3ROYW1lc0ZvcjogeyBbZWZmZWN0SWQ6IHN0cmluZ106IHN0cmluZyB9ID0ge1xyXG4gICAgJzRDNCc6ICdFeGNvZ25pdGlvbicsXHJcbiAgICAnMzVEJzogJ1dpbGRmaXJlJyxcclxuICAgICcxRjUnOiAnRG90b24nLFxyXG4gICAgJzJFRCc6ICdTYWx0ZWQgRWFydGgnLFxyXG4gICAgJzRCNSc6ICdGbGFtZXRocm93ZXInLFxyXG4gICAgJzJFMyc6ICdBc3lsdW0nLFxyXG4gICAgJzc3Nyc6ICdBc3lsdW0nLFxyXG4gICAgJzc5OCc6ICdTYWNyZWQgU29pbCcsXHJcbiAgICAnNEM3JzogJ0ZleSBVbmlvbicsXHJcbiAgICAnNzQyJzogJ05hc2NlbnQgR2xpbnQnLFxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBMaW5lRXZlbnQyNCBleHRlbmRzIExpbmVFdmVudDB4MTggeyB9XHJcbiIsImltcG9ydCBMaW5lRXZlbnQgZnJvbSAnLi9MaW5lRXZlbnQnO1xyXG5pbXBvcnQgRW11bGF0b3JDb21tb24gZnJvbSAnLi4vLi4vRW11bGF0b3JDb21tb24nO1xyXG5pbXBvcnQgTG9nUmVwb3NpdG9yeSBmcm9tICcuL0xvZ1JlcG9zaXRvcnknO1xyXG5cclxuY29uc3QgZmllbGRzID0ge1xyXG4gIGlkOiAyLFxyXG4gIG5hbWU6IDMsXHJcbiAgdGFyZ2V0SWQ6IDQsXHJcbiAgdGFyZ2V0TmFtZTogNSxcclxufSBhcyBjb25zdDtcclxuXHJcbi8vIENvbWJhdGFudCBkZWZlYXRlZCBldmVudFxyXG5leHBvcnQgY2xhc3MgTGluZUV2ZW50MHgxOSBleHRlbmRzIExpbmVFdmVudCB7XHJcbiAgcHVibGljIHJlYWRvbmx5IHByb3BlckNhc2VDb252ZXJ0ZWRMaW5lOiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IGlkOiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IG5hbWU6IHN0cmluZztcclxuICBwdWJsaWMgcmVhZG9ubHkgdGFyZ2V0SWQ6IHN0cmluZztcclxuICBwdWJsaWMgcmVhZG9ubHkgdGFyZ2V0TmFtZTogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihyZXBvOiBMb2dSZXBvc2l0b3J5LCBsaW5lOiBzdHJpbmcsIHBhcnRzOiBzdHJpbmdbXSkge1xyXG4gICAgc3VwZXIocmVwbywgbGluZSwgcGFydHMpO1xyXG5cclxuICAgIHRoaXMuaWQgPSBwYXJ0c1tmaWVsZHMuaWRdPy50b1VwcGVyQ2FzZSgpID8/ICcnO1xyXG4gICAgdGhpcy5uYW1lID0gcGFydHNbZmllbGRzLm5hbWVdID8/ICcnO1xyXG4gICAgdGhpcy50YXJnZXRJZCA9IHBhcnRzW2ZpZWxkcy50YXJnZXRJZF0/LnRvVXBwZXJDYXNlKCkgPz8gJyc7XHJcbiAgICB0aGlzLnRhcmdldE5hbWUgPSBwYXJ0c1tmaWVsZHMudGFyZ2V0TmFtZV0gPz8gJyc7XHJcblxyXG4gICAgcmVwby51cGRhdGVDb21iYXRhbnQodGhpcy5pZCwge1xyXG4gICAgICBqb2I6IHVuZGVmaW5lZCxcclxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxyXG4gICAgICBzcGF3bjogdGhpcy50aW1lc3RhbXAsXHJcbiAgICAgIGRlc3Bhd246IHRoaXMudGltZXN0YW1wLFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmVwby51cGRhdGVDb21iYXRhbnQodGhpcy50YXJnZXRJZCwge1xyXG4gICAgICBqb2I6IHVuZGVmaW5lZCxcclxuICAgICAgbmFtZTogdGhpcy50YXJnZXROYW1lLFxyXG4gICAgICBzcGF3bjogdGhpcy50aW1lc3RhbXAsXHJcbiAgICAgIGRlc3Bhd246IHRoaXMudGltZXN0YW1wLFxyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IHJlc29sdmVkTmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgbGV0IHJlc29sdmVkVGFyZ2V0TmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG5cclxuICAgIGlmICh0aGlzLmlkICE9PSAnMDAnKVxyXG4gICAgICByZXNvbHZlZE5hbWUgPSByZXBvLnJlc29sdmVOYW1lKHRoaXMuaWQsIHRoaXMubmFtZSk7XHJcblxyXG4gICAgaWYgKHRoaXMudGFyZ2V0SWQgIT09ICcwMCcpXHJcbiAgICAgIHJlc29sdmVkVGFyZ2V0TmFtZSA9IHJlcG8ucmVzb2x2ZU5hbWUodGhpcy50YXJnZXRJZCwgdGhpcy50YXJnZXROYW1lKTtcclxuXHJcbiAgICBjb25zdCBkZWZlYXRlZE5hbWUgPSAocmVzb2x2ZWROYW1lID8/IHRoaXMubmFtZSk7XHJcbiAgICBjb25zdCBraWxsZXJOYW1lID0gKHJlc29sdmVkVGFyZ2V0TmFtZSA/PyB0aGlzLnRhcmdldE5hbWUpO1xyXG4gICAgdGhpcy5jb252ZXJ0ZWRMaW5lID0gdGhpcy5wcmVmaXgoKSArIGRlZmVhdGVkTmFtZSArXHJcbiAgICAgICcgd2FzIGRlZmVhdGVkIGJ5ICcgKyBraWxsZXJOYW1lICsgJy4nO1xyXG4gICAgdGhpcy5wcm9wZXJDYXNlQ29udmVydGVkTGluZSA9IHRoaXMucHJlZml4KCkgKyBFbXVsYXRvckNvbW1vbi5wcm9wZXJDYXNlKGRlZmVhdGVkTmFtZSkgK1xyXG4gICAgICAnIHdhcyBkZWZlYXRlZCBieSAnICsgRW11bGF0b3JDb21tb24ucHJvcGVyQ2FzZShraWxsZXJOYW1lKSArICcuJztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBMaW5lRXZlbnQyNSBleHRlbmRzIExpbmVFdmVudDB4MTkgeyB9XHJcbiIsImltcG9ydCBMaW5lRXZlbnQsIHsgTGluZUV2ZW50QWJpbGl0eSB9IGZyb20gJy4vTGluZUV2ZW50JztcclxuaW1wb3J0IEVtdWxhdG9yQ29tbW9uIGZyb20gJy4uLy4uL0VtdWxhdG9yQ29tbW9uJztcclxuaW1wb3J0IExvZ1JlcG9zaXRvcnkgZnJvbSAnLi9Mb2dSZXBvc2l0b3J5JztcclxuXHJcbmNvbnN0IGZpZWxkcyA9IHtcclxuICBhYmlsaXR5SWQ6IDIsXHJcbiAgYWJpbGl0eU5hbWU6IDMsXHJcbiAgZHVyYXRpb25TdHJpbmc6IDQsXHJcbiAgaWQ6IDUsXHJcbiAgbmFtZTogNixcclxuICB0YXJnZXRJZDogNyxcclxuICB0YXJnZXROYW1lOiA4LFxyXG4gIHN0YWNrczogOSxcclxuICB0YXJnZXRIcDogMTAsXHJcbiAgc291cmNlSHA6IDExLFxyXG59IGFzIGNvbnN0O1xyXG5cclxuLy8gR2FpbiBzdGF0dXMgZWZmZWN0IGV2ZW50XHJcbi8vIERlbGliZXJhdGVseSBkb24ndCBmbGFnIHRoaXMgYXMgTGluZUV2ZW50U291cmNlIG9yIExpbmVFdmVudFRhcmdldFxyXG4vLyBiZWNhdXNlIDB4MUEgbGluZSB2YWx1ZXMgYXJlbid0IGFjY3VyYXRlXHJcbmV4cG9ydCBjbGFzcyBMaW5lRXZlbnQweDFBIGV4dGVuZHMgTGluZUV2ZW50IGltcGxlbWVudHMgTGluZUV2ZW50QWJpbGl0eSB7XHJcbiAgcHVibGljIHJlYWRvbmx5IHJlc29sdmVkTmFtZTogc3RyaW5nO1xyXG4gIHB1YmxpYyByZWFkb25seSByZXNvbHZlZFRhcmdldE5hbWU6IHN0cmluZztcclxuICBwdWJsaWMgcmVhZG9ubHkgZmFsbGJhY2tSZXNvbHZlZFRhcmdldE5hbWU6IHN0cmluZztcclxuICBwdWJsaWMgcmVhZG9ubHkgcHJvcGVyQ2FzZUNvbnZlcnRlZExpbmU6IHN0cmluZztcclxuXHJcbiAgcHVibGljIHJlYWRvbmx5IGFiaWxpdHlJZDogbnVtYmVyO1xyXG4gIHB1YmxpYyByZWFkb25seSBhYmlsaXR5TmFtZTogc3RyaW5nO1xyXG4gIHB1YmxpYyByZWFkb25seSBkdXJhdGlvbkZsb2F0OiBudW1iZXI7XHJcbiAgcHVibGljIHJlYWRvbmx5IGR1cmF0aW9uU3RyaW5nOiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IGlkOiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IG5hbWU6IHN0cmluZztcclxuICBwdWJsaWMgcmVhZG9ubHkgdGFyZ2V0SWQ6IHN0cmluZztcclxuICBwdWJsaWMgcmVhZG9ubHkgdGFyZ2V0TmFtZTogc3RyaW5nO1xyXG4gIHB1YmxpYyByZWFkb25seSBzdGFja3M6IG51bWJlcjtcclxuICBwdWJsaWMgcmVhZG9ubHkgdGFyZ2V0SHA6IG51bWJlcjtcclxuICBwdWJsaWMgcmVhZG9ubHkgaHA6IG51bWJlcjtcclxuICBwdWJsaWMgcmVhZG9ubHkgaXNBYmlsaXR5ID0gdHJ1ZTtcclxuXHJcbiAgY29uc3RydWN0b3IocmVwbzogTG9nUmVwb3NpdG9yeSwgbGluZTogc3RyaW5nLCBwYXJ0czogc3RyaW5nW10pIHtcclxuICAgIHN1cGVyKHJlcG8sIGxpbmUsIHBhcnRzKTtcclxuXHJcbiAgICB0aGlzLmFiaWxpdHlJZCA9IHBhcnNlSW50KHBhcnRzW2ZpZWxkcy5hYmlsaXR5SWRdPy50b1VwcGVyQ2FzZSgpID8/ICcnKTtcclxuICAgIHRoaXMuYWJpbGl0eU5hbWUgPSBwYXJ0c1tmaWVsZHMuYWJpbGl0eU5hbWVdID8/ICcnO1xyXG4gICAgdGhpcy5kdXJhdGlvblN0cmluZyA9IHBhcnRzW2ZpZWxkcy5kdXJhdGlvblN0cmluZ10gPz8gJyc7XHJcbiAgICB0aGlzLmR1cmF0aW9uRmxvYXQgPSBwYXJzZUZsb2F0KHRoaXMuZHVyYXRpb25TdHJpbmcpO1xyXG4gICAgdGhpcy5pZCA9IHBhcnRzW2ZpZWxkcy5pZF0/LnRvVXBwZXJDYXNlKCkgPz8gJyc7XHJcbiAgICB0aGlzLm5hbWUgPSBwYXJ0c1tmaWVsZHMubmFtZV0gPz8gJyc7XHJcbiAgICB0aGlzLnRhcmdldElkID0gcGFydHNbZmllbGRzLnRhcmdldElkXT8udG9VcHBlckNhc2UoKSA/PyAnJztcclxuICAgIHRoaXMudGFyZ2V0TmFtZSA9IHBhcnRzW2ZpZWxkcy50YXJnZXROYW1lXSA/PyAnJztcclxuICAgIHRoaXMuc3RhY2tzID0gcGFyc2VJbnQocGFydHNbZmllbGRzLnN0YWNrc10gPz8gJzAnKTtcclxuICAgIHRoaXMudGFyZ2V0SHAgPSBwYXJzZUludChwYXJ0c1tmaWVsZHMudGFyZ2V0SHBdID8/ICcnKTtcclxuICAgIHRoaXMuaHAgPSBwYXJzZUludChwYXJ0c1tmaWVsZHMuc291cmNlSHBdID8/ICcnKTtcclxuXHJcbiAgICByZXBvLnVwZGF0ZUNvbWJhdGFudCh0aGlzLmlkLCB7XHJcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcclxuICAgICAgc3Bhd246IHRoaXMudGltZXN0YW1wLFxyXG4gICAgICBkZXNwYXduOiB0aGlzLnRpbWVzdGFtcCxcclxuICAgICAgam9iOiB1bmRlZmluZWQsXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXBvLnVwZGF0ZUNvbWJhdGFudCh0aGlzLnRhcmdldElkLCB7XHJcbiAgICAgIG5hbWU6IHRoaXMudGFyZ2V0TmFtZSxcclxuICAgICAgc3Bhd246IHRoaXMudGltZXN0YW1wLFxyXG4gICAgICBkZXNwYXduOiB0aGlzLnRpbWVzdGFtcCxcclxuICAgICAgam9iOiB1bmRlZmluZWQsXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnJlc29sdmVkTmFtZSA9IHJlcG8ucmVzb2x2ZU5hbWUodGhpcy5pZCwgdGhpcy5uYW1lKTtcclxuICAgIHRoaXMucmVzb2x2ZWRUYXJnZXROYW1lID0gcmVwby5yZXNvbHZlTmFtZSh0aGlzLnRhcmdldElkLCB0aGlzLnRhcmdldE5hbWUpO1xyXG5cclxuICAgIHRoaXMuZmFsbGJhY2tSZXNvbHZlZFRhcmdldE5hbWUgPVxyXG4gICAgICByZXBvLnJlc29sdmVOYW1lKHRoaXMuaWQsIHRoaXMubmFtZSwgdGhpcy50YXJnZXRJZCwgdGhpcy50YXJnZXROYW1lKTtcclxuXHJcbiAgICBsZXQgc3RhY2tDb3VudFRleHQgPSAnJztcclxuICAgIGlmICh0aGlzLnN0YWNrcyA+IDAgJiYgdGhpcy5zdGFja3MgPCAyMCAmJlxyXG4gICAgICBMaW5lRXZlbnQweDFBLnNob3dTdGFja0NvdW50Rm9yLmluY2x1ZGVzKHRoaXMuYWJpbGl0eUlkKSlcclxuICAgICAgc3RhY2tDb3VudFRleHQgPSAnICgnICsgdGhpcy5zdGFja3MudG9TdHJpbmcoKSArICcpJztcclxuXHJcbiAgICB0aGlzLmNvbnZlcnRlZExpbmUgPSB0aGlzLnByZWZpeCgpICsgdGhpcy50YXJnZXRJZCArXHJcbiAgICAgICc6JyArIHRoaXMudGFyZ2V0TmFtZSArXHJcbiAgICAgICcgZ2FpbnMgdGhlIGVmZmVjdCBvZiAnICsgdGhpcy5hYmlsaXR5TmFtZSArXHJcbiAgICAgICcgZnJvbSAnICsgdGhpcy5mYWxsYmFja1Jlc29sdmVkVGFyZ2V0TmFtZSArXHJcbiAgICAgICcgZm9yICcgKyB0aGlzLmR1cmF0aW9uU3RyaW5nICsgJyBTZWNvbmRzLicgKyBzdGFja0NvdW50VGV4dDtcclxuXHJcbiAgICB0aGlzLnByb3BlckNhc2VDb252ZXJ0ZWRMaW5lID0gdGhpcy5wcmVmaXgoKSArIHRoaXMudGFyZ2V0SWQgK1xyXG4gICAgICAnOicgKyBFbXVsYXRvckNvbW1vbi5wcm9wZXJDYXNlKHRoaXMudGFyZ2V0TmFtZSkgK1xyXG4gICAgICAnIGdhaW5zIHRoZSBlZmZlY3Qgb2YgJyArIHRoaXMuYWJpbGl0eU5hbWUgK1xyXG4gICAgICAnIGZyb20gJyArIEVtdWxhdG9yQ29tbW9uLnByb3BlckNhc2UodGhpcy5mYWxsYmFja1Jlc29sdmVkVGFyZ2V0TmFtZSkgK1xyXG4gICAgICAnIGZvciAnICsgdGhpcy5kdXJhdGlvblN0cmluZyArICcgU2Vjb25kcy4nICsgc3RhY2tDb3VudFRleHQ7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgc2hvd1N0YWNrQ291bnRGb3I6IHJlYWRvbmx5IG51bWJlcltdID0gW1xyXG4gICAgMzA0LCAvLyBBZXRoZXJmbG93XHJcbiAgICA0MDYsIC8vIFZ1bG5lcmFiaWxpdHkgRG93blxyXG4gICAgMzUwLCAvLyBWdWxuZXJhYmlsaXR5IERvd25cclxuICAgIDcxNCwgLy8gVnVsbmVyYWJpbGl0eSBVcFxyXG4gICAgNTA1LCAvLyBEYW1hZ2UgVXBcclxuICAgIDEyMzksIC8vIEVtYm9sZGVuXHJcbiAgICAxMjk3LCAvLyBFbWJvbGRlblxyXG4gIF0gYXMgY29uc3Q7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBMaW5lRXZlbnQyNiBleHRlbmRzIExpbmVFdmVudDB4MUEge31cclxuIiwiaW1wb3J0IExpbmVFdmVudCwgeyBMaW5lRXZlbnRTb3VyY2UgfSBmcm9tICcuL0xpbmVFdmVudCc7XHJcbmltcG9ydCBMb2dSZXBvc2l0b3J5IGZyb20gJy4vTG9nUmVwb3NpdG9yeSc7XHJcblxyXG5jb25zdCBmaWVsZHMgPSB7XHJcbiAgdGFyZ2V0SWQ6IDIsXHJcbiAgdGFyZ2V0TmFtZTogMyxcclxuICBoZWFkbWFya2VySWQ6IDYsXHJcbn0gYXMgY29uc3Q7XHJcblxyXG4vLyBIZWFkIG1hcmtlciBldmVudFxyXG5leHBvcnQgY2xhc3MgTGluZUV2ZW50MHgxQiBleHRlbmRzIExpbmVFdmVudCBpbXBsZW1lbnRzIExpbmVFdmVudFNvdXJjZSB7XHJcbiAgcHVibGljIHJlYWRvbmx5IGlkOiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IG5hbWU6IHN0cmluZztcclxuICBwdWJsaWMgcmVhZG9ubHkgaGVhZG1hcmtlcklkOiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IGlzU291cmNlID0gdHJ1ZTtcclxuXHJcbiAgY29uc3RydWN0b3IocmVwbzogTG9nUmVwb3NpdG9yeSwgbGluZTogc3RyaW5nLCBwYXJ0czogc3RyaW5nW10pIHtcclxuICAgIHN1cGVyKHJlcG8sIGxpbmUsIHBhcnRzKTtcclxuXHJcbiAgICB0aGlzLmlkID0gcGFydHNbZmllbGRzLnRhcmdldElkXT8udG9VcHBlckNhc2UoKSA/PyAnJztcclxuICAgIHRoaXMubmFtZSA9IHBhcnRzW2ZpZWxkcy50YXJnZXROYW1lXSA/PyAnJztcclxuICAgIHRoaXMuaGVhZG1hcmtlcklkID0gcGFydHNbZmllbGRzLmhlYWRtYXJrZXJJZF0gPz8gJyc7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTGluZUV2ZW50MjcgZXh0ZW5kcyBMaW5lRXZlbnQweDFCIHt9XHJcbiIsImltcG9ydCBMaW5lRXZlbnQgZnJvbSAnLi9MaW5lRXZlbnQnO1xyXG5pbXBvcnQgTG9nUmVwb3NpdG9yeSBmcm9tICcuL0xvZ1JlcG9zaXRvcnknO1xyXG5cclxuY29uc3QgZmllbGRzID0ge1xyXG4gIG9wZXJhdGlvbjogMixcclxuICB3YXltYXJrOiAzLFxyXG4gIGlkOiA0LFxyXG4gIG5hbWU6IDUsXHJcbiAgeDogNixcclxuICB5OiA3LFxyXG4gIHo6IDgsXHJcbn0gYXMgY29uc3Q7XHJcblxyXG4vLyBGbG9vciB3YXltYXJrZXIgZXZlbnRcclxuZXhwb3J0IGNsYXNzIExpbmVFdmVudDB4MUMgZXh0ZW5kcyBMaW5lRXZlbnQge1xyXG4gIHB1YmxpYyByZWFkb25seSBvcGVyYXRpb246IHN0cmluZztcclxuICBwdWJsaWMgcmVhZG9ubHkgd2F5bWFyazogc3RyaW5nO1xyXG4gIHB1YmxpYyByZWFkb25seSBpZDogc3RyaW5nO1xyXG4gIHB1YmxpYyByZWFkb25seSBuYW1lOiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IHg6IHN0cmluZztcclxuICBwdWJsaWMgcmVhZG9ubHkgeTogc3RyaW5nO1xyXG4gIHB1YmxpYyByZWFkb25seSB6OiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHJlcG86IExvZ1JlcG9zaXRvcnksIGxpbmU6IHN0cmluZywgcGFydHM6IHN0cmluZ1tdKSB7XHJcbiAgICBzdXBlcihyZXBvLCBsaW5lLCBwYXJ0cyk7XHJcblxyXG4gICAgdGhpcy5vcGVyYXRpb24gPSBwYXJ0c1tmaWVsZHMub3BlcmF0aW9uXSA/PyAnJztcclxuICAgIHRoaXMud2F5bWFyayA9IHBhcnRzW2ZpZWxkcy53YXltYXJrXSA/PyAnJztcclxuICAgIHRoaXMuaWQgPSBwYXJ0c1tmaWVsZHMuaWRdPy50b1VwcGVyQ2FzZSgpID8/ICcnO1xyXG4gICAgdGhpcy5uYW1lID0gcGFydHNbZmllbGRzLm5hbWVdID8/ICcnO1xyXG4gICAgdGhpcy54ID0gcGFydHNbZmllbGRzLnhdID8/ICcnO1xyXG4gICAgdGhpcy55ID0gcGFydHNbZmllbGRzLnldID8/ICcnO1xyXG4gICAgdGhpcy56ID0gcGFydHNbZmllbGRzLnpdID8/ICcnO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIExpbmVFdmVudDI4IGV4dGVuZHMgTGluZUV2ZW50MHgxQyB7fVxyXG4iLCJpbXBvcnQgTGluZUV2ZW50IGZyb20gJy4vTGluZUV2ZW50JztcclxuaW1wb3J0IExvZ1JlcG9zaXRvcnkgZnJvbSAnLi9Mb2dSZXBvc2l0b3J5JztcclxuXHJcbmNvbnN0IGZpZWxkcyA9IHtcclxuICBvcGVyYXRpb246IDIsXHJcbiAgd2F5bWFyazogMyxcclxuICBpZDogNCxcclxuICBuYW1lOiA1LFxyXG4gIHRhcmdldElkOiA2LFxyXG4gIHRhcmdldE5hbWU6IDcsXHJcbn0gYXMgY29uc3Q7XHJcblxyXG4vLyBXYXltYXJrZXJcclxuZXhwb3J0IGNsYXNzIExpbmVFdmVudDB4MUQgZXh0ZW5kcyBMaW5lRXZlbnQge1xyXG4gIHB1YmxpYyByZWFkb25seSBvcGVyYXRpb246IHN0cmluZztcclxuICBwdWJsaWMgcmVhZG9ubHkgd2F5bWFyazogc3RyaW5nO1xyXG4gIHB1YmxpYyByZWFkb25seSBpZDogc3RyaW5nO1xyXG4gIHB1YmxpYyByZWFkb25seSBuYW1lOiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IHRhcmdldElkOiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IHRhcmdldE5hbWU6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IocmVwbzogTG9nUmVwb3NpdG9yeSwgbGluZTogc3RyaW5nLCBwYXJ0czogc3RyaW5nW10pIHtcclxuICAgIHN1cGVyKHJlcG8sIGxpbmUsIHBhcnRzKTtcclxuXHJcbiAgICB0aGlzLm9wZXJhdGlvbiA9IHBhcnRzW2ZpZWxkcy5vcGVyYXRpb25dID8/ICcnO1xyXG4gICAgdGhpcy53YXltYXJrID0gcGFydHNbZmllbGRzLndheW1hcmtdID8/ICcnO1xyXG4gICAgdGhpcy5pZCA9IHBhcnRzW2ZpZWxkcy5pZF0/LnRvVXBwZXJDYXNlKCkgPz8gJyc7XHJcbiAgICB0aGlzLm5hbWUgPSBwYXJ0c1tmaWVsZHMubmFtZV0gPz8gJyc7XHJcbiAgICB0aGlzLnRhcmdldElkID0gcGFydHNbZmllbGRzLnRhcmdldElkXT8udG9VcHBlckNhc2UoKSA/PyAnJztcclxuICAgIHRoaXMudGFyZ2V0TmFtZSA9IHBhcnRzW2ZpZWxkcy50YXJnZXROYW1lXSA/PyAnJztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBMaW5lRXZlbnQyOSBleHRlbmRzIExpbmVFdmVudDB4MUQge31cclxuIiwiaW1wb3J0IHsgTGluZUV2ZW50MHgxQSB9IGZyb20gJy4vTGluZUV2ZW50MHgxQSc7XHJcbmltcG9ydCBFbXVsYXRvckNvbW1vbiBmcm9tICcuLi8uLi9FbXVsYXRvckNvbW1vbic7XHJcbmltcG9ydCBMb2dSZXBvc2l0b3J5IGZyb20gJy4vTG9nUmVwb3NpdG9yeSc7XHJcblxyXG4vLyBMb3NlIHN0YXR1cyBlZmZlY3QgZXZlbnRcclxuLy8gRXh0ZW5kIHRoZSBnYWluIHN0YXR1cyBldmVudCB0byByZWR1Y2UgZHVwbGljYXRlIGNvZGUgc2luY2UgdGhleSdyZVxyXG4vLyB0aGUgc2FtZSBmcm9tIGEgZGF0YSBwZXJzcGVjdGl2ZVxyXG5leHBvcnQgY2xhc3MgTGluZUV2ZW50MHgxRSBleHRlbmRzIExpbmVFdmVudDB4MUEge1xyXG4gIHB1YmxpYyByZWFkb25seSBwcm9wZXJDYXNlQ29udmVydGVkTGluZTogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihyZXBvOiBMb2dSZXBvc2l0b3J5LCBsaW5lOiBzdHJpbmcsIHBhcnRzOiBzdHJpbmdbXSkge1xyXG4gICAgc3VwZXIocmVwbywgbGluZSwgcGFydHMpO1xyXG5cclxuICAgIGxldCBzdGFja0NvdW50VGV4dCA9ICcnO1xyXG4gICAgaWYgKHRoaXMuc3RhY2tzID4gMCAmJiB0aGlzLnN0YWNrcyA8IDIwICYmXHJcbiAgICAgIExpbmVFdmVudDB4MUEuc2hvd1N0YWNrQ291bnRGb3IuaW5jbHVkZXModGhpcy5hYmlsaXR5SWQpKVxyXG4gICAgICBzdGFja0NvdW50VGV4dCA9ICcgKCcgKyB0aGlzLnN0YWNrcy50b1N0cmluZygpICsgJyknO1xyXG5cclxuICAgIHRoaXMuY29udmVydGVkTGluZSA9IHRoaXMucHJlZml4KCkgKyB0aGlzLnRhcmdldElkICtcclxuICAgICAgJzonICsgdGhpcy50YXJnZXROYW1lICtcclxuICAgICAgJyBsb3NlcyB0aGUgZWZmZWN0IG9mICcgKyB0aGlzLmFiaWxpdHlOYW1lICtcclxuICAgICAgJyBmcm9tICcgKyB0aGlzLmZhbGxiYWNrUmVzb2x2ZWRUYXJnZXROYW1lICtcclxuICAgICAgJyBmb3IgJyArIHRoaXMuZHVyYXRpb25TdHJpbmcgKyAnIFNlY29uZHMuJyArIHN0YWNrQ291bnRUZXh0O1xyXG5cclxuICAgIHRoaXMucHJvcGVyQ2FzZUNvbnZlcnRlZExpbmUgPSB0aGlzLnByZWZpeCgpICsgdGhpcy50YXJnZXRJZCArXHJcbiAgICAgICc6JyArIEVtdWxhdG9yQ29tbW9uLnByb3BlckNhc2UodGhpcy50YXJnZXROYW1lKSArXHJcbiAgICAgICcgbG9zZXMgdGhlIGVmZmVjdCBvZiAnICsgdGhpcy5hYmlsaXR5TmFtZSArXHJcbiAgICAgICcgZnJvbSAnICsgRW11bGF0b3JDb21tb24ucHJvcGVyQ2FzZSh0aGlzLmZhbGxiYWNrUmVzb2x2ZWRUYXJnZXROYW1lKSArXHJcbiAgICAgICcgZm9yICcgKyB0aGlzLmR1cmF0aW9uU3RyaW5nICsgJyBTZWNvbmRzLicgKyBzdGFja0NvdW50VGV4dDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBMaW5lRXZlbnQzMCBleHRlbmRzIExpbmVFdmVudDB4MUUgeyB9XHJcbiIsImltcG9ydCBMaW5lRXZlbnQgZnJvbSAnLi9MaW5lRXZlbnQnO1xyXG5pbXBvcnQgRW11bGF0b3JDb21tb24gZnJvbSAnLi4vLi4vRW11bGF0b3JDb21tb24nO1xyXG5pbXBvcnQgTG9nUmVwb3NpdG9yeSBmcm9tICcuL0xvZ1JlcG9zaXRvcnknO1xyXG5cclxuY29uc3Qgc3BsaXRGdW5jID0gKHM6IHN0cmluZykgPT4gW1xyXG4gIHMuc3Vic3RyKDYsIDIpLFxyXG4gIHMuc3Vic3RyKDQsIDIpLFxyXG4gIHMuc3Vic3RyKDIsIDIpLFxyXG4gIHMuc3Vic3RyKDAsIDIpLFxyXG5dO1xyXG5cclxuY29uc3QgZmllbGRzID0ge1xyXG4gIGlkOiAyLFxyXG4gIGRhdGFCeXRlczE6IDMsXHJcbiAgZGF0YUJ5dGVzMjogNCxcclxuICBkYXRhQnl0ZXMzOiA1LFxyXG4gIGRhdGFCeXRlczQ6IDYsXHJcbn0gYXMgY29uc3Q7XHJcblxyXG4vLyBKb2IgZ2F1Z2UgZXZlbnRcclxuZXhwb3J0IGNsYXNzIExpbmVFdmVudDB4MUYgZXh0ZW5kcyBMaW5lRXZlbnQge1xyXG4gIHB1YmxpYyByZWFkb25seSBqb2JHYXVnZUJ5dGVzOiBzdHJpbmdbXTtcclxuICBwdWJsaWMgcmVhZG9ubHkgbmFtZTogc3RyaW5nO1xyXG4gIHB1YmxpYyByZWFkb25seSBwcm9wZXJDYXNlQ29udmVydGVkTGluZTogc3RyaW5nO1xyXG5cclxuICBwdWJsaWMgcmVhZG9ubHkgaWQ6IHN0cmluZztcclxuICBwdWJsaWMgcmVhZG9ubHkgZGF0YUJ5dGVzMTogc3RyaW5nO1xyXG4gIHB1YmxpYyByZWFkb25seSBkYXRhQnl0ZXMyOiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IGRhdGFCeXRlczM6IHN0cmluZztcclxuICBwdWJsaWMgcmVhZG9ubHkgZGF0YUJ5dGVzNDogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihyZXBvOiBMb2dSZXBvc2l0b3J5LCBsaW5lOiBzdHJpbmcsIHBhcnRzOiBzdHJpbmdbXSkge1xyXG4gICAgc3VwZXIocmVwbywgbGluZSwgcGFydHMpO1xyXG5cclxuICAgIHRoaXMuaWQgPSBwYXJ0c1tmaWVsZHMuaWRdPy50b1VwcGVyQ2FzZSgpID8/ICcnO1xyXG4gICAgdGhpcy5kYXRhQnl0ZXMxID0gRW11bGF0b3JDb21tb24uemVyb1BhZChwYXJ0c1tmaWVsZHMuZGF0YUJ5dGVzMV0gPz8gJycpO1xyXG4gICAgdGhpcy5kYXRhQnl0ZXMyID0gRW11bGF0b3JDb21tb24uemVyb1BhZChwYXJ0c1tmaWVsZHMuZGF0YUJ5dGVzMl0gPz8gJycpO1xyXG4gICAgdGhpcy5kYXRhQnl0ZXMzID0gRW11bGF0b3JDb21tb24uemVyb1BhZChwYXJ0c1tmaWVsZHMuZGF0YUJ5dGVzM10gPz8gJycpO1xyXG4gICAgdGhpcy5kYXRhQnl0ZXM0ID0gRW11bGF0b3JDb21tb24uemVyb1BhZChwYXJ0c1tmaWVsZHMuZGF0YUJ5dGVzNF0gPz8gJycpO1xyXG5cclxuICAgIHRoaXMuam9iR2F1Z2VCeXRlcyA9IFtcclxuICAgICAgLi4uc3BsaXRGdW5jKHRoaXMuZGF0YUJ5dGVzMSksXHJcbiAgICAgIC4uLnNwbGl0RnVuYyh0aGlzLmRhdGFCeXRlczIpLFxyXG4gICAgICAuLi5zcGxpdEZ1bmModGhpcy5kYXRhQnl0ZXMzKSxcclxuICAgICAgLi4uc3BsaXRGdW5jKHRoaXMuZGF0YUJ5dGVzNCksXHJcbiAgICBdO1xyXG5cclxuICAgIHRoaXMubmFtZSA9IHJlcG8uQ29tYmF0YW50c1t0aGlzLmlkXT8ubmFtZSB8fCAnJztcclxuXHJcbiAgICByZXBvLnVwZGF0ZUNvbWJhdGFudCh0aGlzLmlkLCB7XHJcbiAgICAgIG5hbWU6IHJlcG8uQ29tYmF0YW50c1t0aGlzLmlkXT8ubmFtZSxcclxuICAgICAgc3Bhd246IHRoaXMudGltZXN0YW1wLFxyXG4gICAgICBkZXNwYXduOiB0aGlzLnRpbWVzdGFtcCxcclxuICAgICAgam9iOiB0aGlzLmpvYkdhdWdlQnl0ZXNbMF0/LnRvVXBwZXJDYXNlKCksXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmNvbnZlcnRlZExpbmUgPSB0aGlzLnByZWZpeCgpICtcclxuICAgICAgdGhpcy5pZCArICc6JyArIHRoaXMubmFtZSArXHJcbiAgICAgICc6JyArIHRoaXMuZGF0YUJ5dGVzMSArXHJcbiAgICAgICc6JyArIHRoaXMuZGF0YUJ5dGVzMiArXHJcbiAgICAgICc6JyArIHRoaXMuZGF0YUJ5dGVzMyArXHJcbiAgICAgICc6JyArIHRoaXMuZGF0YUJ5dGVzNDtcclxuICAgIHRoaXMucHJvcGVyQ2FzZUNvbnZlcnRlZExpbmUgPSB0aGlzLnByZWZpeCgpICtcclxuICAgICAgdGhpcy5pZCArICc6JyArIChFbXVsYXRvckNvbW1vbi5wcm9wZXJDYXNlKHRoaXMubmFtZSkpICtcclxuICAgICAgJzonICsgdGhpcy5kYXRhQnl0ZXMxICtcclxuICAgICAgJzonICsgdGhpcy5kYXRhQnl0ZXMyICtcclxuICAgICAgJzonICsgdGhpcy5kYXRhQnl0ZXMzICtcclxuICAgICAgJzonICsgdGhpcy5kYXRhQnl0ZXM0O1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIExpbmVFdmVudDMxIGV4dGVuZHMgTGluZUV2ZW50MHgxRiB7fVxyXG4iLCJpbXBvcnQgTGluZUV2ZW50LCB7IExpbmVFdmVudFNvdXJjZSB9IGZyb20gJy4vTGluZUV2ZW50JztcclxuaW1wb3J0IExvZ1JlcG9zaXRvcnkgZnJvbSAnLi9Mb2dSZXBvc2l0b3J5JztcclxuXHJcbmNvbnN0IGZpZWxkcyA9IHtcclxuICBpZDogMixcclxuICBuYW1lOiAzLFxyXG4gIHRhcmdldElkOiA0LFxyXG4gIHRhcmdldE5hbWU6IDUsXHJcbiAgdGFyZ2V0YWJsZTogNixcclxufSBhcyBjb25zdDtcclxuXHJcbi8vIE5hbWVwbGF0ZSB0b2dnbGVcclxuZXhwb3J0IGNsYXNzIExpbmVFdmVudDB4MjIgZXh0ZW5kcyBMaW5lRXZlbnQgaW1wbGVtZW50cyBMaW5lRXZlbnRTb3VyY2Uge1xyXG4gIHB1YmxpYyByZWFkb25seSBpZDogc3RyaW5nO1xyXG4gIHB1YmxpYyByZWFkb25seSBuYW1lOiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IHRhcmdldElkOiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IHRhcmdldE5hbWU6IHN0cmluZztcclxuICBwdWJsaWMgcmVhZG9ubHkgdGFyZ2V0YWJsZTogYm9vbGVhbjtcclxuICBwdWJsaWMgcmVhZG9ubHkgaXNTb3VyY2UgPSB0cnVlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihyZXBvOiBMb2dSZXBvc2l0b3J5LCBsaW5lOiBzdHJpbmcsIHBhcnRzOiBzdHJpbmdbXSkge1xyXG4gICAgc3VwZXIocmVwbywgbGluZSwgcGFydHMpO1xyXG5cclxuICAgIHRoaXMuaWQgPSBwYXJ0c1tmaWVsZHMuaWRdPy50b1VwcGVyQ2FzZSgpID8/ICcnO1xyXG4gICAgdGhpcy5uYW1lID0gcGFydHNbZmllbGRzLm5hbWVdID8/ICcnO1xyXG4gICAgdGhpcy50YXJnZXRJZCA9IHBhcnRzW2ZpZWxkcy50YXJnZXRJZF0/LnRvVXBwZXJDYXNlKCkgPz8gJyc7XHJcbiAgICB0aGlzLnRhcmdldE5hbWUgPSBwYXJ0c1tmaWVsZHMudGFyZ2V0TmFtZV0gPz8gJyc7XHJcbiAgICB0aGlzLnRhcmdldGFibGUgPSAhIXBhcnNlSW50KHBhcnRzW2ZpZWxkcy50YXJnZXRhYmxlXSA/PyAnJywgMTYpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIExpbmVFdmVudDM0IGV4dGVuZHMgTGluZUV2ZW50MHgyMiB7fVxyXG4iLCJpbXBvcnQgTGluZUV2ZW50IGZyb20gJy4vTGluZUV2ZW50JztcclxuaW1wb3J0IExvZ1JlcG9zaXRvcnkgZnJvbSAnLi9Mb2dSZXBvc2l0b3J5JztcclxuXHJcbmNvbnN0IGZpZWxkcyA9IHtcclxuICBpZDogMixcclxuICBuYW1lOiAzLFxyXG4gIHRhcmdldElkOiA0LFxyXG4gIHRhcmdldE5hbWU6IDUsXHJcbiAgdGV0aGVySWQ6IDgsXHJcbn0gYXMgY29uc3Q7XHJcblxyXG4vLyBUZXRoZXIgZXZlbnRcclxuZXhwb3J0IGNsYXNzIExpbmVFdmVudDB4MjMgZXh0ZW5kcyBMaW5lRXZlbnQge1xyXG4gIHB1YmxpYyByZWFkb25seSBpZDogc3RyaW5nO1xyXG4gIHB1YmxpYyByZWFkb25seSBuYW1lOiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IHRhcmdldElkOiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IHRhcmdldE5hbWU6IHN0cmluZztcclxuICBwdWJsaWMgcmVhZG9ubHkgdGV0aGVySWQ6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IocmVwbzogTG9nUmVwb3NpdG9yeSwgbGluZTogc3RyaW5nLCBwYXJ0czogc3RyaW5nW10pIHtcclxuICAgIHN1cGVyKHJlcG8sIGxpbmUsIHBhcnRzKTtcclxuXHJcbiAgICB0aGlzLmlkID0gcGFydHNbZmllbGRzLmlkXT8udG9VcHBlckNhc2UoKSA/PyAnJztcclxuICAgIHRoaXMubmFtZSA9IHBhcnRzW2ZpZWxkcy5uYW1lXSA/PyAnJztcclxuICAgIHRoaXMudGFyZ2V0SWQgPSBwYXJ0c1tmaWVsZHMudGFyZ2V0SWRdPy50b1VwcGVyQ2FzZSgpID8/ICcnO1xyXG4gICAgdGhpcy50YXJnZXROYW1lID0gcGFydHNbZmllbGRzLnRhcmdldE5hbWVdID8/ICcnO1xyXG4gICAgdGhpcy50ZXRoZXJJZCA9IHBhcnRzW2ZpZWxkcy50ZXRoZXJJZF0gPz8gJyc7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTGluZUV2ZW50MzUgZXh0ZW5kcyBMaW5lRXZlbnQweDIzIHt9XHJcbiIsImltcG9ydCBMaW5lRXZlbnQgZnJvbSAnLi9MaW5lRXZlbnQnO1xyXG5pbXBvcnQgTG9nUmVwb3NpdG9yeSBmcm9tICcuL0xvZ1JlcG9zaXRvcnknO1xyXG5cclxuY29uc3QgZmllbGRzID0ge1xyXG4gIHZhbHVlSGV4OiAyLFxyXG4gIGJhcnM6IDMsXHJcbn0gYXMgY29uc3Q7XHJcblxyXG4vLyBMaW1pdCBnYXVnZSBldmVudFxyXG5leHBvcnQgY2xhc3MgTGluZUV2ZW50MHgyNCBleHRlbmRzIExpbmVFdmVudCB7XHJcbiAgcHVibGljIHJlYWRvbmx5IHZhbHVlSGV4OiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IHZhbHVlRGVjOiBudW1iZXI7XHJcbiAgcHVibGljIHJlYWRvbmx5IGJhcnM6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IocmVwbzogTG9nUmVwb3NpdG9yeSwgbGluZTogc3RyaW5nLCBwYXJ0czogc3RyaW5nW10pIHtcclxuICAgIHN1cGVyKHJlcG8sIGxpbmUsIHBhcnRzKTtcclxuXHJcbiAgICB0aGlzLnZhbHVlSGV4ID0gcGFydHNbZmllbGRzLnZhbHVlSGV4XSA/PyAnJztcclxuICAgIHRoaXMudmFsdWVEZWMgPSBwYXJzZUludCh0aGlzLnZhbHVlSGV4LCAxNik7XHJcbiAgICB0aGlzLmJhcnMgPSBwYXJ0c1tmaWVsZHMuYmFyc10gPz8gJyc7XHJcblxyXG4gICAgdGhpcy5jb252ZXJ0ZWRMaW5lID0gdGhpcy5wcmVmaXgoKSArICdMaW1pdCBCcmVhazogJyArIHRoaXMudmFsdWVIZXg7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTGluZUV2ZW50MzYgZXh0ZW5kcyBMaW5lRXZlbnQweDI0IHt9XHJcbiIsImltcG9ydCBMaW5lRXZlbnQsIHsgTGluZUV2ZW50U291cmNlIH0gZnJvbSAnLi9MaW5lRXZlbnQnO1xyXG5pbXBvcnQgTG9nUmVwb3NpdG9yeSBmcm9tICcuL0xvZ1JlcG9zaXRvcnknO1xyXG5cclxuY29uc3QgZmllbGRzID0ge1xyXG4gIGlkOiAyLFxyXG4gIG5hbWU6IDMsXHJcbiAgc2VxdWVuY2VJZDogNCxcclxuICBjdXJyZW50SHA6IDUsXHJcbiAgbWF4SHA6IDYsXHJcbiAgY3VycmVudE1wOiA3LFxyXG4gIG1heE1wOiA4LFxyXG4gIGN1cnJlbnRUcDogOSxcclxuICBtYXhUcDogMTAsXHJcbiAgeDogMTEsXHJcbiAgeTogMTIsXHJcbiAgejogMTMsXHJcbiAgaGVhZGluZzogMTQsXHJcbn0gYXMgY29uc3Q7XHJcblxyXG4vLyBBY3Rpb24gc3luYyBldmVudFxyXG5leHBvcnQgY2xhc3MgTGluZUV2ZW50MHgyNSBleHRlbmRzIExpbmVFdmVudCBpbXBsZW1lbnRzIExpbmVFdmVudFNvdXJjZSB7XHJcbiAgcHVibGljIHJlYWRvbmx5IGlkOiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IG5hbWU6IHN0cmluZztcclxuICBwdWJsaWMgcmVhZG9ubHkgc2VxdWVuY2VJZDogc3RyaW5nO1xyXG4gIHB1YmxpYyByZWFkb25seSBocDogbnVtYmVyO1xyXG4gIHB1YmxpYyByZWFkb25seSBtYXhIcDogbnVtYmVyO1xyXG4gIHB1YmxpYyByZWFkb25seSBtcDogbnVtYmVyO1xyXG4gIHB1YmxpYyByZWFkb25seSBtYXhNcDogbnVtYmVyO1xyXG4gIHB1YmxpYyByZWFkb25seSB0cDogbnVtYmVyO1xyXG4gIHB1YmxpYyByZWFkb25seSBtYXhUcDogbnVtYmVyO1xyXG4gIHB1YmxpYyByZWFkb25seSB4OiBudW1iZXI7XHJcbiAgcHVibGljIHJlYWRvbmx5IHk6IG51bWJlcjtcclxuICBwdWJsaWMgcmVhZG9ubHkgejogbnVtYmVyO1xyXG4gIHB1YmxpYyByZWFkb25seSBoZWFkaW5nOiBudW1iZXI7XHJcbiAgcHVibGljIHJlYWRvbmx5IGlzU291cmNlID0gdHJ1ZTtcclxuXHJcbiAgY29uc3RydWN0b3IocmVwbzogTG9nUmVwb3NpdG9yeSwgbGluZTogc3RyaW5nLCBwYXJ0czogc3RyaW5nW10pIHtcclxuICAgIHN1cGVyKHJlcG8sIGxpbmUsIHBhcnRzKTtcclxuXHJcbiAgICB0aGlzLmlkID0gcGFydHNbZmllbGRzLmlkXT8udG9VcHBlckNhc2UoKSA/PyAnJztcclxuICAgIHRoaXMubmFtZSA9IHBhcnRzW2ZpZWxkcy5uYW1lXSA/PyAnJztcclxuICAgIHRoaXMuc2VxdWVuY2VJZCA9IHBhcnRzW2ZpZWxkcy5zZXF1ZW5jZUlkXSA/PyAnJztcclxuICAgIHRoaXMuaHAgPSBwYXJzZUludChwYXJ0c1tmaWVsZHMuY3VycmVudEhwXSA/PyAnJyk7XHJcbiAgICB0aGlzLm1heEhwID0gcGFyc2VJbnQocGFydHNbZmllbGRzLm1heEhwXSA/PyAnJyk7XHJcbiAgICB0aGlzLm1wID0gcGFyc2VJbnQocGFydHNbZmllbGRzLmN1cnJlbnRNcF0gPz8gJycpO1xyXG4gICAgdGhpcy5tYXhNcCA9IHBhcnNlSW50KHBhcnRzW2ZpZWxkcy5tYXhNcF0gPz8gJycpO1xyXG4gICAgdGhpcy50cCA9IHBhcnNlSW50KHBhcnRzW2ZpZWxkcy5jdXJyZW50VHBdID8/ICcnKTtcclxuICAgIHRoaXMubWF4VHAgPSBwYXJzZUludChwYXJ0c1tmaWVsZHMubWF4VHBdID8/ICcnKTtcclxuICAgIHRoaXMueCA9IHBhcnNlRmxvYXQocGFydHNbZmllbGRzLnhdID8/ICcnKTtcclxuICAgIHRoaXMueSA9IHBhcnNlRmxvYXQocGFydHNbZmllbGRzLnldID8/ICcnKTtcclxuICAgIHRoaXMueiA9IHBhcnNlRmxvYXQocGFydHNbZmllbGRzLnpdID8/ICcnKTtcclxuICAgIHRoaXMuaGVhZGluZyA9IHBhcnNlRmxvYXQocGFydHNbZmllbGRzLmhlYWRpbmddID8/ICcnKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBMaW5lRXZlbnQzNyBleHRlbmRzIExpbmVFdmVudDB4MjUge31cclxuIiwiaW1wb3J0IExpbmVFdmVudCwgeyBMaW5lRXZlbnRKb2JMZXZlbCwgTGluZUV2ZW50U291cmNlIH0gZnJvbSAnLi9MaW5lRXZlbnQnO1xyXG5pbXBvcnQgRW11bGF0b3JDb21tb24gZnJvbSAnLi4vLi4vRW11bGF0b3JDb21tb24nO1xyXG5pbXBvcnQgVXRpbCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvdXRpbCc7XHJcbmltcG9ydCBMb2dSZXBvc2l0b3J5IGZyb20gJy4vTG9nUmVwb3NpdG9yeSc7XHJcbmltcG9ydCB7IEpvYiB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2pvYic7XHJcblxyXG5jb25zdCBmaWVsZHMgPSB7XHJcbiAgaWQ6IDIsXHJcbiAgbmFtZTogMyxcclxuICBqb2JMZXZlbERhdGE6IDQsXHJcbiAgY3VycmVudEhwOiA1LFxyXG4gIG1heEhwOiA2LFxyXG4gIGN1cnJlbnRNcDogNyxcclxuICBtYXhNcDogOCxcclxuICBjdXJyZW50VHA6IDksXHJcbiAgbWF4VHA6IDEwLFxyXG4gIHg6IDExLFxyXG4gIHk6IDEyLFxyXG4gIHo6IDEzLFxyXG4gIGhlYWRpbmc6IDE0LFxyXG59IGFzIGNvbnN0O1xyXG5cclxuLy8gTmV0d29yayBzdGF0dXMgZWZmZWN0IGV2ZW50XHJcbmV4cG9ydCBjbGFzcyBMaW5lRXZlbnQweDI2IGV4dGVuZHMgTGluZUV2ZW50IGltcGxlbWVudHMgTGluZUV2ZW50U291cmNlLCBMaW5lRXZlbnRKb2JMZXZlbCB7XHJcbiAgcHVibGljIHJlYWRvbmx5IGpvYklkSGV4OiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IGpvYklkOiBudW1iZXI7XHJcbiAgcHVibGljIHJlYWRvbmx5IGpvYjogSm9iO1xyXG4gIHB1YmxpYyByZWFkb25seSBsZXZlbDogbnVtYmVyO1xyXG4gIHB1YmxpYyByZWFkb25seSBpZDogc3RyaW5nO1xyXG4gIHB1YmxpYyByZWFkb25seSBuYW1lOiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IGpvYkxldmVsRGF0YTogc3RyaW5nO1xyXG4gIHB1YmxpYyByZWFkb25seSBocDogbnVtYmVyO1xyXG4gIHB1YmxpYyByZWFkb25seSBtYXhIcDogbnVtYmVyO1xyXG4gIHB1YmxpYyByZWFkb25seSBtcDogbnVtYmVyO1xyXG4gIHB1YmxpYyByZWFkb25seSBtYXhNcDogbnVtYmVyO1xyXG4gIHB1YmxpYyByZWFkb25seSB0cDogbnVtYmVyO1xyXG4gIHB1YmxpYyByZWFkb25seSBtYXhUcDogbnVtYmVyO1xyXG4gIHB1YmxpYyByZWFkb25seSB4OiBudW1iZXI7XHJcbiAgcHVibGljIHJlYWRvbmx5IHk6IG51bWJlcjtcclxuICBwdWJsaWMgcmVhZG9ubHkgejogbnVtYmVyO1xyXG4gIHB1YmxpYyByZWFkb25seSBoZWFkaW5nOiBudW1iZXI7XHJcbiAgcHVibGljIHJlYWRvbmx5IGlzU291cmNlID0gdHJ1ZTtcclxuICBwdWJsaWMgcmVhZG9ubHkgaXNKb2JMZXZlbCA9IHRydWU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHJlcG86IExvZ1JlcG9zaXRvcnksIGxpbmU6IHN0cmluZywgcGFydHM6IHN0cmluZ1tdKSB7XHJcbiAgICBzdXBlcihyZXBvLCBsaW5lLCBwYXJ0cyk7XHJcblxyXG4gICAgdGhpcy5pZCA9IHBhcnRzW2ZpZWxkcy5pZF0/LnRvVXBwZXJDYXNlKCkgPz8gJyc7XHJcbiAgICB0aGlzLm5hbWUgPSBwYXJ0c1tmaWVsZHMubmFtZV0gPz8gJyc7XHJcblxyXG4gICAgdGhpcy5qb2JMZXZlbERhdGEgPSBwYXJ0c1tmaWVsZHMuam9iTGV2ZWxEYXRhXSA/PyAnJztcclxuXHJcbiAgICB0aGlzLmhwID0gcGFyc2VJbnQocGFydHNbZmllbGRzLmN1cnJlbnRIcF0gPz8gJycpO1xyXG4gICAgdGhpcy5tYXhIcCA9IHBhcnNlSW50KHBhcnRzW2ZpZWxkcy5tYXhIcF0gPz8gJycpO1xyXG4gICAgdGhpcy5tcCA9IHBhcnNlSW50KHBhcnRzW2ZpZWxkcy5jdXJyZW50TXBdID8/ICcnKTtcclxuICAgIHRoaXMubWF4TXAgPSBwYXJzZUludChwYXJ0c1tmaWVsZHMubWF4TXBdID8/ICcnKTtcclxuICAgIHRoaXMudHAgPSBwYXJzZUludChwYXJ0c1tmaWVsZHMuY3VycmVudFRwXSA/PyAnJyk7XHJcbiAgICB0aGlzLm1heFRwID0gcGFyc2VJbnQocGFydHNbZmllbGRzLm1heFRwXSA/PyAnJyk7XHJcbiAgICB0aGlzLnggPSBwYXJzZUZsb2F0KHBhcnRzW2ZpZWxkcy54XSA/PyAnJyk7XHJcbiAgICB0aGlzLnkgPSBwYXJzZUZsb2F0KHBhcnRzW2ZpZWxkcy55XSA/PyAnJyk7XHJcbiAgICB0aGlzLnogPSBwYXJzZUZsb2F0KHBhcnRzW2ZpZWxkcy56XSA/PyAnJyk7XHJcbiAgICB0aGlzLmhlYWRpbmcgPSBwYXJzZUZsb2F0KHBhcnRzW2ZpZWxkcy5oZWFkaW5nXSA/PyAnJyk7XHJcblxyXG4gICAgY29uc3QgcGFkZGVkID0gRW11bGF0b3JDb21tb24uemVyb1BhZCh0aGlzLmpvYkxldmVsRGF0YSwgOCk7XHJcblxyXG4gICAgdGhpcy5qb2JJZEhleCA9IHBhZGRlZC5zdWJzdHIoNiwgMikudG9VcHBlckNhc2UoKTtcclxuICAgIHRoaXMuam9iSWQgPSBwYXJzZUludCh0aGlzLmpvYklkSGV4LCAxNik7XHJcbiAgICB0aGlzLmpvYiA9IFV0aWwuam9iRW51bVRvSm9iKHRoaXMuam9iSWQpO1xyXG5cclxuICAgIHRoaXMubGV2ZWwgPSBwYXJzZUludChwYWRkZWQuc3Vic3RyKDQsIDIpLCAxNik7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTGluZUV2ZW50MzggZXh0ZW5kcyBMaW5lRXZlbnQweDI2IHt9XHJcbiIsImltcG9ydCBMaW5lRXZlbnQsIHsgTGluZUV2ZW50U291cmNlIH0gZnJvbSAnLi9MaW5lRXZlbnQnO1xyXG5pbXBvcnQgTG9nUmVwb3NpdG9yeSBmcm9tICcuL0xvZ1JlcG9zaXRvcnknO1xyXG5cclxuY29uc3QgZmllbGRzID0ge1xyXG4gIGlkOiAyLFxyXG4gIG5hbWU6IDMsXHJcbiAgY3VycmVudEhwOiA0LFxyXG4gIG1heEhwOiA1LFxyXG4gIGN1cnJlbnRNcDogNixcclxuICBtYXhNcDogNyxcclxuICBjdXJyZW50VHA6IDgsXHJcbiAgbWF4VHA6IDksXHJcbiAgeDogMTAsXHJcbiAgeTogMTEsXHJcbiAgejogMTIsXHJcbiAgaGVhZGluZzogMTMsXHJcbn0gYXMgY29uc3Q7XHJcblxyXG4vLyBOZXR3b3JrIHVwZGF0ZSBocCBldmVudFxyXG5leHBvcnQgY2xhc3MgTGluZUV2ZW50MHgyNyBleHRlbmRzIExpbmVFdmVudCBpbXBsZW1lbnRzIExpbmVFdmVudFNvdXJjZSB7XHJcbiAgcHVibGljIHJlYWRvbmx5IGlkOiBzdHJpbmc7XHJcbiAgcHVibGljIHJlYWRvbmx5IG5hbWU6IHN0cmluZztcclxuICBwdWJsaWMgcmVhZG9ubHkgaHA6IG51bWJlcjtcclxuICBwdWJsaWMgcmVhZG9ubHkgbWF4SHA6IG51bWJlcjtcclxuICBwdWJsaWMgcmVhZG9ubHkgbXA6IG51bWJlcjtcclxuICBwdWJsaWMgcmVhZG9ubHkgbWF4TXA6IG51bWJlcjtcclxuICBwdWJsaWMgcmVhZG9ubHkgdHA6IG51bWJlcjtcclxuICBwdWJsaWMgcmVhZG9ubHkgbWF4VHA6IG51bWJlcjtcclxuICBwdWJsaWMgcmVhZG9ubHkgeDogbnVtYmVyO1xyXG4gIHB1YmxpYyByZWFkb25seSB5OiBudW1iZXI7XHJcbiAgcHVibGljIHJlYWRvbmx5IHo6IG51bWJlcjtcclxuICBwdWJsaWMgcmVhZG9ubHkgaGVhZGluZzogbnVtYmVyO1xyXG4gIHB1YmxpYyByZWFkb25seSBpc1NvdXJjZSA9IHRydWU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHJlcG86IExvZ1JlcG9zaXRvcnksIGxpbmU6IHN0cmluZywgcGFydHM6IHN0cmluZ1tdKSB7XHJcbiAgICBzdXBlcihyZXBvLCBsaW5lLCBwYXJ0cyk7XHJcblxyXG4gICAgdGhpcy5pZCA9IHBhcnRzW2ZpZWxkcy5pZF0/LnRvVXBwZXJDYXNlKCkgPz8gJyc7XHJcbiAgICB0aGlzLm5hbWUgPSBwYXJ0c1tmaWVsZHMubmFtZV0gPz8gJyc7XHJcbiAgICB0aGlzLmhwID0gcGFyc2VJbnQocGFydHNbZmllbGRzLmN1cnJlbnRIcF0gPz8gJycpO1xyXG4gICAgdGhpcy5tYXhIcCA9IHBhcnNlSW50KHBhcnRzW2ZpZWxkcy5tYXhIcF0gPz8gJycpO1xyXG4gICAgdGhpcy5tcCA9IHBhcnNlSW50KHBhcnRzW2ZpZWxkcy5jdXJyZW50TXBdID8/ICcnKTtcclxuICAgIHRoaXMubWF4TXAgPSBwYXJzZUludChwYXJ0c1tmaWVsZHMubWF4TXBdID8/ICcnKTtcclxuICAgIHRoaXMudHAgPSBwYXJzZUludChwYXJ0c1tmaWVsZHMuY3VycmVudFRwXSA/PyAnJyk7XHJcbiAgICB0aGlzLm1heFRwID0gcGFyc2VJbnQocGFydHNbZmllbGRzLm1heFRwXSA/PyAnJyk7XHJcbiAgICB0aGlzLnggPSBwYXJzZUZsb2F0KHBhcnRzW2ZpZWxkcy54XSA/PyAnJyk7XHJcbiAgICB0aGlzLnkgPSBwYXJzZUZsb2F0KHBhcnRzW2ZpZWxkcy55XSA/PyAnJyk7XHJcbiAgICB0aGlzLnogPSBwYXJzZUZsb2F0KHBhcnRzW2ZpZWxkcy56XSA/PyAnJyk7XHJcbiAgICB0aGlzLmhlYWRpbmcgPSBwYXJzZUZsb2F0KHBhcnRzW2ZpZWxkcy5oZWFkaW5nXSA/PyAnJyk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTGluZUV2ZW50MzkgZXh0ZW5kcyBMaW5lRXZlbnQweDI3IHt9XHJcbiIsImltcG9ydCBMaW5lRXZlbnQgZnJvbSAnLi9MaW5lRXZlbnQnO1xyXG5pbXBvcnQgeyBMaW5lRXZlbnQwMCB9IGZyb20gJy4vTGluZUV2ZW50MHgwMCc7XHJcbmltcG9ydCB7IExpbmVFdmVudDAxIH0gZnJvbSAnLi9MaW5lRXZlbnQweDAxJztcclxuaW1wb3J0IHsgTGluZUV2ZW50MDIgfSBmcm9tICcuL0xpbmVFdmVudDB4MDInO1xyXG5pbXBvcnQgeyBMaW5lRXZlbnQwMyB9IGZyb20gJy4vTGluZUV2ZW50MHgwMyc7XHJcbmltcG9ydCB7IExpbmVFdmVudDA0IH0gZnJvbSAnLi9MaW5lRXZlbnQweDA0JztcclxuaW1wb3J0IHsgTGluZUV2ZW50MTIgfSBmcm9tICcuL0xpbmVFdmVudDB4MEMnO1xyXG5pbXBvcnQgeyBMaW5lRXZlbnQyMCB9IGZyb20gJy4vTGluZUV2ZW50MHgxNCc7XHJcbmltcG9ydCB7IExpbmVFdmVudDIxIH0gZnJvbSAnLi9MaW5lRXZlbnQweDE1JztcclxuaW1wb3J0IHsgTGluZUV2ZW50MjIgfSBmcm9tICcuL0xpbmVFdmVudDB4MTYnO1xyXG5pbXBvcnQgeyBMaW5lRXZlbnQyMyB9IGZyb20gJy4vTGluZUV2ZW50MHgxNyc7XHJcbmltcG9ydCB7IExpbmVFdmVudDI0IH0gZnJvbSAnLi9MaW5lRXZlbnQweDE4JztcclxuaW1wb3J0IHsgTGluZUV2ZW50MjUgfSBmcm9tICcuL0xpbmVFdmVudDB4MTknO1xyXG5pbXBvcnQgeyBMaW5lRXZlbnQyNiB9IGZyb20gJy4vTGluZUV2ZW50MHgxQSc7XHJcbmltcG9ydCB7IExpbmVFdmVudDI3IH0gZnJvbSAnLi9MaW5lRXZlbnQweDFCJztcclxuaW1wb3J0IHsgTGluZUV2ZW50MjggfSBmcm9tICcuL0xpbmVFdmVudDB4MUMnO1xyXG5pbXBvcnQgeyBMaW5lRXZlbnQyOSB9IGZyb20gJy4vTGluZUV2ZW50MHgxRCc7XHJcbmltcG9ydCB7IExpbmVFdmVudDMwIH0gZnJvbSAnLi9MaW5lRXZlbnQweDFFJztcclxuaW1wb3J0IHsgTGluZUV2ZW50MzEgfSBmcm9tICcuL0xpbmVFdmVudDB4MUYnO1xyXG5pbXBvcnQgeyBMaW5lRXZlbnQzNCB9IGZyb20gJy4vTGluZUV2ZW50MHgyMic7XHJcbmltcG9ydCB7IExpbmVFdmVudDM1IH0gZnJvbSAnLi9MaW5lRXZlbnQweDIzJztcclxuaW1wb3J0IHsgTGluZUV2ZW50MzYgfSBmcm9tICcuL0xpbmVFdmVudDB4MjQnO1xyXG5pbXBvcnQgeyBMaW5lRXZlbnQzNyB9IGZyb20gJy4vTGluZUV2ZW50MHgyNSc7XHJcbmltcG9ydCB7IExpbmVFdmVudDM4IH0gZnJvbSAnLi9MaW5lRXZlbnQweDI2JztcclxuaW1wb3J0IHsgTGluZUV2ZW50MzkgfSBmcm9tICcuL0xpbmVFdmVudDB4MjcnO1xyXG5pbXBvcnQgTG9nUmVwb3NpdG9yeSBmcm9tICcuL0xvZ1JlcG9zaXRvcnknO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFyc2VMaW5lIHtcclxuICBzdGF0aWMgcGFyc2UocmVwbzogTG9nUmVwb3NpdG9yeSwgbGluZTogc3RyaW5nKTogTGluZUV2ZW50IHwgdW5kZWZpbmVkIHtcclxuICAgIGxldCByZXQ7XHJcblxyXG4gICAgY29uc3QgcGFydHMgPSBsaW5lLnNwbGl0KCd8Jyk7XHJcbiAgICBjb25zdCBldmVudCA9IHBhcnRzWzBdO1xyXG5cclxuICAgIC8vIERvbid0IHBhcnNlIHJhdyBuZXR3b3JrIHBhY2tldCBsaW5lc1xyXG4gICAgaWYgKCFldmVudCB8fCBldmVudCA9PT0gJzI1MicpXHJcbiAgICAgIHJldHVybjtcclxuXHJcbiAgICAvLyBUaGlzIGlzIHVnbHksIGJ1dCBXZWJwYWNrIHByZWZlcnMgYmVpbmcgZXhwbGljaXRcclxuICAgIHN3aXRjaCAoJ0xpbmVFdmVudCcgKyBldmVudCkge1xyXG4gICAgY2FzZSAnTGluZUV2ZW50MDAnOlxyXG4gICAgICByZXQgPSBuZXcgTGluZUV2ZW50MDAocmVwbywgbGluZSwgcGFydHMpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ0xpbmVFdmVudDAxJzpcclxuICAgICAgcmV0ID0gbmV3IExpbmVFdmVudDAxKHJlcG8sIGxpbmUsIHBhcnRzKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdMaW5lRXZlbnQwMic6XHJcbiAgICAgIHJldCA9IG5ldyBMaW5lRXZlbnQwMihyZXBvLCBsaW5lLCBwYXJ0cyk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnTGluZUV2ZW50MDMnOlxyXG4gICAgICByZXQgPSBuZXcgTGluZUV2ZW50MDMocmVwbywgbGluZSwgcGFydHMpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ0xpbmVFdmVudDA0JzpcclxuICAgICAgcmV0ID0gbmV3IExpbmVFdmVudDA0KHJlcG8sIGxpbmUsIHBhcnRzKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdMaW5lRXZlbnQxMic6XHJcbiAgICAgIHJldCA9IG5ldyBMaW5lRXZlbnQxMihyZXBvLCBsaW5lLCBwYXJ0cyk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnTGluZUV2ZW50MjAnOlxyXG4gICAgICByZXQgPSBuZXcgTGluZUV2ZW50MjAocmVwbywgbGluZSwgcGFydHMpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ0xpbmVFdmVudDIxJzpcclxuICAgICAgcmV0ID0gbmV3IExpbmVFdmVudDIxKHJlcG8sIGxpbmUsIHBhcnRzKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdMaW5lRXZlbnQyMic6XHJcbiAgICAgIHJldCA9IG5ldyBMaW5lRXZlbnQyMihyZXBvLCBsaW5lLCBwYXJ0cyk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnTGluZUV2ZW50MjMnOlxyXG4gICAgICByZXQgPSBuZXcgTGluZUV2ZW50MjMocmVwbywgbGluZSwgcGFydHMpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ0xpbmVFdmVudDI0JzpcclxuICAgICAgcmV0ID0gbmV3IExpbmVFdmVudDI0KHJlcG8sIGxpbmUsIHBhcnRzKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdMaW5lRXZlbnQyNSc6XHJcbiAgICAgIHJldCA9IG5ldyBMaW5lRXZlbnQyNShyZXBvLCBsaW5lLCBwYXJ0cyk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnTGluZUV2ZW50MjYnOlxyXG4gICAgICByZXQgPSBuZXcgTGluZUV2ZW50MjYocmVwbywgbGluZSwgcGFydHMpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ0xpbmVFdmVudDI3JzpcclxuICAgICAgcmV0ID0gbmV3IExpbmVFdmVudDI3KHJlcG8sIGxpbmUsIHBhcnRzKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdMaW5lRXZlbnQyOCc6XHJcbiAgICAgIHJldCA9IG5ldyBMaW5lRXZlbnQyOChyZXBvLCBsaW5lLCBwYXJ0cyk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnTGluZUV2ZW50MjknOlxyXG4gICAgICByZXQgPSBuZXcgTGluZUV2ZW50MjkocmVwbywgbGluZSwgcGFydHMpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ0xpbmVFdmVudDMwJzpcclxuICAgICAgcmV0ID0gbmV3IExpbmVFdmVudDMwKHJlcG8sIGxpbmUsIHBhcnRzKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdMaW5lRXZlbnQzMSc6XHJcbiAgICAgIHJldCA9IG5ldyBMaW5lRXZlbnQzMShyZXBvLCBsaW5lLCBwYXJ0cyk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnTGluZUV2ZW50MzQnOlxyXG4gICAgICByZXQgPSBuZXcgTGluZUV2ZW50MzQocmVwbywgbGluZSwgcGFydHMpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ0xpbmVFdmVudDM1JzpcclxuICAgICAgcmV0ID0gbmV3IExpbmVFdmVudDM1KHJlcG8sIGxpbmUsIHBhcnRzKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdMaW5lRXZlbnQzNic6XHJcbiAgICAgIHJldCA9IG5ldyBMaW5lRXZlbnQzNihyZXBvLCBsaW5lLCBwYXJ0cyk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnTGluZUV2ZW50MzcnOlxyXG4gICAgICByZXQgPSBuZXcgTGluZUV2ZW50MzcocmVwbywgbGluZSwgcGFydHMpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ0xpbmVFdmVudDM4JzpcclxuICAgICAgcmV0ID0gbmV3IExpbmVFdmVudDM4KHJlcG8sIGxpbmUsIHBhcnRzKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdMaW5lRXZlbnQzOSc6XHJcbiAgICAgIHJldCA9IG5ldyBMaW5lRXZlbnQzOShyZXBvLCBsaW5lLCBwYXJ0cyk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0ID0gbmV3IExpbmVFdmVudChyZXBvLCBsaW5lLCBwYXJ0cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQWxzbyBkb24ndCBwYXJzZSBsaW5lcyB3aXRoIGEgbm9uLXNhbmUgZGF0ZS4gVGhpcyBpcyAyMDAwLTAxLTAxIDAwOjAwOjAwXHJcbiAgICBpZiAocmV0ICYmIHJldC50aW1lc3RhbXAgPCA5NDY2ODQ4MDApXHJcbiAgICAgIHJldHVybjtcclxuXHJcbiAgICAvLyBGaW5hbGx5LCBpZiB0aGUgb2JqZWN0IG1hcmtzIGl0c2VsZiBhcyBpbnZhbGlkLCBza2lwIGl0XHJcbiAgICBpZiAocmV0ICYmIHJldC5pbnZhbGlkKVxyXG4gICAgICByZXR1cm47XHJcblxyXG4gICAgcmV0dXJuIHJldDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IEV2ZW50QnVzIGZyb20gJy4uL0V2ZW50QnVzJztcclxuaW1wb3J0IExpbmVFdmVudCBmcm9tICcuL25ldHdvcmtfbG9nX2NvbnZlcnRlci9MaW5lRXZlbnQnO1xyXG5pbXBvcnQgTG9nUmVwb3NpdG9yeSBmcm9tICcuL25ldHdvcmtfbG9nX2NvbnZlcnRlci9Mb2dSZXBvc2l0b3J5JztcclxuaW1wb3J0IFBhcnNlTGluZSBmcm9tICcuL25ldHdvcmtfbG9nX2NvbnZlcnRlci9QYXJzZUxpbmUnO1xyXG5cclxuY29uc3QgaXNMaW5lRXZlbnQgPSAobGluZT86IExpbmVFdmVudCk6IGxpbmUgaXMgTGluZUV2ZW50ID0+IHtcclxuICByZXR1cm4gISFsaW5lO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV0d29ya0xvZ0NvbnZlcnRlciBleHRlbmRzIEV2ZW50QnVzIHtcclxuICBjb252ZXJ0RmlsZShkYXRhOiBzdHJpbmcpOiBMaW5lRXZlbnRbXSB7XHJcbiAgICBjb25zdCByZXBvID0gbmV3IExvZ1JlcG9zaXRvcnkoKTtcclxuICAgIHJldHVybiB0aGlzLmNvbnZlcnRMaW5lcyhcclxuICAgICAgICAvLyBTcGxpdCBkYXRhIGludG8gYW4gYXJyYXkgb2Ygc2VwYXJhdGUgbGluZXMsIHJlbW92aW5nIGFueSBibGFuayBsaW5lcy5cclxuICAgICAgICBkYXRhLnNwbGl0KE5ldHdvcmtMb2dDb252ZXJ0ZXIubGluZVNwbGl0UmVnZXgpLmZpbHRlcigobCkgPT4gbCAhPT0gJycpLFxyXG4gICAgICAgIHJlcG8sXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgY29udmVydExpbmVzKGxpbmVzOiBzdHJpbmdbXSwgcmVwbzogTG9nUmVwb3NpdG9yeSk6IExpbmVFdmVudFtdIHtcclxuICAgIGxldCBsaW5lRXZlbnRzID0gbGluZXMubWFwKChsKSA9PiBQYXJzZUxpbmUucGFyc2UocmVwbywgbCkpLmZpbHRlcihpc0xpbmVFdmVudCk7XHJcbiAgICAvLyBDYWxsIGBjb252ZXJ0YCB0byBjb252ZXJ0IHRoZSBuZXR3b3JrIGxpbmUgdG8gbm9uLW5ldHdvcmsgZm9ybWF0IGFuZCB1cGRhdGUgaW5kZXhpbmcgdmFsdWVzXHJcbiAgICBsaW5lRXZlbnRzID0gbGluZUV2ZW50cy5tYXAoKGwsIGkpID0+IHtcclxuICAgICAgbC5pbmRleCA9IGk7XHJcbiAgICAgIHJldHVybiBsO1xyXG4gICAgfSk7XHJcbiAgICAvLyBTb3J0IHRoZSBsaW5lcyBiYXNlZCBvbiBgJHt0aW1lc3RhbXB9XyR7aW5kZXh9YCB0byBoYW5kbGUgb3V0LW9mLW9yZGVyIGxpbmVzIHByb3Blcmx5XHJcbiAgICAvLyBAVE9ETzogUmVtb3ZlIHRoaXMgb25jZSB1bmRlcmx5aW5nIENvbWJhdGFudFRyYWNrZXIgdXBkYXRlIGlzc3VlcyBhcmUgcmVzb2x2ZWRcclxuICAgIHJldHVybiBsaW5lRXZlbnRzLnNvcnQoKGwsIHIpID0+IChgJHtsLnRpbWVzdGFtcH1fJHtsLmluZGV4fWApLmxvY2FsZUNvbXBhcmUoYCR7ci50aW1lc3RhbXB9XyR7ci5pbmRleH1gKSk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgbGluZVNwbGl0UmVnZXggPSAvXFxyP1xcbi9nbTtcclxufVxyXG4iLCJleHBvcnQgY29uc3QgbGFuZ3VhZ2VzID0gWydlbicsICdkZScsICdmcicsICdqYScsICdjbicsICdrbyddIGFzIGNvbnN0O1xyXG5cclxuZXhwb3J0IHR5cGUgTGFuZyA9IHR5cGVvZiBsYW5ndWFnZXNbbnVtYmVyXTtcclxuXHJcbmV4cG9ydCB0eXBlIE5vbkVuTGFuZyA9IEV4Y2x1ZGU8TGFuZywgJ2VuJz47XHJcblxyXG5leHBvcnQgY29uc3QgbGFuZ01hcDogeyBbbGFuZyBpbiBMYW5nXTogeyBbbGFuZyBpbiBMYW5nXTogc3RyaW5nIH0gfSA9IHtcclxuICBlbjoge1xyXG4gICAgZW46ICdFbmdsaXNoJyxcclxuICAgIGRlOiAnR2VybWFuJyxcclxuICAgIGZyOiAnRnJlbmNoJyxcclxuICAgIGphOiAnSmFwYW5lc2UnLFxyXG4gICAgY246ICdDaGluZXNlJyxcclxuICAgIGtvOiAnS29yZWFuJyxcclxuICB9LFxyXG4gIGRlOiB7XHJcbiAgICBlbjogJ0VuZ2xpc2NoJyxcclxuICAgIGRlOiAnRGV1dHNjaCcsXHJcbiAgICBmcjogJ0ZyYW56w7ZzaXNjaCcsXHJcbiAgICBqYTogJ0phcGFuaXNjaCcsXHJcbiAgICBjbjogJ0NoaW5lc2lzY2gnLFxyXG4gICAga286ICdLb3JlYW5pc2NoJyxcclxuICB9LFxyXG4gIGZyOiB7XHJcbiAgICBlbjogJ0FuZ2xhaXMnLFxyXG4gICAgZGU6ICdBbGxlbWFuZCcsXHJcbiAgICBmcjogJ0ZyYW7Dp2FpcycsXHJcbiAgICBqYTogJ0phcG9uYWlzJyxcclxuICAgIGNuOiAnQ2hpbm9pcycsXHJcbiAgICBrbzogJ0NvcsOpZW4nLFxyXG4gIH0sXHJcbiAgamE6IHtcclxuICAgIGVuOiAn6Iux6KqeJyxcclxuICAgIGRlOiAn44OJ44Kk44OE6KqeJyxcclxuICAgIGZyOiAn44OV44Op44Oz44K56KqeJyxcclxuICAgIGphOiAn5pel5pys6KqeJyxcclxuICAgIGNuOiAn5Lit5Zu96KqeJyxcclxuICAgIGtvOiAn6Z+T5Zu96KqeJyxcclxuICB9LFxyXG4gIGNuOiB7XHJcbiAgICBlbjogJ+iLseivrScsXHJcbiAgICBkZTogJ+W+t+ivrScsXHJcbiAgICBmcjogJ+azleivrScsXHJcbiAgICBqYTogJ+aXpeivrScsXHJcbiAgICBjbjogJ+S4reaWhycsXHJcbiAgICBrbzogJ+mfqeivrScsXHJcbiAgfSxcclxuICBrbzoge1xyXG4gICAgZW46ICfsmIHslrQnLFxyXG4gICAgZGU6ICfrj4XsnbzslrQnLFxyXG4gICAgZnI6ICftlITrnpHsiqTslrQnLFxyXG4gICAgamE6ICfsnbzrs7jslrQnLFxyXG4gICAgY246ICfspJHqta3slrQnLFxyXG4gICAga286ICftlZzqta3slrQnLFxyXG4gIH0sXHJcbn0gYXMgY29uc3Q7XHJcblxyXG5leHBvcnQgY29uc3QgaXNMYW5nID0gKGxhbmc/OiBzdHJpbmcpOiBsYW5nIGlzIExhbmcgPT4ge1xyXG4gIGNvbnN0IGxhbmdTdHJzOiByZWFkb25seSBzdHJpbmdbXSA9IGxhbmd1YWdlcztcclxuICBpZiAoIWxhbmcpXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgcmV0dXJuIGxhbmdTdHJzLmluY2x1ZGVzKGxhbmcpO1xyXG59O1xyXG4iLCJpbXBvcnQgQ29tYmF0YW50VHJhY2tlciBmcm9tICcuL0NvbWJhdGFudFRyYWNrZXInO1xyXG5pbXBvcnQgUGV0TmFtZXNCeUxhbmcgZnJvbSAnLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3BldF9uYW1lcyc7XHJcbmltcG9ydCBFbXVsYXRvckNvbW1vbiwgeyBNYXRjaEVuZEluZm8sIE1hdGNoU3RhcnRJbmZvIH0gZnJvbSAnLi4vRW11bGF0b3JDb21tb24nO1xyXG5pbXBvcnQgTG9nUmVwb3NpdG9yeSBmcm9tICcuL25ldHdvcmtfbG9nX2NvbnZlcnRlci9Mb2dSZXBvc2l0b3J5JztcclxuaW1wb3J0IE5ldHdvcmtMb2dDb252ZXJ0ZXIgZnJvbSAnLi9OZXR3b3JrTG9nQ29udmVydGVyJztcclxuaW1wb3J0IHsgTGFuZywgaXNMYW5nIH0gZnJvbSAnLi4vLi4vLi4vLi4vcmVzb3VyY2VzL2xhbmd1YWdlcyc7XHJcbmltcG9ydCBMaW5lRXZlbnQsIHsgaXNMaW5lRXZlbnRTb3VyY2UsIGlzTGluZUV2ZW50VGFyZ2V0IH0gZnJvbSAnLi9uZXR3b3JrX2xvZ19jb252ZXJ0ZXIvTGluZUV2ZW50JztcclxuaW1wb3J0IHsgVW5yZWFjaGFibGVDb2RlIH0gZnJvbSAnLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25vdF9yZWFjaGVkJztcclxuXHJcbmNvbnN0IGlzUGV0TmFtZSA9IChuYW1lOiBzdHJpbmcsIGxhbmd1YWdlPzogTGFuZykgPT4ge1xyXG4gIGlmIChsYW5ndWFnZSlcclxuICAgIHJldHVybiBQZXROYW1lc0J5TGFuZ1tsYW5ndWFnZV0uaW5jbHVkZXMobmFtZSk7XHJcblxyXG4gIGZvciAoY29uc3QgbGFuZyBpbiBQZXROYW1lc0J5TGFuZykge1xyXG4gICAgaWYgKCFpc0xhbmcobGFuZykpXHJcbiAgICAgIHRocm93IG5ldyBVbnJlYWNoYWJsZUNvZGUoKTtcclxuICAgIGlmIChQZXROYW1lc0J5TGFuZ1tsYW5nXS5pbmNsdWRlcyhuYW1lKSlcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG5jb25zdCBpc1ZhbGlkVGltZXN0YW1wID0gKHRpbWVzdGFtcDogbnVtYmVyKSA9PiB7XHJcbiAgcmV0dXJuIHRpbWVzdGFtcCA+IDAgJiYgdGltZXN0YW1wIDwgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbmNvdW50ZXIge1xyXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IGVuY291bnRlclZlcnNpb24gPSAxO1xyXG4gIHB1YmxpYyBpZD86IG51bWJlcjtcclxuICB2ZXJzaW9uOiBudW1iZXI7XHJcbiAgaW5pdGlhbE9mZnNldCA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xyXG4gIGVuZFN0YXR1cyA9ICdVbmtub3duJztcclxuICBzdGFydFN0YXR1cyA9ICdVbmtub3duJztcclxuICBwcml2YXRlIGVuZ2FnZUF0ID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XHJcbiAgcHJpdmF0ZSBmaXJzdFBsYXllckFiaWxpdHkgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcclxuICBwcml2YXRlIGZpcnN0RW5lbXlBYmlsaXR5ID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XHJcbiAgZmlyc3RMaW5lSW5kZXggPSAwO1xyXG4gIGNvbWJhdGFudFRyYWNrZXI/OiBDb21iYXRhbnRUcmFja2VyO1xyXG4gIHN0YXJ0VGltZXN0YW1wID0gMDtcclxuICBlbmRUaW1lc3RhbXAgPSAwO1xyXG4gIGR1cmF0aW9uID0gMDtcclxuICBwbGF5YmFja09mZnNldCA9IDA7XHJcbiAgbGFuZ3VhZ2U6IExhbmcgPSAnZW4nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBlbmNvdW50ZXJEYXk6IHN0cmluZyxcclxuICAgIHB1YmxpYyBlbmNvdW50ZXJab25lSWQ6IHN0cmluZyxcclxuICAgIHB1YmxpYyBlbmNvdW50ZXJab25lTmFtZTogc3RyaW5nLFxyXG4gICAgcHVibGljIGxvZ0xpbmVzOiBMaW5lRXZlbnRbXSkge1xyXG4gICAgdGhpcy52ZXJzaW9uID0gRW5jb3VudGVyLmVuY291bnRlclZlcnNpb247XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXplKCk6IHZvaWQge1xyXG4gICAgY29uc3Qgc3RhcnRTdGF0dXNlcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xyXG5cclxuICAgIHRoaXMubG9nTGluZXMuZm9yRWFjaCgobGluZSwgaSkgPT4ge1xyXG4gICAgICBpZiAoIWxpbmUpXHJcbiAgICAgICAgdGhyb3cgbmV3IFVucmVhY2hhYmxlQ29kZSgpO1xyXG5cclxuICAgICAgbGV0IHJlczogTWF0Y2hTdGFydEluZm8gfCBNYXRjaEVuZEluZm8gfCB1bmRlZmluZWQgPVxyXG4gICAgICAgICAgRW11bGF0b3JDb21tb24ubWF0Y2hTdGFydChsaW5lLm5ldHdvcmtMaW5lKTtcclxuICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgIHRoaXMuZmlyc3RMaW5lSW5kZXggPSBpO1xyXG4gICAgICAgIGlmIChyZXMuU3RhcnRUeXBlKVxyXG4gICAgICAgICAgc3RhcnRTdGF0dXNlcy5hZGQocmVzLlN0YXJ0VHlwZSk7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRJbiA9IHBhcnNlSW50KHJlcy5TdGFydEluKTtcclxuICAgICAgICBpZiAoc3RhcnRJbiA+PSAwKVxyXG4gICAgICAgICAgdGhpcy5lbmdhZ2VBdCA9IE1hdGgubWluKGxpbmUudGltZXN0YW1wICsgc3RhcnRJbiwgdGhpcy5lbmdhZ2VBdCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzID0gRW11bGF0b3JDb21tb24ubWF0Y2hFbmQobGluZS5uZXR3b3JrTGluZSk7XHJcbiAgICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgICAgaWYgKHJlcy5FbmRUeXBlKVxyXG4gICAgICAgICAgICB0aGlzLmVuZFN0YXR1cyA9IHJlcy5FbmRUeXBlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNMaW5lRXZlbnRTb3VyY2UobGluZSkgJiYgaXNMaW5lRXZlbnRUYXJnZXQobGluZSkpIHtcclxuICAgICAgICAgIGlmIChsaW5lLmlkLnN0YXJ0c1dpdGgoJzEnKSB8fFxyXG4gICAgICAgICAgICAobGluZS5pZC5zdGFydHNXaXRoKCc0JykgJiYgaXNQZXROYW1lKGxpbmUubmFtZSwgdGhpcy5sYW5ndWFnZSkpKSB7XHJcbiAgICAgICAgICAgIC8vIFBsYXllciBvciBwZXQgYWJpbGl0eVxyXG4gICAgICAgICAgICBpZiAobGluZS50YXJnZXRJZC5zdGFydHNXaXRoKCc0JykgJiYgIWlzUGV0TmFtZShsaW5lLnRhcmdldE5hbWUsIHRoaXMubGFuZ3VhZ2UpKSB7XHJcbiAgICAgICAgICAgICAgLy8gVGFyZ2V0dGluZyBub24gcGxheWVyIG9yIHBldFxyXG4gICAgICAgICAgICAgIHRoaXMuZmlyc3RQbGF5ZXJBYmlsaXR5ID0gTWF0aC5taW4odGhpcy5maXJzdFBsYXllckFiaWxpdHksIGxpbmUudGltZXN0YW1wKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmIChsaW5lLmlkLnN0YXJ0c1dpdGgoJzQnKSAmJiAhaXNQZXROYW1lKGxpbmUubmFtZSwgdGhpcy5sYW5ndWFnZSkpIHtcclxuICAgICAgICAgICAgLy8gTm9uLXBsYXllciBhYmlsaXR5XHJcbiAgICAgICAgICAgIGlmIChsaW5lLnRhcmdldElkLnN0YXJ0c1dpdGgoJzEnKSB8fCBpc1BldE5hbWUobGluZS50YXJnZXROYW1lLCB0aGlzLmxhbmd1YWdlKSkge1xyXG4gICAgICAgICAgICAgIC8vIFRhcmdldHRpbmcgcGxheWVyIG9yIHBldFxyXG4gICAgICAgICAgICAgIHRoaXMuZmlyc3RFbmVteUFiaWxpdHkgPSBNYXRoLm1pbih0aGlzLmZpcnN0RW5lbXlBYmlsaXR5LCBsaW5lLnRpbWVzdGFtcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgbWF0Y2hlZExhbmcgPSByZXM/Lmxhbmd1YWdlO1xyXG4gICAgICBpZiAoaXNMYW5nKG1hdGNoZWRMYW5nKSlcclxuICAgICAgICB0aGlzLmxhbmd1YWdlID0gbWF0Y2hlZExhbmc7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmNvbWJhdGFudFRyYWNrZXIgPSBuZXcgQ29tYmF0YW50VHJhY2tlcih0aGlzLmxvZ0xpbmVzLCB0aGlzLmxhbmd1YWdlKTtcclxuICAgIHRoaXMuc3RhcnRUaW1lc3RhbXAgPSB0aGlzLmNvbWJhdGFudFRyYWNrZXIuZmlyc3RUaW1lc3RhbXA7XHJcbiAgICB0aGlzLmVuZFRpbWVzdGFtcCA9IHRoaXMuY29tYmF0YW50VHJhY2tlci5sYXN0VGltZXN0YW1wO1xyXG4gICAgdGhpcy5kdXJhdGlvbiA9IHRoaXMuZW5kVGltZXN0YW1wIC0gdGhpcy5zdGFydFRpbWVzdGFtcDtcclxuXHJcbiAgICBpZiAodGhpcy5pbml0aWFsT2Zmc2V0ID09PSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUikge1xyXG4gICAgICBpZiAodGhpcy5lbmdhZ2VBdCA8IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSKVxyXG4gICAgICAgIHRoaXMuaW5pdGlhbE9mZnNldCA9IHRoaXMuZW5nYWdlQXQgLSB0aGlzLnN0YXJ0VGltZXN0YW1wO1xyXG4gICAgICBlbHNlIGlmICh0aGlzLmZpcnN0UGxheWVyQWJpbGl0eSA8IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSKVxyXG4gICAgICAgIHRoaXMuaW5pdGlhbE9mZnNldCA9IHRoaXMuZmlyc3RQbGF5ZXJBYmlsaXR5IC0gdGhpcy5zdGFydFRpbWVzdGFtcDtcclxuICAgICAgZWxzZSBpZiAodGhpcy5maXJzdEVuZW15QWJpbGl0eSA8IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSKVxyXG4gICAgICAgIHRoaXMuaW5pdGlhbE9mZnNldCA9IHRoaXMuZmlyc3RFbmVteUFiaWxpdHkgLSB0aGlzLnN0YXJ0VGltZXN0YW1wO1xyXG4gICAgICBlbHNlXHJcbiAgICAgICAgdGhpcy5pbml0aWFsT2Zmc2V0ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBmaXJzdExpbmUgPSB0aGlzLmxvZ0xpbmVzW3RoaXMuZmlyc3RMaW5lSW5kZXhdO1xyXG5cclxuICAgIGlmIChmaXJzdExpbmUgJiYgZmlyc3RMaW5lLm9mZnNldClcclxuICAgICAgdGhpcy5wbGF5YmFja09mZnNldCA9IGZpcnN0TGluZS5vZmZzZXQ7XHJcblxyXG4gICAgdGhpcy5zdGFydFN0YXR1cyA9IFsuLi5zdGFydFN0YXR1c2VzXS5zb3J0KCkuam9pbignLCAnKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgaW5pdGlhbFRpbWVzdGFtcCgpIDogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLnN0YXJ0VGltZXN0YW1wICsgdGhpcy5pbml0aWFsT2Zmc2V0O1xyXG4gIH1cclxuXHJcbiAgc2hvdWxkUGVyc2lzdEZpZ2h0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGlzVmFsaWRUaW1lc3RhbXAodGhpcy5maXJzdFBsYXllckFiaWxpdHkpICYmIGlzVmFsaWRUaW1lc3RhbXAodGhpcy5maXJzdEVuZW15QWJpbGl0eSk7XHJcbiAgfVxyXG5cclxuICB1cGdyYWRlKHZlcnNpb246IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgaWYgKEVuY291bnRlci5lbmNvdW50ZXJWZXJzaW9uIDw9IHZlcnNpb24pXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICBjb25zdCByZXBvID0gbmV3IExvZ1JlcG9zaXRvcnkoKTtcclxuICAgIGNvbnN0IGNvbnZlcnRlciA9IG5ldyBOZXR3b3JrTG9nQ29udmVydGVyKCk7XHJcbiAgICB0aGlzLmxvZ0xpbmVzID0gY29udmVydGVyLmNvbnZlcnRMaW5lcyhcclxuICAgICAgICB0aGlzLmxvZ0xpbmVzLm1hcCgobCkgPT4gbC5uZXR3b3JrTGluZSksXHJcbiAgICAgICAgcmVwbyxcclxuICAgICk7XHJcbiAgICB0aGlzLnZlcnNpb24gPSBFbmNvdW50ZXIuZW5jb3VudGVyVmVyc2lvbjtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgRW11bGF0b3JDb21tb24gZnJvbSAnLi4vRW11bGF0b3JDb21tb24nO1xyXG5pbXBvcnQgRXZlbnRCdXMgZnJvbSAnLi4vRXZlbnRCdXMnO1xyXG5pbXBvcnQgTGluZUV2ZW50IGZyb20gJy4vbmV0d29ya19sb2dfY29udmVydGVyL0xpbmVFdmVudCc7XHJcbmltcG9ydCB7IExpbmVFdmVudDB4MDEgfSBmcm9tICcuL25ldHdvcmtfbG9nX2NvbnZlcnRlci9MaW5lRXZlbnQweDAxJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ0V2ZW50SGFuZGxlciBleHRlbmRzIEV2ZW50QnVzIHtcclxuICBwdWJsaWMgY3VycmVudEZpZ2h0OiBMaW5lRXZlbnRbXSA9IFtdO1xyXG4gIHB1YmxpYyBjdXJyZW50Wm9uZU5hbWUgPSAnVW5rbm93bic7XHJcbiAgcHVibGljIGN1cnJlbnRab25lSWQgPSAnLTEnO1xyXG5cclxuICBwYXJzZUxvZ3MobG9nczogTGluZUV2ZW50W10pOiB2b2lkIHtcclxuICAgIGZvciAoY29uc3QgbGluZU9iaiBvZiBsb2dzKSB7XHJcbiAgICAgIHRoaXMuY3VycmVudEZpZ2h0LnB1c2gobGluZU9iaik7XHJcblxyXG4gICAgICBsaW5lT2JqLm9mZnNldCA9IGxpbmVPYmoudGltZXN0YW1wIC0gdGhpcy5jdXJyZW50RmlnaHRTdGFydDtcclxuXHJcbiAgICAgIGNvbnN0IHJlcyA9IEVtdWxhdG9yQ29tbW9uLm1hdGNoRW5kKGxpbmVPYmoubmV0d29ya0xpbmUpO1xyXG4gICAgICBpZiAocmVzKSB7XHJcbiAgICAgICAgdGhpcy5lbmRGaWdodCgpO1xyXG4gICAgICB9IGVsc2UgaWYgKGxpbmVPYmogaW5zdGFuY2VvZiBMaW5lRXZlbnQweDAxKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50Wm9uZUlkID0gbGluZU9iai56b25lSWQ7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50Wm9uZU5hbWUgPSBsaW5lT2JqLnpvbmVOYW1lO1xyXG4gICAgICAgIHRoaXMuZW5kRmlnaHQoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXQgY3VycmVudEZpZ2h0U3RhcnQoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLmN1cnJlbnRGaWdodFswXT8udGltZXN0YW1wID8/IDA7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldCBjdXJyZW50RmlnaHRFbmQoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLmN1cnJlbnRGaWdodC5zbGljZSgtMSlbMF0/LnRpbWVzdGFtcCA/PyAwO1xyXG4gIH1cclxuXHJcbiAgZW5kRmlnaHQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50RmlnaHQubGVuZ3RoIDwgMilcclxuICAgICAgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUodGhpcy5jdXJyZW50RmlnaHRTdGFydCkudG9JU09TdHJpbmcoKTtcclxuICAgIGNvbnN0IGVuZCA9IG5ldyBEYXRlKHRoaXMuY3VycmVudEZpZ2h0RW5kKS50b0lTT1N0cmluZygpO1xyXG5cclxuICAgIGNvbnNvbGUuZGVidWcoYERpc3BhdGNoaW5nIG5ldyBmaWdodFxyXG5TdGFydDogJHtzdGFydH1cclxuRW5kOiAke2VuZH1cclxuWm9uZTogJHt0aGlzLmN1cnJlbnRab25lTmFtZX1cclxuTGluZSBDb3VudDogJHt0aGlzLmN1cnJlbnRGaWdodC5sZW5ndGh9XHJcbmApO1xyXG4gICAgdm9pZCB0aGlzLmRpc3BhdGNoKCdmaWdodCcsIHN0YXJ0LnN1YnN0cigwLCAxMCksIHRoaXMuY3VycmVudFpvbmVJZCwgdGhpcy5jdXJyZW50Wm9uZU5hbWUsIHRoaXMuY3VycmVudEZpZ2h0KTtcclxuXHJcbiAgICB0aGlzLmN1cnJlbnRGaWdodCA9IFtdO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgRW11bGF0b3JDb21tb24gZnJvbSAnLi4vRW11bGF0b3JDb21tb24nO1xyXG5pbXBvcnQgRW5jb3VudGVyIGZyb20gJy4vRW5jb3VudGVyJztcclxuaW1wb3J0IExvZ0V2ZW50SGFuZGxlciBmcm9tICcuL0xvZ0V2ZW50SGFuZGxlcic7XHJcbmltcG9ydCBOZXR3b3JrTG9nQ29udmVydGVyIGZyb20gJy4vTmV0d29ya0xvZ0NvbnZlcnRlcic7XHJcbmltcG9ydCBMb2dSZXBvc2l0b3J5IGZyb20gJy4vbmV0d29ya19sb2dfY29udmVydGVyL0xvZ1JlcG9zaXRvcnknO1xyXG5cclxub25tZXNzYWdlID0gYXN5bmMgKG1zZykgPT4ge1xyXG4gIGNvbnN0IGxvZ0NvbnZlcnRlciA9IG5ldyBOZXR3b3JrTG9nQ29udmVydGVyKCk7XHJcbiAgY29uc3QgbG9jYWxMb2dIYW5kbGVyID0gbmV3IExvZ0V2ZW50SGFuZGxlcigpO1xyXG4gIGNvbnN0IHJlcG8gPSBuZXcgTG9nUmVwb3NpdG9yeSgpO1xyXG5cclxuICAvLyBMaXN0ZW4gZm9yIExvZ0V2ZW50SGFuZGxlciB0byBkaXNwYXRjaCBmaWdodHMgYW5kIHBlcnNpc3QgdGhlbVxyXG4gIGxvY2FsTG9nSGFuZGxlci5vbignZmlnaHQnLCBhc3luYyAoZGF5LCB6b25lSWQsIHpvbmVOYW1lLCBsaW5lcykgPT4ge1xyXG4gICAgY29uc3QgZW5jID0gbmV3IEVuY291bnRlcihkYXksIHpvbmVJZCwgem9uZU5hbWUsIGxpbmVzKTtcclxuICAgIGVuYy5pbml0aWFsaXplKCk7XHJcbiAgICBpZiAoZW5jLnNob3VsZFBlcnNpc3RGaWdodCgpKSB7XHJcbiAgICAgIHBvc3RNZXNzYWdlKHtcclxuICAgICAgICB0eXBlOiAnZW5jb3VudGVyJyxcclxuICAgICAgICBlbmNvdW50ZXI6IGVuYyxcclxuICAgICAgICBuYW1lOiBlbmMuY29tYmF0YW50VHJhY2tlci5nZXRNYWluQ29tYmF0YW50TmFtZSgpLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gQ29udmVydCB0aGUgbWVzc2FnZSBtYW51YWxseSBkdWUgdG8gbWVtb3J5IGlzc3VlcyB3aXRoIGV4dHJlbWVseSBsYXJnZSBmaWxlc1xyXG4gIGNvbnN0IGRlY29kZXIgPSBuZXcgVGV4dERlY29kZXIoJ1VURi04Jyk7XHJcbiAgbGV0IGJ1ZiA9IG5ldyBVaW50OEFycmF5KG1zZy5kYXRhKTtcclxuICBsZXQgbmV4dE9mZnNldCA9IDA7XHJcbiAgbGV0IGxpbmVzID0gW107XHJcbiAgbGV0IGxpbmVDb3VudCA9IDA7XHJcbiAgZm9yIChsZXQgY3VycmVudE9mZnNldCA9IG5leHRPZmZzZXQ7XHJcbiAgICBuZXh0T2Zmc2V0IDwgYnVmLmxlbmd0aCAmJiBuZXh0T2Zmc2V0ICE9PSAtMTtcclxuICAgIGN1cnJlbnRPZmZzZXQgPSBuZXh0T2Zmc2V0KSB7XHJcbiAgICBuZXh0T2Zmc2V0ID0gYnVmLmluZGV4T2YoMHgwQSwgbmV4dE9mZnNldCArIDEpO1xyXG4gICAgY29uc3QgbGluZSA9IGRlY29kZXIuZGVjb2RlKGJ1Zi5zbGljZShjdXJyZW50T2Zmc2V0LCBuZXh0T2Zmc2V0KSkudHJpbSgpO1xyXG4gICAgaWYgKGxpbmUubGVuZ3RoKSB7XHJcbiAgICAgICsrbGluZUNvdW50O1xyXG4gICAgICBsaW5lcy5wdXNoKGxpbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChsaW5lcy5sZW5ndGggPj0gMTAwMCkge1xyXG4gICAgICBsaW5lcyA9IGxvZ0NvbnZlcnRlci5jb252ZXJ0TGluZXMobGluZXMsIHJlcG8pO1xyXG4gICAgICBsb2NhbExvZ0hhbmRsZXIucGFyc2VMb2dzKGxpbmVzKTtcclxuICAgICAgcG9zdE1lc3NhZ2Uoe1xyXG4gICAgICAgIHR5cGU6ICdwcm9ncmVzcycsXHJcbiAgICAgICAgbGluZXM6IGxpbmVDb3VudCxcclxuICAgICAgICBieXRlczogbmV4dE9mZnNldCxcclxuICAgICAgICB0b3RhbEJ5dGVzOiBidWYubGVuZ3RoLFxyXG4gICAgICB9KTtcclxuICAgICAgbGluZXMgPSBbXTtcclxuICAgIH1cclxuICB9XHJcbiAgaWYgKGxpbmVzLmxlbmd0aCA+IDApIHtcclxuICAgIGxpbmVzID0gbG9nQ29udmVydGVyLmNvbnZlcnRMaW5lcyhsaW5lcywgcmVwbyk7XHJcbiAgICBsb2NhbExvZ0hhbmRsZXIucGFyc2VMb2dzKGxpbmVzKTtcclxuICAgIGxpbmVzID0gW107XHJcbiAgfVxyXG4gIHBvc3RNZXNzYWdlKHtcclxuICAgIHR5cGU6ICdwcm9ncmVzcycsXHJcbiAgICBsaW5lczogbGluZUNvdW50LFxyXG4gICAgYnl0ZXM6IGJ1Zi5sZW5ndGgsXHJcbiAgICB0b3RhbEJ5dGVzOiBidWYubGVuZ3RoLFxyXG4gIH0pO1xyXG4gIGJ1ZiA9IG51bGw7XHJcblxyXG4gIGxvY2FsTG9nSGFuZGxlci5lbmRGaWdodCgpO1xyXG5cclxuICBwb3N0TWVzc2FnZSh7XHJcbiAgICB0eXBlOiAnZG9uZScsXHJcbiAgfSk7XHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=