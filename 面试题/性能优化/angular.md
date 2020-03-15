# angular脏检测机制

ViewRef_
const Services = {
    checkAndUpdateView: ƒ debugCheckAndUpdateView(view)
    checkNoChangesView: ƒ debugCheckNoChangesView(view)
    clearOverrides: ƒ debugClearOverrides()
    createComponentView: ƒ debugCreateComponentView(parentView, nodeDef, viewDef$$1, hostElement)
    createDebugContext: ƒ (view, nodeIndex)
    createEmbeddedView: ƒ debugCreateEmbeddedView(parentView, anchorDef, viewDef$$1, context)
    createNgModuleRef: ƒ debugCreateNgModuleRef(moduleType, parentInjector, bootstrapComponents, def)
    createRootView: ƒ debugCreateRootView(elInjector, projectableNodes, rootSelectorOrNode, def, ngModule, context)
    destroyView: ƒ debugDestroyView(view)
    dirtyParentQueries: ƒ dirtyParentQueries(view)
    handleEvent: ƒ debugHandleEvent(view, nodeIndex, eventName, event)
    overrideComponentView: ƒ debugOverrideComponentView(comp, compFactory)
    overrideProvider: ƒ debugOverrideProvider(override)
    resolveDep: ƒ resolveDep(view, elDef, allowPrivateServices, depDef, notFoundValue)
    setCurrentNode: ƒ debugSetCurrentNode(view, nodeIndex)
    updateDirectives: ƒ debugUpdateDirectives(view, checkType)
    updateRenderer: ƒ debugUpdateRenderer(view, checkType)
}

enum ChangeDetectionStrategy{
    OnPush: 0	//标记检测
    异步情况的检测要 cdr.detectChanges markForCheck  标记或手动触发
    Default: 1 //always检测
}


修改数据时，需手动调用检测刷新试图
, 通过事件修改数据会自动刷新试图
