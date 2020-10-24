function queryChildMenus(result){
  let cloneData = JSON.parse(JSON.stringify(result))
  return cloneData.filter(father=>{
    let branchArr = cloneData.filter(child=> father._id == child.parent_id)
    branchArr.length>0?father.children = branchArr : [];
    return father.parent_id == 0
  })
}
module.exports = queryChildMenus