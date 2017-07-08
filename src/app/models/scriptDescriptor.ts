
/**
 * List entry for a saved script. All scriptDescriptors are intended to be saved in a
 * single collection "roboScriptList" together as pointers to the different saved script
 * objects.
 */
export class scriptDescriptor {
  storeageKey: string;
  scriptName: string;
}
