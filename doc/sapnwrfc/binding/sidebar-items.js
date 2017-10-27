initSidebarItems({"enum":[["_RFCTYPE","_RFCTYPE"],["_RFC_CALL_TYPE","_RFC_CALL_TYPE"],["_RFC_CLASS_ATTRIBUTE_TYPE","_RFC_CLASS_ATTRIBUTE_TYPE"],["_RFC_DIRECTION","_RFC_DIRECTION"],["_RFC_ERROR_GROUP","_RFC_ERROR_GROUP"],["_RFC_METADATA_OBJ_TYPE","_RFC_METADATA_OBJ_TYPE"],["_RFC_RC","_RFC_RC"],["_RFC_UNIT_STATE","_RFC_UNIT_STATE"]],"fn":[["RfcAddClassAttribute","Adds a new attribute (field, structure, table, method) to the class description."],["RfcAddClassDesc","Adds a class description to the cache for the specified R/3 System."],["RfcAddException","Adds a new ABAP Exception to the function description."],["RfcAddFunctionDesc","Adds a function description to the cache for the specified R/3 System."],["RfcAddImplementedInterface","Adds an interface to the list of implemented interfaces of the given class."],["RfcAddParameter","Adds a new parameter (IMPORTING, EXPORTING, CHANGING, TABLES) to the function description."],["RfcAddParentClass","Sets the parent classes of the given class."],["RfcAddTypeDesc","Adds a type description to the cache."],["RfcAddTypeField","Adds a new field to the type description."],["RfcAppendNewRow","Appends a new empty row at the end of the table and moves the table cursor to that row."],["RfcAppendNewRows","Appends a set of new empty rows at the end of the table and moves the table cursor to the first new row."],["RfcAppendRow","Appends an existing row to the end of the table and moves the table cursor to that row."],["RfcCloneStructure","Clones a sructure including the data in it."],["RfcCloneTable","Clones a table including all the data in it. (Use with care...)"],["RfcCloseConnection","Closes an RFC connection"],["RfcConfirmTransaction","Removes the TID contained in the RFC_TRANSACTION_HANDLE from the backend's ARFCRSTATE table."],["RfcConfirmUnit","Removes the UID from the backend's status management."],["RfcCreateAbapObject","Creates an ABAP object handle with the given class description handle."],["RfcCreateClassDesc","Creates an empty class description with the given name."],["RfcCreateFunction","Creates a data container that can be used to execute function calls in the backend via RfcInvoke()."],["RfcCreateFunctionDesc","Creates an empty function description with the given name."],["RfcCreateMetadataQueryResult","Creates the metadata query result"],["RfcCreateStructure","Creates a data container for a structure."],["RfcCreateTable","Creates a data container for a table."],["RfcCreateTransaction","Creates a container for executing a (multi-step) transactional call."],["RfcCreateTypeDesc","Creates an empty type description with the given name."],["RfcCreateUnit","Create a bgRFC unit."],["RfcDeleteAllRows","Deletes all rows from the table."],["RfcDeleteCurrentRow","Deletes the row, on which the table cursor is currently positioned."],["RfcDescribeAbapObject","Returns the metadata description of the given ABAP object handle."],["RfcDescribeFunction","Returns the metadata description for the given function module."],["RfcDescribeMetadataQueryResult","Describes the metadata query result"],["RfcDescribeType","Returns the metadata description of the given structure or table (RFC_STRUCTURE_HANDLE or RFC_TABLE_HANDLE)."],["RfcDestroyAbapObject","Destroys an ABAP object handle."],["RfcDestroyClassDesc","Deletes the class description and releases the allocated resources."],["RfcDestroyFunction","Releases all memory used by the data container."],["RfcDestroyFunctionDesc","Deletes the function description and releases the allocated resources."],["RfcDestroyMetadataQueryResult","Destroys the metadata query result"],["RfcDestroyStructure","Releases all memory for a particular structure"],["RfcDestroyTable","Releases the memory of a table and all its lines."],["RfcDestroyTransaction","Releases the memory of the transaction container."],["RfcDestroyTypeDesc","Deletes the type description and releases the allocated resources."],["RfcDestroyUnit","Releases the memory of the bgRFC unit container."],["RfcEnableAbapClassException","Enables this function handle for ABAP class exception support."],["RfcEnableBASXML","Enables this function module for the basXML serialization format."],["RfcGetAbapClassException","Gets the ABAP exception object handle from the given function handle."],["RfcGetAbapObject","Returns a handle to an abap object."],["RfcGetAbapObjectByIndex","Returns a handle to an abap object."],["RfcGetBytes","Returns the value of the specified field as byte array."],["RfcGetBytesByIndex","Returns the value of the specified field as byte array."],["RfcGetCachedClassDesc","Looks for a cached class description."],["RfcGetCachedFunctionDesc","Looks for a cached function description."],["RfcGetCachedTypeDesc","Looks for a cached structure/table description."],["RfcGetChars","Returns the value of the specified field as char array."],["RfcGetCharsByIndex","Returns the value of the specified field as char array."],["RfcGetClassAttributeDescByIndex","Reads the metadata description of the class attribute."],["RfcGetClassAttributeDescByName","Reads the metadata description of a class attribute given by name."],["RfcGetClassAttributesCount","Returns the number of parameters in the function module definition."],["RfcGetClassDesc","Returns the class description that is valid for the system to which rfcHandle points to."],["RfcGetClassName","Returns the class's DDIC name."],["RfcGetConnectionAttributes","Returns details about the current client or server connection."],["RfcGetCurrentRow","Returns the table row, on which the \"table cursor\" is currently positioned."],["RfcGetDate","Reads a DATE field."],["RfcGetDateByIndex","Reads a DATE field."],["RfcGetDecF16","Returns the field as an 8 byte IEEE 754r decimal floating point."],["RfcGetDecF16ByIndex","Returns the field as an 8 byte IEEE 754r decimal floating point."],["RfcGetDecF34","Returns the field as a 16 byte IEEE 754r decimal floating point."],["RfcGetDecF34ByIndex","Returns the field as a 16 byte IEEE 754r decimal floating point."],["RfcGetDirectionAsString","Converts an RFC_DIRECTION direction indicator to a human readable string for logging purposes."],["RfcGetExceptionCount","Returns the number of ABAP Exceptions of the function module."],["RfcGetExceptionDescByIndex","Reads the metadata description of the function module's ith ABAP Exception."],["RfcGetExceptionDescByName","Reads the metadata description of a function module's ABAP Exception given by name."],["RfcGetFieldCount","Returns the number of fields in a structure definition."],["RfcGetFieldDescByIndex","Reads the field description of the structure's ith field."],["RfcGetFieldDescByName","Reads the field description of a field given by name."],["RfcGetFloat","Returns the value of the given field as an RFC_FLOAT."],["RfcGetFloatByIndex","Returns the value of the given field as an RFC_FLOAT."],["RfcGetFunctionDesc","Returns the function description that is valid for the system to which rfcHandle points to."],["RfcGetFunctionName","Returns a function module's DDIC name."],["RfcGetImplementedInterfaceByIndex","Returns the implemented interfaces of the given class."],["RfcGetImplementedInterfacesCount","Returns the number of parent interfaces of the given class."],["RfcGetInt","Returns the value of the specified field as RFC_INT (signed)."],["RfcGetInt1","Returns the value of a field as an unsigned one byte integer."],["RfcGetInt1ByIndex","Returns the value of a field as an unsigned one byte integer."],["RfcGetInt2","Returns the field value as a signed two byte integer."],["RfcGetInt2ByIndex","Returns the field value as a signed two byte integer."],["RfcGetIntByIndex","Returns the value of the specified field as RFC_INT (signed)."],["RfcGetMetadataQueryFailedEntry","Returns the error entry from the metadata query result"],["RfcGetMetadataQuerySucceededEntry","Returns a succeeded entry from the metadata query result"],["RfcGetNum","Returns the value of the specified field as num-char array (digits only)."],["RfcGetNumByIndex","Returns the value of the specified field as num-char array (digits only)."],["RfcGetParameterCount","Returns the number of parameters in the function module definition."],["RfcGetParameterDescByIndex","Reads the metadata description of the function module's ith parameter."],["RfcGetParameterDescByName","Reads the metadata description of a function module parameter given by name."],["RfcGetParentClassByIndex","Returns the parent classes of the given class."],["RfcGetParentClassesCount","Returns the number of parent classes of the given class."],["RfcGetPartnerSNCKey","Gets partner's SNC key, if any."],["RfcGetPartnerSNCName","Gets the partner's SNC name, if any."],["RfcGetPartnerSSOTicket","Gets the partner's SSO2 ticket, if any."],["RfcGetRcAsString","Converts an RFC_RC return code to a human readable string for logging purposes."],["RfcGetRowCount","Returns the number of rows in a table."],["RfcGetRowType","Returns a type description handle describing the line type (metadata) of this table."],["RfcGetServerContext","Inside a server function, returns details about the current execution context."],["RfcGetString","Returns the value of the specified field as null-terminated string."],["RfcGetStringByIndex","Returns the value of the specified field as null-terminated string."],["RfcGetStringLength","Returns the length of the value of a STRING or XSTRING parameter."],["RfcGetStringLengthByIndex","Returns the length of the value of a STRING or XSTRING parameter."],["RfcGetStructure","Returns a handle to a structure."],["RfcGetStructureByIndex","Returns a handle to a structure."],["RfcGetTable","Returns a handle to a table."],["RfcGetTableByIndex","Returns a handle to a table."],["RfcGetTime","Reads a TIME field."],["RfcGetTimeByIndex","Reads a TIME field."],["RfcGetTransactionID","Retrieves a unique 24-digit transaction ID from the backend."],["RfcGetTypeAsString","Converts an RFCTYPE data type indicator to a human readable string for logging purposes."],["RfcGetTypeDesc","Returns the structure description that is valid for the system to which rfcHandle points to."],["RfcGetTypeLength","Returns the total byte length of a structure definition."],["RfcGetTypeName","Returns the name of the type."],["RfcGetUnitID","Create a 32 digit bgRFC unit ID."],["RfcGetUnitState","Retrieves the processing status of the given background unit from the backend system's status management."],["RfcGetVersion","Get information about currently loaded sapnwrfc library."],["RfcGetXString","Returns the value of the specified field as byte array."],["RfcGetXStringByIndex","Returns the value of the specified field as byte array."],["RfcInit","Initialization of internal variables"],["RfcInsertNewRow","Inserts a new empty row at the current position of the table cursor."],["RfcInsertRow","Inserts an existing row at the current position of the table cursor."],["RfcInstallAuthorizationCheckHandler","Installs an optional callback function for performing authorization checks on incoming function calls."],["RfcInstallBgRfcHandlers","Installs the necessary callback functions for processing incoming bgRFC calls."],["RfcInstallGenericServerFunction","Installs a generic callback function of type RFC_SERVER_FUNCTION together with a callback function of type RFC_FUNC_DESC_CALLBACK for obtaining the metadata description of unknown function modules."],["RfcInstallPassportManager","Installs the necessary callback functions for processing Extended Passport (EPP) events."],["RfcInstallPasswordChangeHandler","Installs an optional callback function for processing password change events."],["RfcInstallServerFunction","Installs a callback function of type RFC_SERVER_FUNCTION, which will be triggered when a request for the function module corresponding to funcDescHandle comes in from the R/3 system corresponding to sysId."],["RfcInstallTransactionHandlers","Installs the necessary callback functions for processing incoming tRFC/qRFC calls."],["RfcInvoke","Executes a function module in the backend system."],["RfcInvokeInTransaction","Adds a function module call to a transaction. Can be used multiple times on one tHandle."],["RfcInvokeInUnit","Adds a function module to a bgRFC unit."],["RfcIsAbapClassExceptionEnabled","Checks whether this function handle has been enabled for ABAP class exception support."],["RfcIsBASXMLSupported","Returns whether this function module has been enabled for basXML."],["RfcIsConnectionHandleValid","Checks an RFC connection"],["RfcIsParameterActive","Query whether a parameter is active."],["RfcLanguageIsoToSap","Converts a 2-char SAP language code to the 1-char SAP language code."],["RfcLanguageSapToIso","Converts a 1-char SAP language key to the 2-char SAP language code."],["RfcListenAndDispatch","Listens on a server connection handle and waits for incoming RFC calls from the R/3 system."],["RfcMetadataBatchQuery","Queries the meta data for function, type and class lists."],["RfcMoveTo","Sets the table cursor to a specific index."],["RfcMoveToFirstRow","Positions the table cursor at the first row (or at index \"-1\", if the table is empty)."],["RfcMoveToLastRow","Positions the table cursor at the last row (or at index \"-1\", if the table is empty)."],["RfcMoveToNextRow","Increments the table cursor by one."],["RfcMoveToPreviousRow","Decrements the table cursor by one."],["RfcOpenConnection","Opens an RFC client connection for invoking ABAP function modules in an R/3 backend."],["RfcPing","Ping the remote communication partner through the passed connection handle."],["RfcRegisterServer","Registers a server connection at an SAP gateway."],["RfcReloadIniFile","Loads the contents of the sapnwrfc.ini file into memory."],["RfcRemoveClassDesc","Removes a class description from the cache for the specified R/3 System."],["RfcRemoveFunctionDesc","Removes a function description from the cache for the specified R/3 System."],["RfcRemoveTypeDesc","Removes a type description from the cache."],["RfcResetServerContext","RFC_RC SAP_API RfcResetServerContext"],["RfcSAPUCToUTF8","Converts data in SAP_UC format to UTF-8 format"],["RfcSNCKeyToName","Converts SNC key to SNC name."],["RfcSNCNameToKey","Converts SNC name to SNC key."],["RfcSetAbapClassException","Sets the ABAP exception object handle to the given function handle."],["RfcSetAbapObject","Copies the object into the target object of the parent container."],["RfcSetAbapObjectByIndex","Copies the object into the target object of the parent container."],["RfcSetBytes","Sets the given byte value (byteValue/valueLength) into the field."],["RfcSetBytesByIndex","Sets the given byte value (byteValue/valueLength) into the field."],["RfcSetChars","Sets the given char value (charValue/valueLength) into the field."],["RfcSetCharsByIndex","Sets the given char value (charValue/valueLength) into the field."],["RfcSetDate","Sets the value of a DATE field."],["RfcSetDateByIndex","Sets the value of a DATE field."],["RfcSetDecF16","Sets the value of an 8 byte decfloat object into a field."],["RfcSetDecF16ByIndex","Sets the value of an 8 byte decfloat object into a field."],["RfcSetDecF34","Sets the value of a 16 byte decfloat object into a field."],["RfcSetDecF34ByIndex","Sets the value of a 16 byte decfloat object into a field."],["RfcSetFloat","Sets a floating point field."],["RfcSetFloatByIndex","Sets a floating point field."],["RfcSetIniPath","Sets the directory in which to search for the sapnwrfc.ini file."],["RfcSetInt","Sets the value of an INT4 field."],["RfcSetInt1","Sets the value of an INT1 field."],["RfcSetInt1ByIndex","Sets the value of an INT1 field."],["RfcSetInt2","Sets the value of an INT2 field."],["RfcSetInt2ByIndex","Sets the value of an INT2 field."],["RfcSetIntByIndex","Sets the value of an INT4 field."],["RfcSetNum","Sets the value of a NUMC field."],["RfcSetNumByIndex","Sets the value of a NUMC field."],["RfcSetParameterActive","Allows to deactivate certain parameters in the function module interface."],["RfcSetString","Sets the given string value (stringValue/valueLength) into the field."],["RfcSetStringByIndex","Sets the given string value (stringValue/valueLength) into the field."],["RfcSetStructure","Copies the given structure into the target structure of the parent container."],["RfcSetStructureByIndex","Copies the given structure into the target structure of the parent container."],["RfcSetTable","Copies the given table into the target table of the parent container."],["RfcSetTableByIndex","Copies the given table into the target table of the parent container."],["RfcSetTime","Sets the value of a TIME field."],["RfcSetTimeByIndex","Sets the value of a TIME field."],["RfcSetTraceDir","Changes the directory where the NW RFC lib should write trace files."],["RfcSetTraceEncoding","Changes the character encoding to be used in trace files."],["RfcSetTraceLevel","Sets the current trace level of the specified RFC connection or destination to the new value."],["RfcSetTraceType","Changes the way the NW RFC lib writes trace files."],["RfcSetTypeLength","Sets the total byte length of the type description."],["RfcSetXString","Sets the given byte value (byteValue/valueLength) into the field."],["RfcSetXStringByIndex","Sets the given byte value (byteValue/valueLength) into the field."],["RfcStartServer","Allows a program to be used as an RFC server which is started by the backend on demand."],["RfcSubmitTransaction","Executes the entire LUW in the backend system as an \"atomic unit\"."],["RfcSubmitUnit","Executes a bgRFC unit in the backend."],["RfcUTF8ToSAPUC","Converts data in UTF-8 format to SAP_UC strings."]],"struct":[["RFC_DATA_CONTAINER","RFC_DATA_CONTAINER"],["_RFC_ATTRIBUTES","_RFC_ATTRIBUTES"],["_RFC_CLASS_ATTRIBUTE_DESC","_RFC_CLASS_ATTRIBUTE_DESC"],["_RFC_CLASS_DESC_HANDLE","_RFC_CLASS_DESC_HANDLE"],["_RFC_CONNECTION_HANDLE","_RFC_CONNECTION_HANDLE"],["_RFC_CONNECTION_PARAMETER","_RFC_CONNECTION_PARAMETER"],["_RFC_ERROR_INFO","_RFC_ERROR_INFO"],["_RFC_EXCEPTION_DESC","_RFC_EXCEPTION_DESC"],["_RFC_FIELD_DESC","_RFC_FIELD_DESC"],["_RFC_FUNCTION_DESC_HANDLE","_RFC_FUNCTION_DESC_HANDLE"],["_RFC_METADATA_QUERY_RESULT_ENTRY","_RFC_METADATA_QUERY_RESULT_ENTRY"],["_RFC_PARAMETER_DESC","_RFC_PARAMETER_DESC"],["_RFC_SECURITY_ATTRIBUTES","_RFC_SECURITY_ATTRIBUTES"],["_RFC_SERVER_CONTEXT","_RFC_SERVER_CONTEXT"],["_RFC_TRANSACTION_HANDLE","_RFC_TRANSACTION_HANDLE"],["_RFC_TYPE_DESC_HANDLE","_RFC_TYPE_DESC_HANDLE"],["_RFC_UNIT_ATTRIBUTES","_RFC_UNIT_ATTRIBUTES"],["_RFC_UNIT_HANDLE","_RFC_UNIT_HANDLE"],["_RFC_UNIT_IDENTIFIER","_RFC_UNIT_IDENTIFIER"]],"type":[["DATA_CONTAINER_HANDLE",""],["RFC_ABAP_NAME",""],["RFC_ABAP_OBJECT_HANDLE","RFC_ABAP_OBJECT_HANDLE"],["RFC_ATTRIBUTES",""],["RFC_BYTE",""],["RFC_CHAR",""],["RFC_CLASS_ATTRIBUTE_DEFVALUE",""],["RFC_CLASS_ATTRIBUTE_DESC",""],["RFC_CLASS_ATTRIBUTE_DESCRIPTION",""],["RFC_CLASS_DESC_HANDLE",""],["RFC_CLASS_NAME",""],["RFC_CONNECTION_HANDLE",""],["RFC_CONNECTION_PARAMETER",""],["RFC_DATE",""],["RFC_DECF16",""],["RFC_DECF34",""],["RFC_ERROR_INFO",""],["RFC_EXCEPTION_DESC",""],["RFC_FIELD_DESC",""],["RFC_FLOAT",""],["RFC_FUNCTION_DESC_HANDLE",""],["RFC_FUNCTION_HANDLE","RFC_FUNCTION_HANDLE"],["RFC_FUNC_DESC_CALLBACK",""],["RFC_INT",""],["RFC_INT1",""],["RFC_INT2",""],["RFC_METADATA_QUERY_RESULT_ENTRY",""],["RFC_METADATA_QUERY_RESULT_HANDLE",""],["RFC_NUM",""],["RFC_ON_AUTHORIZATION_CHECK",""],["RFC_ON_CHECK_TRANSACTION",""],["RFC_ON_CHECK_UNIT",""],["RFC_ON_COMMIT_TRANSACTION",""],["RFC_ON_COMMIT_UNIT",""],["RFC_ON_CONFIRM_TRANSACTION",""],["RFC_ON_CONFIRM_UNIT",""],["RFC_ON_GET_UNIT_STATE",""],["RFC_ON_PASSWORD_CHANGE",""],["RFC_ON_ROLLBACK_TRANSACTION",""],["RFC_ON_ROLLBACK_UNIT",""],["RFC_PARAMETER_DEFVALUE",""],["RFC_PARAMETER_DESC",""],["RFC_PARAMETER_TEXT",""],["RFC_PM_CALLBACK",""],["RFC_SECURITY_ATTRIBUTES",""],["RFC_SERVER_CONTEXT",""],["RFC_SERVER_FUNCTION",""],["RFC_STRUCTURE_HANDLE","RFC_STRUCTURE_HANDLE"],["RFC_TABLE_HANDLE","RFC_TABLE_HANDLE"],["RFC_TID",""],["RFC_TIME",""],["RFC_TRANSACTION_HANDLE",""],["RFC_TYPE_DESC_HANDLE",""],["RFC_UNITID",""],["RFC_UNIT_ATTRIBUTES",""],["RFC_UNIT_HANDLE",""],["RFC_UNIT_IDENTIFIER",""],["SAP_DOUBLE",""],["SAP_RAW",""],["SAP_UC",""]],"union":[["DecFloat16",""],["DecFloat34",""],["SAP_MAX_ALIGN_T",""]]});