/*!
 * Melisa Sencha
 * Copyright (c) 2017 Melisa Company
 * 2017-06-11 05:06:26
 */
Ext.define("Melisa.view.universal.dashboard.WrapperModel",{extend:"Ext.app.ViewModel",alias:"viewmodel.appmainmodel",data:{appName:"Melisa Panel",identityName:"Luis Heredia",moduleActive:{title:null},route:"home"},stores:{applications:{},menuMain:{type:"tree",proxy:{type:"memory"},root:{expanded:!0}}},formulas:{showclosemodule:function(a){return!a("moduleActive.title")}}});