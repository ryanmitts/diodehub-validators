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

import Joi from "joi";

const SpeedValidator = Joi.number().optional();

const ColorAndRainbowEffectOptionsValidator = Joi.object().keys({
  subEffect: Joi.any().only(
    "rotateLeft",
    "rotateRight",
    "flash",
    "rotateUp",
    "rotateDown",
    "rotateRandom"
  ),
  speed: Joi.any().when("subEffect", {
    is: Joi.exist(),
    then: SpeedValidator,
    otherwise: Joi.forbidden(),
  }),
});

const SpeedOnlyEffectValidator = Joi.object().keys({
  speed: SpeedValidator,
});

const LettersEffectValidator = Joi.object().keys({
  speed: SpeedValidator,
  message: Joi.string(),
});

const CubeEffectDataValidator = Joi.object().keys({
  effect: Joi.any().only(
    "off",
    "color",
    "breathe",
    "expandingCube",
    "letters",
    "matrix",
    "rain",
    "rainbow",
    "randomPulse",
    "sineSurface",
    "spiral"
  ),
  options: Joi.alternatives()
    .when("effect", {
      is: Joi.any().only(
        "breathe",
        "expandingCube",
        "matrix",
        "rain",
        "randomPulse",
        "sineSurface",
        "spiral"
      ),
      then: SpeedOnlyEffectValidator,
    })
    .when("effect", {
      is: Joi.any().only("color", "rainbow"),
      then: ColorAndRainbowEffectOptionsValidator,
    })
    .when("effect", {
      is: Joi.any().only("letters"),
      then: LettersEffectValidator,
    })
    .when("effect", {
      is: Joi.any().only("off"),
      then: Joi.object().keys({}).optional(),
    }),
  colors: Joi.array().optional().items(Joi.string().regex(/^#[0-9A-Fa-f]{2,6}$/)),
});

export default CubeEffectDataValidator;
