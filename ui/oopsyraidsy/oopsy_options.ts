import ContentType from '../../resources/content_type';
import UserConfig from '../../resources/user_config';
import ZoneId from '../../resources/zone_id';
import { BaseOptions } from '../../types/data';
import { LooseOopsyTriggerSet } from '../../types/oopsy';
import { ZoneIdType } from '../../types/trigger';

import { abilityNameMap } from './ability_name_map';

export type DisabledTriggers = { [triggerId: string]: boolean };
export type TriggerAutoConfig = { enabled: boolean };
export type PerTriggerAutoConfig = { [triggerId: string]: TriggerAutoConfig };

type OopsyNonConfigOptions = {
  Triggers: LooseOopsyTriggerSet[];
  PlayerNicks: { [gameName: string]: string };
  DisabledTriggers: DisabledTriggers;
  // TODO: should content_type export what type it is?
  IgnoreContentTypes: number[];
  IgnoreZoneIds: ZoneIdType[];
  AbilityIdNameMap: { [id: string]: string };
  PerTriggerAutoConfig: PerTriggerAutoConfig;
};

const defaultOopsyNonConfigOptions: OopsyNonConfigOptions = {
  Triggers: [],
  PlayerNicks: {},
  DisabledTriggers: {},
  IgnoreContentTypes: [
    ContentType.Pvp,
    ContentType.Eureka,
  ],
  IgnoreZoneIds: [
    // Bozja zones have an (unnamed) content type of 29 which also applies
    // to Delubrum Reginae (which we want oopsy on).  So, ignore by zone.
    ZoneId.TheBozjanSouthernFront,
    ZoneId.Zadnor,
  ],

  AbilityIdNameMap: abilityNameMap,
  PerTriggerAutoConfig: {},
};

// TODO: figure out how to get this type from oopsyraidsy_config??
// These values are overwritten and are just here for typing.
const defaultOopsyConfigOptions = {
  Debug: false,
  NumLiveListItemsInCombat: 5,
  MinimumTimeForPullMistake: 0.4,
};
type OopsyConfigOptions = typeof defaultOopsyConfigOptions;

export interface OopsyOptions extends BaseOptions, OopsyNonConfigOptions, OopsyConfigOptions {}

// See user/raidboss-example.js for documentation.
const Options: OopsyOptions = {
  ...UserConfig.getDefaultBaseOptions(),
  ...defaultOopsyNonConfigOptions,
  ...defaultOopsyConfigOptions,
};

export default Options;
