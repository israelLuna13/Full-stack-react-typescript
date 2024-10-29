import request from 'supertest'
import server from '../../server'

describe('POST /api/auth/create-account', () => {
    
    //no le pasamos el objeto de producto para que ocurra un error y probar el error
    it('should display validation errors', async()=>{
        const response = await request(server).post('/api/auth/create-account').send({  })
        //probandos los errores
        //lo que se espera cuando ocurre un error
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('errors')
            expect(response.body.errors).toHaveLength(3)
    })
})



