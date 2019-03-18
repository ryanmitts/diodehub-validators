/**
 * DiodeHub Validators
 * Copyright (C) 2019 Ryan Mitts
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import Joi from 'joi';

const SpeedValidator = Joi.number().optional();

const ColorAndRainbowEffectOptionsValidator = Joi.object().keys({
    subEffect: Joi.any().only('rotateLeft', 'rotateRight', 'flash'),
    speed: Joi.any().when('subEffect', {
        is: Joi.exist(),
        then: SpeedValidator,
        otherwise: Joi.forbidden(),
    }),
});

const MeteorEffectOptionsValidator = Joi.object().keys({
    meteorSize: Joi.number().optional(),
    meteorTailDecay: Joi.number().optional(),
    speed: SpeedValidator,
});

const FireEffectOptionsValidator = Joi.object().keys({
    cooling: Joi.number().optional(),
    sparking: Joi.number().optional(),
    speed: SpeedValidator,
});

const SpeedOnlyEffectValidator = Joi.object().keys({
    speed: SpeedValidator,
});

const LightEffectDataValidator = Joi.object().keys({
    effect: Joi.any().only(
        'off',
        'color',
        'fire',
        'meteor',
        'pulseInOut',
        'rainbow',
        'randomTwinkle',
        'runningColor',
        'twinkle'
    ),
    options: Joi.alternatives()
        .when('effect', {
            is: Joi.any().only('color', 'rainbow'),
            then: ColorAndRainbowEffectOptionsValidator,
        })
        .when('effect', {
            is: Joi.any().only('meteor'),
            then: MeteorEffectOptionsValidator,
        })
        .when('effect', {
            is: Joi.any().only('fire'),
            then: FireEffectOptionsValidator,
        })
        .when('effect', {
            is: Joi.any().only(
                'pulseInOut',
                'randomTwinkle',
                'runningColor',
                'twinkle'
            ),
            then: SpeedOnlyEffectValidator,
        })
        .when('effect', {
            is: Joi.any().only('off'),
            then: Joi.object()
                .keys({})
                .optional(),
        }),
    colors: Joi.any().when('effect', {
        is: Joi.any().only(
            'color',
            'meteor',
            'pulseInOut',
            'runningColor',
            'twinkle'
        ),
        then: Joi.array().items(Joi.string().regex(/^#[0-9A-Fa-f]{2,6}$/)),
        otherwise: Joi.array()
            .length(0)
            .optional(),
    }),
});

export default LightEffectDataValidator;
