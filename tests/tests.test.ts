import supertest from "supertest"
import app from "../src/index"

const api = supertest(app);

describe("App tests", () => {
    
    it("GET /fruits", async () => {
        const result = await api.get("/fruits");
        
        expect(result.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                price: expect.any(Number)
            })
        ]))
    })

    it("POST /fruits it should return status 201 when body is correct", async () => {
        
        const body = {
            name: "maçã",
            price: 120
        }
        
        const resultado = await api.post('/fruits').send(body);

        expect(resultado.status).toEqual(201);

    })

    it("GET /fruits:id it should return 404 when fruit id doesn't exist", async  () => {
        const result = await api.get("/fruits/100")

        expect(result.status).toBe(404)
    })

    it("GET /fruits:id it should return 200 and the specif fuit", async  () => {
        const result = await api.get("/fruits/1")

        expect(result.status).toBe(200)
    })
    
})