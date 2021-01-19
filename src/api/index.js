import request from "@/utils/fetch";

/*
 *  示例
 * */
export function example(params) {
  return request({
    url: `admin/group/example`,
    method: "GET",
    params
  });
}
