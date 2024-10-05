import axios from 'axios'
import config from '../config/index';


const createRole = axios.create({
    baseURL: `${config.apiurl}/administrations/createroles`,
    json: true,
    method: 'POST'
})

const createUser = axios.create({
    baseURL: `${config.apiurl}/administrations/createUsers`,
    json: true,
    method: 'POST'
})


export default {
    async getUserTypes() {
        try {
            let response = await fetch(`${config.apiurl}/administrations/getUserTypes`, {
            });
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },


    async getRoles() {
        try {
            let response = await fetch(`${config.apiurl}/administrations/getRoles`, {

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

    async editRoles(id, names, descr, userTypes) {
        const response = await fetch(`${config.apiurl}/administrations/editRoles/?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                id: id,
                name: names,
                description: descr,
                userType: userTypes,
            })
        })
        const data = response.status;
        return data
    },

    async deleteRoles(id) {
        try {
            await fetch(`${config.apiurl}/administrations/deleteRoles?id=${id}`, {
                method: 'DELETE'
            }).catch(err => console.log(err))
        }
        catch (err) {
            console.log(err)
        }
    },


    async getUserRoles() {
        try {
            let response = await fetch(`${config.apiurl}/administrations/getuserroles`);
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async createUsers(userId, userFullNames, roleId, jobTitle, phoneNumber, address, departmentId, businessUnitId,
        levelId, feeLetterTarget, financialCloseTarget, originationTarget, guaranteePipelineTarget, mandateOriginatedTarget,
        creditCommitteeApprovalTarget, createdBy, lastModifiedBy) {
        return createUser({
            data: {
                userId: userId,
                userFullName: userFullNames,
                roleId: roleId,
                jobTitle: jobTitle,
                phoneNumber: phoneNumber,
                address: address,
                departmentId: departmentId,
                businessUnitId: businessUnitId,
                levelId: levelId,
                feeLetterTarget: feeLetterTarget,
                financialCloseTarget: financialCloseTarget,
                originationTarget: originationTarget,
                guaranteePipelineTarget: guaranteePipelineTarget,
                mandateOriginatedTarget: mandateOriginatedTarget,
                creditCommitteeApprovalTarget: creditCommitteeApprovalTarget,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy
            },
        }).then(req => {
            return req.data
        }).catch(err => { console.log(err); return err })


    },

    async editUser(userId, userFullNames, roleId, userStatus, jobTitle, phoneNumber, address, departmentId, businessUnitId,
        levelId, feeLetterTarget, financialCloseTarget, originationTarget, guaranteePipelineTarget, mandateOriginatedTarget,
        creditCommitteeApprovalTarget, createdBy, lastModifiedBy) {
        const response = await fetch(`${config.apiurl}/administrations/editUsers/?id=${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                userFullName: userFullNames,
                roleId: roleId,
                userStatus: userStatus,
                jobTitle: jobTitle,
                phoneNumber: phoneNumber,
                address: address,
                DepartmentId: departmentId,
                businessUnitId: businessUnitId,
                createdBy: createdBy,
                lastModifiedBy: lastModifiedBy,
                levelId: levelId,
                feeLetterTarget: feeLetterTarget,
                financialCloseTarget: financialCloseTarget,
                originationTarget: originationTarget,
                guaranteePipelineTarget: guaranteePipelineTarget,
                mandateOriginatedTarget: mandateOriginatedTarget,
                creditCommitteeApprovalTarget: creditCommitteeApprovalTarget
            })
        })
        const data = response.status;
        console.log(data)
        return data
    },

    async getLoggedInUser(id) {
        try {
            let response = await fetch(`${config.apiurl}/administrations/getLoginUserDetails/${id}`);
            this.posts = await response.json();
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },

    async deleteUsers(id) {
        try {
            let response = await fetch(`${config.apiurl}/administrations/deleteUsers/${id}`, { method: 'DELETE' });
            this.posts = response.status;
            return this.posts
        } catch (error) {
            console.log(error)
        }
    },
}