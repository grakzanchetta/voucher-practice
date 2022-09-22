import voucherRepository from "../../src/repositories/voucherRepository";
import voucherService from "../../src/services/voucherService";
import * as errors from "../../src/utils/errorUtils";

const correctVoucherData = {
  id: 1,
  code: "zebrazebra",
  discount: 75,
  used: false,
};

test("in the create voucher service, a new voucher with a new code should be inserted", async () => {
  jest.spyOn(voucherRepository, "getVoucherByCode").mockResolvedValueOnce(null);

  jest.spyOn(voucherRepository, "createVoucher");

  await voucherService.createVoucher(correctVoucherData.code, 60);
  expect(voucherRepository.createVoucher).toBeCalledTimes(1);
});

test("in the create voucher service, the voucher should not be inserted if the code is repeated", async () => {
  jest
    .spyOn(voucherRepository, "getVoucherByCode")
    .mockResolvedValueOnce(correctVoucherData);
  const query = voucherService.createVoucher(
    correctVoucherData.code,
    correctVoucherData.discount
  );

  expect(query).rejects.toEqual(errors.conflictError("Voucher already exist."));
});
