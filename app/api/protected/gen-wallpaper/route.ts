import { respData, respErr } from "@/lib/resp";

import { ImageGenerateParams } from "openai/resources/images.mjs";
import { User } from "@/types/user";
import { Wallpaper } from "@/types/wallpaper";
import { currentUser } from "@clerk/nextjs/server";
import { downloadAndUploadImage } from "@/lib/s3";
import { getOpenAIClient } from "@/services/openai";
import { getUserCredits } from "@/services/order";
import { insertWallpaper } from "@/models/wallpaper";
import { saveUser } from "@/services/user";

export async function POST(req: Request) {
  const client = getOpenAIClient();

  const user = await currentUser();
  if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
    return respErr("no auth");
  }

  try {
    const { description } = await req.json();
    if (!description) {
      return respErr("invalid params");
    }
    // save user
    const user_email = user.emailAddresses[0].emailAddress;
    const nickname = user.firstName;
    const avatarUrl = user.imageUrl;
    const userInfo: User = {
      email: user_email,
      nickname: nickname || "",
      avatar_url: avatarUrl,
    };

    await saveUser(userInfo);

    const user_credits = await getUserCredits(user_email);
    if (!user_credits || user_credits.left_credits < 1) {
      return respErr("credits not enough");
    }
    const llm_name = "dall-e-3";
    const img_size = "1792x1024";
    const llm_params: ImageGenerateParams = {
      prompt: `generate desktop wallpaper image about ${description}`,
      model: llm_name,
      n: 1,
      quality: "hd",
      response_format: "url",
      size: img_size,
      style: "vivid",
    };
    const created_at = new Date().toISOString();
    // const res = await client.images.generate(llm_params);
    // const datas = res.data;
    // if (!datas || datas?.length===0) {
    //   return respErr("generate wallpaper failed");
    // }
    // const raw_img_url = datas[0].url || "";
    // if (!raw_img_url) {
    //   return respErr("generate wallpaper failed");
    // }

    const raw_img_url = "http://gips3.baidu.com/it/u=3886271102,3123389489&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960";
    console.log("gen_raw_img_url",raw_img_url)
    const img_name = encodeURIComponent(description);
    const s3_img = await downloadAndUploadImage(
      raw_img_url,
      process.env.AWS_BUCKET || "trysai",
      `wallpapers/${img_name}.png`
    );

    const img_url = s3_img.Location;
    const wallpaper: Wallpaper = {
      user_email: user_email,
      img_description: description,
      img_size: img_size,
      img_url: img_url,
      llm_name: llm_name,
      llm_params: JSON.stringify(llm_params),
      created_at: created_at,
    };
    await insertWallpaper(wallpaper);

    return respData(wallpaper);
  } catch (e) {
    console.log("generate wallpaper failed: ", e);
    return respErr("generate wallpaper failed");
  }
}
