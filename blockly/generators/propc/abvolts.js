/**
 * Visual Blocks Language
 *
 * Copyright 2014 Michel Lampo
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating C for ActivityBoard ADC
 * @author michel@creatingfuture.eu  (Michel Lampo)
 */
'use strict';


//define blocks
if (!Blockly.Language)
    Blockly.Language = {};


//servo block
Blockly.Language.ab_volt_in = {
    category: 'ADC/DAC',
    helpUrl: '',
    init: function() {
        this.setColour(314);
        this.appendDummyInput("")
                .appendTitle("ADC channel")
                .appendTitle(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"]]), "CHANNEL");
        this.setOutput(true, Number);
    }
};

Blockly.Language.ab_volt_v_in = {
    category: 'ADC/DAC',
    helpUrl: '',
    init: function() {
        this.setColour(314);
        this.appendDummyInput("")
                .appendTitle("ADC in V channel")
                .appendTitle(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"]]), "CHANNEL");
        this.setOutput(true, Number);
    }
};

Blockly.Language.ab_volt_out = {
    category: 'ADC/DAC',
    helpUrl: '',
    init: function() {
        this.setColour(314);
        this.appendDummyInput("")
                .appendTitle("DAC channel")
                .appendTitle(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"]]), "CHANNEL");
        this.appendValueInput("VALUE", Number)
                .setCheck(Number)
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendTitle("Value");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Language.ab_volt_v_out = {
    category: 'ADC/DAC',
    helpUrl: '',
    init: function() {
        this.setColour(314);
        this.appendDummyInput("")
                .appendTitle("DAC in V channel")
                .appendTitle(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"]]), "CHANNEL");
        this.appendValueInput("VALUE", Number)
                .setCheck(Number)
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendTitle("Value");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

// define generators
Blockly.propc = Blockly.Generator.get('propc');

Blockly.propc.ab_volt_in = function() {
    var dropdown_channel = this.getTitleValue('CHANNEL');

    Blockly.propc.definitions_["include abvolt"] = '#include "abvolts.h"';
    if (Blockly.propc.setups_['setup_abvolt'] === undefined) {
        Blockly.propc.setups_['setup_abvolt'] = 'ad_init(21, 20, 19, 18);';
    }

    var code = 'ad_in(' + dropdown_channel + ')';
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.propc.ab_volt_v_in = function() {
    var dropdown_channel = this.getTitleValue('CHANNEL');

    Blockly.propc.definitions_["include abvolt"] = '#include "abvolts.h"';
    if (Blockly.propc.setups_['setup_abvolt'] === undefined) {
        Blockly.propc.setups_['setup_abvolt'] = 'ad_init(21, 20, 19, 18);';
    }

    var code = 'ad_volts(' + dropdown_channel + ')';
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.propc.ab_volt_out = function() {
    var dropdown_channel = this.getTitleValue('CHANNEL');
    var value = this.getTitleValue('VALUE') || '0';

    Blockly.propc.definitions_["include abvolt"] = '#include "abvolts.h"';
    if (Blockly.propc.setups_['setup_abvolt_out'] === undefined) {
        Blockly.propc.setups_['setup_abvolt_out'] = 'da_init(26, 27);';
    }

    var code = 'da_out(' + dropdown_channel + ', ' + value + ');\n';
    return code;
};

Blockly.propc.ab_volt_v_out = function() {
    var dropdown_channel = this.getTitleValue('CHANNEL');
    var value = this.getTitleValue('VALUE') || '0';

    Blockly.propc.definitions_["include abvolt"] = '#include "abvolts.h"';
    if (Blockly.propc.setups_['setup_abvolt_out'] === undefined) {
        Blockly.propc.setups_['setup_abvolt_out'] = 'da_init(26, 27);';
    }

    var code = 'da_volts(' + dropdown_channel + ', ' + value + ');\n';
    return code;
};