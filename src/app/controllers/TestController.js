class TestController {
  async index(req, res) {
    return res.status(200).json({
      message: "Serviço funcionando corretamente."
    });
  }
}

module.exports = new TestController();
