/*

This file contains support for multi cog use in Propeller C

*/
'use strict';

if ( !Blockly.Language )
  Blockly.Language = {};
  
  
Blockly.Language.cog_new = {
  category: 'Control',
  helpUrl: '',
  init: function() {
    this.setColour( 120 );
    this.appendDummyInput()
      .appendTitle( "cognew" );
    this.appendValueInput( "STACK_SIZE", Number )
      .appendTitle( "Stacksize" )
      .setCheck( Number );
    this.appendStatementInput( "METHOD" )
      .appendTitle( "Method" );
    this.setInputsInline( true );
    this.setPreviousStatement( true, null );
    this.setNextStatement( true, null );
  }
};

//get generators
Blockly.propc = Blockly.Generator.get( 'propc' );

Blockly.propc.cog_new = function() {
  var method = Blockly.propc.statementToCode( this, 'METHOD' );
  method = method.replace( "  ", "" ).replace( "\n", "" ).replace( "()", "" ).replace( ";", "" );
  var stackSize = Blockly.propc.valueToCode( this, 'STACK_SIZE', Blockly.propc.ORDER_ATOMIC ) || '10';
  
  var stackName = 'Stack' + Blockly.propc.stacks_.length;
  Blockly.propc.stacks_.push('long ' + stackName + '[' + stackSize + '];');
  
  var code = 'cog_run( &' + method + ', ' + stackName + ' );';
  return code;
};
