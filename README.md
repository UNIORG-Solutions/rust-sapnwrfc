# sapnwrfc

This is (or might be in the future) a wrapper arounds SAPs NWRFC SDK for the rust programming language. 

There are already some other bindings to this SDK: 
 - node.js: [jdorner/node-sapnwrfc](https://github.com/jdorner/node-sapnwrfc)
 - ruby : [piersharding/ruby-sapnwrfc](https://github.com/piersharding/ruby-sapnwrfc)
 - php: [piersharding/php-sapnwrfc](https://github.com/piersharding/php-sapnwrfc)
 
 To compile this, you need to have the SDK installed.
 
 ## implemented features
 
It may be able to connect to your SAP system. It may delete all your data. It may eat your dogs homework. No warrenty.  

## open questions

When calling `RfcDestroyFunctionDesc` in the `impl Drop`, we receive an `RFC_ILLEGAL_STATE`. 
The docs state that this might happen if the function description is "stored in a repository cache". 
We could call `RfcRemoveFunctionDesc` to remove if from the cache and drop it afterwards, but maybe we don't even need 
to destroy it, since the process may need it again and we would benefit from the cache if we do not drop it. I don't know.  