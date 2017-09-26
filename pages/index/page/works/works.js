var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    rankNum: [
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAAAhCAYAAABZTbwAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjcwRjRCNDFCOTNCOTExRTdBN0RBRDYwMDQ2Mzc2OEJCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjcwRjRCNDFDOTNCOTExRTdBN0RBRDYwMDQ2Mzc2OEJCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzBGNEI0MTk5M0I5MTFFN0E3REFENjAwNDYzNzY4QkIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzBGNEI0MUE5M0I5MTFFN0E3REFENjAwNDYzNzY4QkIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5HCL8JAAAGW0lEQVR42uxa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",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF8AAAAhCAYAAAC/ZHdEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjcwODBCQUU4OTNCOTExRTc5RjRCRTNCQ0IwQjMwRDk0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjcwODBCQUU5OTNCOTExRTc5RjRCRTNCQ0IwQjMwRDk0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzA4MEJBRTY5M0I5MTFFNzlGNEJFM0JDQjBCMzBEOTQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzA4MEJBRTc5M0I5MTFFNzlGNEJFM0JDQjBCMzBEOTQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5svuFVAAAFBklEQVR42uxaTWgTQRTeiLdqIR6qB6EQoTeh0pvgoTGH4kkKkdxThLiCoJEKJSeN1NIIHtzSsrlrehYqKfaUm0XjRVBSEHqphwZLeo4z2Vk33b43O292Nl468EzdZGfnffPme3+bss5GrNHv97XvPXcG3/8fDt9EQBziPNNM1g3M4488k0Umn5H1+XPz34yPGLMckyqTQ2RdDX9d/HRAEpweQAreJGXCgta3gHmy3jwZwjz8mZ0Ku89l0kHWx6UhfiMUXhcGkOSYZ9K0xXN7yLpaJ9flkME/8G5kuluTIwJ/oFhNPLtPlK3gWU5CJ6HK528T11UbWpMy+L5lEWgjDvhaikHiJnMKygWJpSuuySGBT6QfXfCVFPMpxlXYpK1gAyYNAJ+ekpzGnuK6KgJHEvgE+tEBfz4rUYwrY592rlyallDY0KmVjUUXAV0Aeiic72BdBcRP+TiSwCcoogN+sy0/qk3hC6DBed3JSpxyhR40QKNzgDNCFXCkReykiPXkSeAr0g8V/HINeZZNc5xFHo525KdWd2SyElqThJGgbsKIl8ngK9APFXzQolw9uihmEb8hoo37urlGRTKnBPzITUMz3D3g2oSXOWQEt8VOUph1ZyZCF4+ZrHh/LhHnq3+yrJfvgC/ueh+64O/95JOH5IP33bbkvu6+cokC2KEGnX4olr/ckBzLOFFJ30yiNzxmhhy9Lxm/toNY/kxBl3bE8QBpQUI/FPBBjvYdUowT1WglMy9aWEPAB41r2OFGFda2HyVHP5nLwMX30cc5aux+By5eDyw48ZFKpWaZwS3eidAvsqrJOHRtE6l4sWNV0gzjOD2kxwC+/8G40vJEd3T/IDEpf+4IgOePKj1n/4T1++jpt8GsvqtaUn51jzmd38AXb7yPkkYWmb4KXDwW4MXUfw8KFi6OCHxONyxay9/EA4k1Sj3/F78hQfoZybgwAvCZ1TssBC0VIQtmwqMxZvVfqc2UVU4/dYR+bH36SWKkLwEXe2ZOFUo1PvCPoRiYCaOhNQb8knKoKQpTw7SJZpFT4veK0Q4YEvaCOonxOgygj6kxKHG40QW+U00VShvxiNPPEkI/L4hOkTvW49DFMc+Jp2NGJWmoHrGP545xxiwT10WohjvYOeZgLc/qj0hJFmIp6C7b4j7FOB+Mx0VpIY4PSSp/ALttLYWeArmNKAFfSj8tdfBBemgHlUytFp+N0JmgRVMO1ylIyuAu0rkyAf6giFUgdHEQ8Ae838MrmmUN7gXL04b53rGjGyaRwMcBX0o/hLoK6KCHHHiRAoorL0/nTABfk3SzbEmz3DT4KP0QwJ/GysCdYAPKChaPWqNBq0eBPwh0rKoCHxd8ZfqJqChWKxKl7MAHhN/N+ffejCu5X2xg3EY6quewkVCANwG+Ev0olHOlc7RPvgMzkKj3ZnrRnbdxC35ZDHrrISq/oUjH3ygT4EfSjwL44xQfotJx8/urBpKxfMXQusJNdBPvaqLJF3GOZwtsnocxMyGe2NzyqrFPNbph0MjPJVQHMfWibB2r/RA34MFby1q4Zlm7r9l/vlEWwOS2yChZ9nyD16MM6Za5khD458UnB64ULmUSmxrccv0SM5Tadwk41p94PVeekeYqkpr1ilcj90u1q4SDs/tFPCxC780dy5rZMYv7xqAgN8S5YdC4EpsaiU4JeVicimJe4jPizJ0D6khhvTGd4oxBreevAAMA8/dNmCKNbAAAAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAAAjCAYAAAAZm21MAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjcwMEREMzI5OTNCOTExRTc5MjIxRDcwQjQwNzkxNzhDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjcwMEREMzJBOTNCOTExRTc5MjIxRDcwQjQwNzkxNzhDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzAwREQzMjc5M0I5MTFFNzkyMjFENzBCNDA3OTE3OEMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzAwREQzMjg5M0I5MTFFNzkyMjFENzBCNDA3OTE3OEMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6IjOKiAAAIqklEQVR42uxa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",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF0AAAAjCAYAAAD2WQZyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZGOUREMUE1OTNCOTExRTc4NkY4OEJBMjQzNzI0NDA3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjZGOUREMUE2OTNCOTExRTc4NkY4OEJBMjQzNzI0NDA3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NkY5REQxQTM5M0I5MTFFNzg2Rjg4QkEyNDM3MjQ0MDciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NkY5REQxQTQ5M0I5MTFFNzg2Rjg4QkEyNDM3MjQ0MDciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6m4attAAAHN0lEQVR42uxb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",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAAAjCAYAAAAZm21MAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZGMDJFRUYxOTNCOTExRTdCMEM5RTNFQTAyNjA5Rjk5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjZGMDJFRUYyOTNCOTExRTdCMEM5RTNFQTAyNjA5Rjk5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NkYwMkVFRUY5M0I5MTFFN0IwQzlFM0VBMDI2MDlGOTkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NkYwMkVFRjA5M0I5MTFFN0IwQzlFM0VBMDI2MDlGOTkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz63FaJuAAAIVklEQVR42uxa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",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAAAjCAYAAAAZm21MAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc2MUQ0NjUxOTNCOTExRTdBMUY4RENGOThCNzNDNTE0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc2MUQ0NjUyOTNCOTExRTdBMUY4RENGOThCNzNDNTE0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzYxRDQ2NEY5M0I5MTFFN0ExRjhEQ0Y5OEI3M0M1MTQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzYxRDQ2NTA5M0I5MTFFN0ExRjhEQ0Y5OEI3M0M1MTQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7bBitYAAAIiklEQVR42uxa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"
      ],
    personList:[]
  },
  onLoad(option){
    this.setData({
      otherRoomId: option.room_id
    })
  },
  onReady(){
    var room_id = app.globalData.room_id;
    var that = this; 
    if (this.data.otherRoomId) {
      wx.showLoading({
        title: '加载中',
        success: function () {
          wx.request({
            url: app.globalData.url + '/Home/Rooms/getRoomResult?room_id=' + that.data.otherRoomId,
            data: {},
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log(res);
              that.setData({
                personList: res.data.data
              })
              wx.hideLoading();
            },
            fail: function (res) {
              console.log(res);
            }
          })
        }
      })
    }else{
      wx.showLoading({
        title: '加载中',
        success: function () {
          wx.request({
            url: app.globalData.url + '/Home/Rooms/getRoomResult?room_id=' + room_id,
            data: {},
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log(res);
              that.setData({
                personList: res.data.data
              })
              wx.hideLoading();
            },
            fail: function (res) {
              console.log(res);
            }
          })
        }
      })
    }
  },
  go_again(){
    wx.reLaunch({ //redirectTo  onUnload
      url: '../../index'
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return{
      title:"我画你猜赢红包",
      path: "/pages/index/page/works/works?room_id="+ app.globalData.room_id,
      success(){
        console.log("分享成功");
      }
    }
  }
})