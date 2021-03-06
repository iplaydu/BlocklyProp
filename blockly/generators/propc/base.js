/**
 * Visual Blocks Language
 *
 * Copyright 2014 Michel Lampo.
 *
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
 * @fileoverview Generating Prop-C for basic blocks.
 * @author michel@creatingfuture.eu  (Michel Lampo)
 */
'use strict';

//define blocks
if (!Blockly.Language)
    Blockly.Language = {};

Blockly.Language.inout_digital_write = {
    category: 'In/Out',
    helpUrl: 'help/block-digitalpin.html#write',
    init: function() {
        this.setColour(230);
        this.appendDummyInput("")
                .appendTitle("DigitalWrite PIN#")
                .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN")
                .appendTitle("Stat")
                .appendTitle(new Blockly.FieldDropdown([["HIGH", "1"], ["LOW", "0"]]), "STAT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Write digital value to a specific Port');
    }
};

Blockly.Language.inout_digital_read = {
    category: 'In/Out',
    helpUrl: 'help/block-digitalpin.html#read',
    init: function() {
        this.setColour(230);
        this.appendDummyInput("")
                .appendTitle("DigitalRead PIN#")
                .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN");
        this.setOutput(true, Boolean);
        this.setTooltip('');
    }
};

Blockly.Language.inout_digital_write_pin = {
    category: 'In/Out',
    helpUrl: 'help/block-digitalpin.html#write-pin',
    init: function() {
        this.setColour(230);
        this.appendDummyInput("").appendTitle("DigitalWrite PIN#");
        this.appendValueInput('PIN').setCheck(Number);
        this.appendDummyInput("").appendTitle("Stat")
                .appendTitle(new Blockly.FieldDropdown([["HIGH", "1"], ["LOW", "0"]]), "STAT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Write digital value to a specific Port');
        this.setInputsInline(true);
    }
};

Blockly.Language.inout_digital_read_pin = {
    category: 'In/Out',
    helpUrl: 'help/block-digitalpin.html#read-pin',
    init: function() {
        this.setColour(230);
        this.appendDummyInput("").appendTitle("DigitalRead PIN#");
        this.appendValueInput('PIN').setCheck(Number);
        this.setOutput(true, Boolean);
        this.setTooltip('');
        this.setInputsInline(true);
    }
};

Blockly.Language.base_delay = {
    category: 'Control',
    helpUrl: 'help/block-delay.html',
    init: function() {
        this.setColour(120);
        this.appendValueInput("DELAY_TIME", Number)
                .appendTitle("Delay (ms)")
                .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Delay specific time');
    }
};

Blockly.Language.base_freqout = {
    category: 'Control',
    helpUrl: '',
    init: function() {
        this.setColour(120);
         this.appendDummyInput("")
                .appendTitle("Freq PIN#")
                .appendTitle(new Blockly.FieldDropdown(profile.default.digital), "PIN");
        this.appendValueInput("DURATION", Number)
                .appendTitle("Duration (ms)")
                .setCheck(Number);
        this.appendValueInput("FREQUENCY", Number)
                .appendTitle("frequecy (hz)")
                .setCheck(Number);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Frequency output');
    }
};


// define generators
Blockly.propc = Blockly.Generator.get('propc');

Blockly.propc.inout_digital_write = function() {
    var dropdown_pin = this.getTitleValue('PIN');
    var dropdown_stat = this.getTitleValue('STAT');
    if (dropdown_stat == 1) {
        return 'high(' + dropdown_pin + ');\n';
    } else {
        return 'low(' + dropdown_pin + ');\n';
    }
};

Blockly.propc.inout_digital_read = function() {
    var dropdown_pin = this.getTitleValue('PIN');
    //  Blockly.Spin.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    var code = 'input(' + dropdown_pin + ')';
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.propc.inout_digital_write_pin = function() {
    var dropdown_pin = Blockly.propc.valueToCode(this, 'PIN', Blockly.propc.ORDER_UNARY_PREFIX) || '0';
    var dropdown_stat = this.getTitleValue('STAT');
    if (dropdown_stat == 1) {
        return 'high(' + dropdown_pin + ');\n';
    } else {
        return 'low(' + dropdown_pin + ');\n';
    }
};

Blockly.propc.inout_digital_read_pin = function() {
    var dropdown_pin = Blockly.propc.valueToCode(this, 'PIN', Blockly.propc.ORDER_UNARY_PREFIX) || '0';
    //  Blockly.Spin.setups_['setup_input_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', INPUT);';
    var code = 'input(' + dropdown_pin + ')';
    return [code, Blockly.propc.ORDER_ATOMIC];
};

Blockly.propc.base_delay = function() {
    var delay_time = Blockly.propc.valueToCode(this, 'DELAY_TIME', Blockly.propc.ORDER_ATOMIC) || '1000';
    var code = 'pause(' + delay_time + ');\n';
    return code;
};

Blockly.propc.base_freqout = function() {
    var dropdown_pin = Blockly.propc.valueToCode(this, 'PIN', Blockly.propc.ORDER_UNARY_PREFIX) || '0';
    var duration = this.getTitleValue('DURATION') || 1000;
    var frequency = this.getTitleValue('FREQUENCY') || 3000;
    return 'freqout(' + dropdown_pin + ', ' + duration + ', ' + frequency + ');\n';
};