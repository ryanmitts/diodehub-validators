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

const SpeedOnlyEffectValidator = Joi.object().keys({
    speed: SpeedValidator,
});

const LettersEffectValidator = Joi.object().keys({
    speed: SpeedValidator,
    message: Joi.string()
});

const ColorEffectValidator = Joi.object().keys({
    speed: SpeedValidator,
});

const CubeEffectDataValidator = Joi.object().keys({
    effect: Joi.any().only(
        'off',
        'color',
        'breathe',
        'expandingCube',
        'letters',
        'matrix',
        'rain',
        'rainbow',
        'randomPulse',
        'sineSurface',
        'spiral'
    ),
    options: Joi.alternatives()
        .when('effect', {
            is: Joi.any().only(
                'breathe',
                'expandingCube',
                'matrix',
                'rain',
                'rainbow',
                'randomPulse',
                'sineSurface',
                'spiral'
            ),
            then: SpeedOnlyEffectValidator,
        })
        .when('effect', {
            is: Joi.any().only(
                'color'
            ),
            then: ColorEffectValidator,
        })
        .when('effect', {
            is: Joi.any().only(
                'letters'
            ),
            then: LettersEffectValidator,
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
        ),
        then: Joi.array().items(Joi.string().regex(/^#[0-9A-Fa-f]{2,6}$/)),
        otherwise: Joi.array()
            .length(0)
            .optional(),
    }),
});

export default CubeEffectDataValidator;
