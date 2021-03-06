/*

This file contains support for the PIR sensor

Author: valetolpegin@gmail.com ( Vale Tolpegin )
*/
'use strict';

if ( !Blockly.Language )
  Blockly.Language = {};
 
//PIR sensor blocks 
Blockly.Language.PIR_Sensor = {
  category: 'Sensors',
  helpUrl: '',
  init: function() {
    this.setColour( 300 );
    this.appendDummyInput( "" )
      .appendTitle( "PIR Sensor" )
      .appendTitle( "Pin" )
      .appendTitle( new Blockly.FieldDropdown( profile.default.digital ), "PIN" );
    this.setNextStatement( false, null );
    this.setPreviousStatement( false, null ); 
    this.setOutput( true, Number );
  }
};

//Get generators
Blockly.propc = Blockly.Generator.get( 'propc' );

Blockly.propc.PIR_Sensor = function() {
  var pin = this.getTitleValue( 'PIN' );
  
  var code = 'input( ' + pin + ' )';
  return [ code, Blockly.propc.ORDER_ATOMIC ];
};
