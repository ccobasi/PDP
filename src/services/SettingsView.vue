import axios from 'axios'
import config from '../config/index';


const createIndustry = axios.create({
    baseURL: `${config.apiurl}/Settings/createIndustries`,
    json: true,
    method: 'POST'
})

const createProducts = axios.create({
    baseURL: `${config.apiurl}/Settings/createProducts`,
    json: true,
    method: 'POST'
})

const createLevels = axios.create({
    baseURL: `${config.apiurl}/Settings/createLevels`,
    json: true,
    method: 'POST'
})
const createLeadSource = axios.create({
    baseURL: `${config.apiurl}/Settings/createLeadSources`,
    json: true,
    method: 'POST'
})
const createDepartments = axios.create({
    baseURL: `${config.apiurl}/Settings/createDepartments`,
    json: true,
    method: 'POST'
})

const createBusinessUnits = axios.create({
    baseURL: `${config.apiurl}/Settings/createBusinessUnits`,
    json: true,
    method: 'POST'
})
const createUser = axios.create({
    baseURL: `${config.apiurl}/Settings/createUsers`,
    json: true,
    method: 'POST'
})

const createFinancialYearTargets = axios.create({
    baseURL: `${config.apiurl}/Settings/createFinancialYearTargets`,
    json: true,
    method: 'POST'
})

const createFinancialYears = axios.create({
    baseURL: `${config.apiurl}/Settings/createFinancialYears`,
    json: true,
    method: 'POST'
})

const createMPRTarget = axios.create({
    baseURL: `${config.apiurl}/settings/createMPRTargets`,
    json: true,
    method: 'POST'
})

const createMPRProspect = axios.create({
    baseURL: `${config.apiurl}/settings/createMPRProspects`,
    json: true,
    method: 'POST'
})

const createMPRPriorityDeal = axios.create({
    baseURL: `${config.apiurl}/settings/createMPRPriorityDeals`,
    json: true,
    method: 'POST'
})

export default {
    async getUserTypes() {
        try {
            let response = await fetch(`${config.apiurl}/Settings/getUserTypes`, {
            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },


    async getProducts() {
        try {
            let response = await fetch(`${config.apiurl}/Settings/getProducts/?id=1`, {
            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async getIndustries() {
        try {
            let response = await fetch(`${config.apiurl}/settings/getIndustries`, {
            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async getLevels() {
        try {
            let response = await fetch(`${config.apiurl}/settings/getLevels`, {
            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },


    async getBusinessUnits() {
        try {
            let response = await fetch(`${config.apiurl}/settings/getBusinessUnits`, {
            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async getDepartments() {
        try {
            let response = await fetch(`${config.apiurl}/settings/getDepartments`, {
            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async createRoles(name, description, userType) {
        return createRole({
            data: {
                name: name,
                description: description,
                userType: userType
            },
        }).then(req => {
            console.log(req.data)
            return req.data
        }).catch(err => console.log(err))
    },

    async createProduct(Description, lastModifiedBy) {
        return createProducts({
            data: {
                Description: Description,
                lastModifiedBy: lastModifiedBy,
            },
        }).then(req => {
            console.log(req.data)
            return req.data
        }).catch(err => console.log(err))
    },

    async createLevel(Description, lastModifiedBy) {
        return createLevels({
            data: {
                Description: Description,
                lastModifiedBy: lastModifiedBy,
            },
        }).then(req => {
            console.log(req.data)
            return req.data
        }).catch(err => console.log(err))
    },

    async createIndustries(Description, lastModifiedBy) {
        return createIndustry({
            data: {
                Description: Description,
                lastModifiedBy: lastModifiedBy,
            },
        }).then(req => {
            console.log(req.data)
            return req.data
        }).catch(err => console.log(err))
    },

    async createDepartment(DepartmentDescription, lastModifiedBy, ShortCode) {
        return createDepartments({
            data: {
                ShortCode: ShortCode,
                lastModifiedBy: lastModifiedBy,
                DepartmentDescription: DepartmentDescription
            },
        }).then(req => {
            console.log(req.data)
            return req.data
        }).catch(err => console.log(err))
    },

    async createBusinessUnit(BusinessUnitDescription, lastModifiedBy, ShortCode) {
        return createBusinessUnits({
            data: {
                ShortCode: ShortCode,
                lastModifiedBy: lastModifiedBy,
                BusinessUnitDescription: BusinessUnitDescription
            },
        }).then(req => {
            console.log(req.data)
            return req.data
        }).catch(err => console.log(err))
    },


    async createLeadSources(LeadSourceName, lastModifiedBy) {
        return createLeadSource({
            data: {
                LeadSourceName: LeadSourceName,
                lastModifiedBy: lastModifiedBy,
            },
        }).then(req => {
            console.log(req.data)
            return req.data
        }).catch(err => console.log(err))
    },

    async createFinancialYear(name, startingDate, endingDate, status, lastModifiedBy) {
        return createFinancialYears({
            data: {
                name: name,
                startingDate: startingDate,
                endingDate: endingDate,
                status: status,
                lastModifiedBy: lastModifiedBy,
            },
        }).then(req => {
            console.log(req.data)
            return req.data
        }).catch(err => console.log(err))
    },

    async createFinancialYearTarget(financialYearName, guaranteePipelineTarget, creditCommitteeApprovalTarget, feeLetterTarget, financialCloseTarget, originationMandatedTarget, lastModifiedBy) {
        return createFinancialYearTargets({
            data: {
                financialYearName: financialYearName,
                guaranteePipelineTarget: guaranteePipelineTarget,
                creditCommitteeApprovalTarget: creditCommitteeApprovalTarget,
                feeLetterTarget: feeLetterTarget,
                financialCloseTarget: financialCloseTarget,
                originationMandatedTarget: originationMandatedTarget,
                lastModifiedBy: lastModifiedBy,
            },
        }).then(req => {
            console.log(req.data)
            return req.data
        }).catch(err => console.log(err))
    },
    async editLeadSources(id, LeadSourceName, lastModifiedBy) {
        const response = await fetch(`${config.apiurl}/Settings/editleadsources/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                LeadSourceName: LeadSourceName,
                lastModifiedBy: lastModifiedBy,
                CreatedBy: lastModifiedBy
            })
        })
        const data = response.status;
        return data
    },

    async editFinancialYearTargets(id, financialYearName, guaranteePipelineTarget, creditCommitteeApprovalTarget, feeLetterTarget, financialCloseTarget, originationMandatedTarget, createdBy, lastModifiedBy, createdDateTime, lastModifiedDateTime) {
       console.log(originationMandatedTarget)
        const response = await fetch(`${config.apiurl}/Settings/editFinancialYearTargets/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                financialYearName: financialYearName,
                guaranteePipelineTarget: guaranteePipelineTarget,
                creditCommitteeApprovalTarget: creditCommitteeApprovalTarget,
                feeLetterTarget: feeLetterTarget,
                financialCloseTarget: financialCloseTarget,
                originationMandatedTarget: originationMandatedTarget,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                createdDateTime: createdDateTime,
                lastModifiedDateTime: lastModifiedDateTime
            })
        })
        const data = response.status;
        return data
    },

    async editFinancialYear(id, name, startingDate, endingDate, status, createdBy, lastModifiedBy, createdDateTime, lastModifiedDateTime) {
        const response = await fetch(`${config.apiurl}/Settings/editfinancialYears/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                name: name,
                startingDate: startingDate,
                endingDate: endingDate,
                status: status,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                createdDateTime: createdDateTime,
                lastModifiedDateTime: lastModifiedDateTime
            })
        })
        const data = response.status;
        return data
    },

    async editRoles(id, names, descr, userTypes) {
        const response = await  fetch(`${config.apiurl}/Settings/editRoles/?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                name: names,
                description: descr,
                userType: userTypes
            })
        })
        const data = response.status;
        return data
    },

    async deleteFinancialYearTargets(id) {
        try {
            await fetch(`${config.apiurl}/Settings/deleteFinancialYearTargets/${id}`, {
                method: 'DELETE'
            }).catch(err => console.log(err))
        }
        catch (err) {
            console.log(err)
        }
    },

    async deleteRoles(id) {
        try {
            await fetch(`${config.apiurl}/Settings/deleteRoles?id=${id}`, {
                method: 'DELETE'
            }).catch(err => console.log(err))
        }
        catch (err) {
            console.log(err)
        }
    },
    async getFinancialYears() {
        try {
            let response = await fetch(`${config.apiurl}/Settings/getFinancialYears`);
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },
    async getRegions() {
        try {
            let response = await fetch(`${config.apiurl}/Settings/getRegions`);
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },
    async getLeadSources() {
        try {
            let response = await fetch(`${config.apiurl}/Settings/getLeadSources`);
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },
    async getLoggedInUser(id) {
        try {
            let response = await fetch(`${config.apiurl}/Settings/getloginuserdetails/${id}`);
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async getFinancialYearTargets(id) {
        try {
            let response = await fetch(`${config.apiurl}/Settings/getFinancialYearTargets`);
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async createUsers(userId, userFullNames, roleId, jobTitle, phoneNumber, address, departmentId, businessUnitId) {
        return createUser({
            data: {
                userId: userId,
                userFullName: userFullNames,
                roleId: roleId,
                jobTitle: jobTitle,
                phoneNumber: phoneNumber,
                address: address,
                departmentId: departmentId,
                businessUnitId: businessUnitId
            },
        }).then(req => {
            return req.data
        }).catch(err => console.log(err));
    },

    async editProduct(id, Description, lastModifiedBy) {
        const response = await fetch(`${config.apiurl}/Settings/editProducts`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                Description: Description,
                lastModifiedBy: lastModifiedBy,
                CreatedBy: lastModifiedBy
            })
        })
        const data = response.status;
        return data
    },

    async editIndustry(id, Description, lastModifiedBy) {
        const response = await fetch(`${config.apiurl}/Settings/editIndustries`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                Description: Description,
                lastModifiedBy: lastModifiedBy,
                CreatedBy: lastModifiedBy
            })
        })
        const data = response.status;
        return data
    },

    async editLevel(id, Description, lastModifiedBy) {
        const response = await fetch(`${config.apiurl}/Settings/editLevels`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                Description: Description,
                lastModifiedBy: lastModifiedBy,
                CreatedBy: lastModifiedBy
            })
        })
        const data = response.status;
        return data
    },



async editDepartment(id, ShortCode, lastModifiedBy, DepartmentDescription) {
    const response = await fetch(`${config.apiurl}/Settings/editDepartments`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            ShortCode: ShortCode,
            departmentDescription: DepartmentDescription,
            CreatedBy: lastModifiedBy,
            lastModifiedBy: lastModifiedBy
        })
    })
    const data = response.status;
    return data
},


async editBusinessUnit(id, ShortCode, lastModifiedBy, BusinessUnitDescription) {
    const response = await fetch(`${config.apiurl}/Settings/editBusinessUnits`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            ShortCode: ShortCode,
            BusinessUnitDescription: BusinessUnitDescription,
            CreatedBy: lastModifiedBy,
            lastModifiedBy: lastModifiedBy
        })
    })
    const data = response.status;
    return data
},

    async getLoggedInUserRoles(id) {
        try {
            let response = await fetch(`${config.apiurl}/Settings/getLoginUserDetails/${id}`);
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async getServiceLine(id) {
        try {
            let response = await fetch(`${config.apiurl}/Settings/getservicelines/${id}`);
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async getMenus() {
        try {
            let response = await fetch(`${config.apiurl}/Settings/getmenus`);
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async createRoleMenus() {
        try {
            let response = await fetch(`${config.apiurl}/Settings/createrolemenus`);
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async deleteIndustry(id) {
        console.log(id)
        try {
            let response = await fetch(`${config.apiurl}/Settings/deleteIndustries/${id}`, { method: 'DELETE' });
            this.posts = response.status;
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async deleteLeadSource(id) {
        console.log(id)
        try {
            let response = await fetch(`${config.apiurl}/Settings/deleteLeadSource/${id}`, { method: 'DELETE' });
            this.posts = response.status;
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async deleteProducts(id) {
        console.log(id)
        try {
            let response = await fetch(`${config.apiurl}/Settings/deleteIndustries/${id}`, { method: 'DELETE' });
            this.posts = response.status;
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async deleteLevel(id) {
        console.log(id)
        try {
            let response = await fetch(`${config.apiurl}/Settings/deleteLevels/${id}`, { method: 'DELETE' });
            this.posts = response.status;
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async getRoleMenuPermissions(id) {
        try {
            let response = await fetch(`${config.apiurl}/Settings/getrolemenupermissions?id=${id}`);
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    
    async getMPRTargets() {
        try {
            let response = await fetch(`${config.apiurl}/settings/getMPRTargets`, {
            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },


    async createMPRTargets(recordOwner, percentageAchieved_Board, percentageAchieved_Mgt, targetAchieved_Board, targetAchieved_Mgt, individualTarget_Board, individualTarget_Mgt, 
        teamTargetSize_Board, teamTargetSize_Mgt, notes, createdBy, lastModifiedBy, createdDateTime, lastModifiedDateTime ) {
        return createMPRTarget({
            data: {
                recordOwner: recordOwner,
                percentageAchieved_Board: percentageAchieved_Board,
                percentageAchieved_Mgt: percentageAchieved_Mgt,
                targetAchieved_Board: targetAchieved_Board,
                targetAchieved_Mgt: targetAchieved_Mgt,
                individualTarget_Board: individualTarget_Board,
                individualTarget_Mgt: individualTarget_Mgt,
                teamTargetSize_Board: teamTargetSize_Board,
                teamTargetSize_Mgt: teamTargetSize_Mgt,
                notes: notes,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                createdDateTime: createdDateTime,
                lastModifiedDateTime: lastModifiedDateTime
            },
        }).then(req => {
            console.log(req.data)
            return req.data
        }).catch(err => console.log(err))
    },
    async editMPRTargets(id, recordOwner, percentageAchieved_Board, percentageAchieved_Mgt, targetAchieved_Board, targetAchieved_Mgt, individualTarget_Board, individualTarget_Mgt, 
        teamTargetSize_Board, teamTargetSize_Mgt, notes, createdBy, lastModifiedBy, createdDateTime, lastModifiedDateTime ) {
        const response = await fetch(`${config.apiurl}/settings/editMPRTargets`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                recordOwner: recordOwner,
                percentageAchieved_Board: percentageAchieved_Board,
                percentageAchieved_Mgt: percentageAchieved_Mgt,
                targetAchieved_Board: targetAchieved_Board,
                targetAchieved_Mgt: targetAchieved_Mgt,
                individualTarget_Board: individualTarget_Board,
                individualTarget_Mgt: individualTarget_Mgt,
                teamTargetSize_Board: teamTargetSize_Board,
                teamTargetSize_Mgt: teamTargetSize_Mgt,
                notes: notes,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                createdDateTime: createdDateTime,
                lastModifiedDateTime: lastModifiedDateTime
            })
        })
        const data = response.status;
        return data
    },

    async deleteMPRTargets(id) {
        try {
            await fetch(`${config.apiurl}/settings/deleteMPRTargets/${id}`, {
                method: 'DELETE'
            }).catch(err => console.log(err))
        }
        catch (err) {
            console.log(err)
        }
    },
    
    async getMPRProspects() {
        try {
            let response = await fetch(`${config.apiurl}/settings/getMPRProspects`, {
            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async createMPRProspects(recordOwner, companyName, expectedCloseDate, expectedDealSize, remarks, createdBy, lastModifiedBy, createdDateTime, lastModifiedDateTime ) {
        return createMPRProspect({
            data: {
                recordOwner: recordOwner,
                companyName: companyName,
                expectedCloseDate: expectedCloseDate,
                expectedDealSize: expectedDealSize,
                remarks: remarks,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                createdDateTime: createdDateTime,
                lastModifiedDateTime: lastModifiedDateTime
            },
        }).then(req => {
            console.log(req.data)
            return req.data
        }).catch(err => console.log(err))
    },

    async editMPRProspects(id, recordOwner, companyName, expectedCloseDate, expectedDealSize, remarks, createdBy, lastModifiedBy, createdDateTime, lastModifiedDateTime) {
        const response = await fetch(`${config.apiurl}/settings/editMPRProspects`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mprProspectId: id,
                recordOwner: recordOwner,
                companyName: companyName,
                expectedCloseDate: expectedCloseDate,
                expectedDealSize: expectedDealSize,
                remarks: remarks,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                createdDateTime: createdDateTime,
                lastModifiedDateTime: lastModifiedDateTime
            })
        })
        const data = response.status;
        return data
    },

    async deleteMPRProspects(id) {
        try {
            await fetch(`${config.apiurl}/settings/deleteMPRProspects/${id}`, {
                method: 'DELETE'
            }).catch(err => console.log(err))
        }
        catch (err) {
            console.log(err)
        }
    },

    async getMPRPriorityDeals() {
        try {
            let response = await fetch(`${config.apiurl}/settings/getMPRPriorityDeals`, {
            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async createMPRPriorityDeals(recordOwner, companyName, expectedCloseDate, expectedDealSize, remarks, createdBy, lastModifiedBy, createdDateTime, lastModifiedDateTime ) {
        return createMPRPriorityDeal({
            data: {
                recordOwner: recordOwner,
                companyName: companyName,
                expectedCloseDate: expectedCloseDate,
                expectedDealSize: expectedDealSize,
                remarks: remarks,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                createdDateTime: createdDateTime,
                lastModifiedDateTime: lastModifiedDateTime
            },
        }).then(req => {
            console.log(req.data)
            return req.data
        }).catch(err => console.log(err))
    },

    async editMPRPriorityDeals(id, recordOwner, companyName, expectedCloseDate, expectedDealSize, remarks, createdBy, lastModifiedBy, createdDateTime, lastModifiedDateTime) {
        const response = await fetch(`${config.apiurl}/settings/editMPRPriorityDeals`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                priorityDealId: id,
                recordOwner: recordOwner,
                companyName: companyName,
                expectedCloseDate: expectedCloseDate,
                expectedDealSize: expectedDealSize,
                remarks: remarks,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                createdDateTime: createdDateTime,
                lastModifiedDateTime: lastModifiedDateTime
            })
        })
        const data = response.status;
        return data
    },

    async deleteMPRPriorityDeals(id) {
        try {
            await fetch(`${config.apiurl}/settings/deleteMPRPriorityDeals/${id}`, {
                method: 'DELETE'
            }).catch(err => console.log(err))
        }
        catch (err) {
            console.log(err)
        }
    },
}