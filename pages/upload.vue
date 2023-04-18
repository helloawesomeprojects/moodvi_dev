<script setup lang="ts">
import { FormInst, UploadFileInfo, useMessage } from "naive-ui";
import type { MqObject } from "~~/types/vue-mq";
import { CloudUploadOutline as UploadIcon } from "@vicons/ionicons5";
import { useMutation } from "@tanstack/vue-query";
import {
  UploadVideoErrors,
  UploadVideoPayload,
  videoRepository,
} from "~~/repositories/video-repository";
import { AxiosError, AxiosResponse } from "axios";

definePageMeta({
  middleware: ["auth"],
});

interface UploadForm {
  title: string;
  description: string;
  location: number[];
  file: File | null | undefined;
}

const errors = ref<UploadVideoErrors | undefined>({});

const model = ref<UploadForm>({
  title: "",
  description: "",
  location: [],
  file: null as File | null,
});
const file = computed(() => model.value.file);

const rules = {
  title: [{ required: true, message: "Please enter video title" }],
  description: [{ required: true, message: "Please enter video description" }],
  file: [{ required: true, message: "Please select a video" }],
};

const fileValidation = useVideoValidation(file);

const onFileChange = ({ file }: { file: UploadFileInfo }) => {
  model.value.file = file.file;
};

const mq: MqObject = inject("mq") as MqObject;

const { mutate: upload, isLoading: loading } = useMutation<
  AxiosResponse<any>,
  AxiosError<UploadVideoErrors>,
  UploadVideoPayload
>(videoRepository.upload);

const message = useMessage();
const formEl = ref<FormInst | null>();

const onSubmit = async () => {
  try {
    await formEl.value?.validate();

    const { location, file, ...payload } = model.value;
    const [latitude, longitude] = location;

    upload(
      { ...payload, latitude, longitude, file: file as File },
      {
        onSuccess() {
          message.success("Video has been uploaded successfully");
          navigateTo("/");
        },
        onError(error) {
          message.error(error.response?.statusText || error.message);
          errors.value = error.response?.data || {};
        },
      }
    );
  } catch (err: any) {
    message.error("Please fill all inputs correctly");
  }
};
</script>

<template>
  <div class="flex-1 flex flex-col">
    <!-- Mobile -->
    <PostVideoMobile v-if="mq.smMinus" />
    <!-- Desktop -->
    <div v-else class="px-6 2xl:px-14 py-6">
      <h1 class="font-medium text-2xl">Upload video</h1>
      <p class="mt-1 text-text-tertiary font-light">
        Post a video to your account
      </p>
      <n-form
        ref="formEl"
        :model="model"
        :rules="rules"
        size="large"
        class="space-y-2"
        @submit.prevent="onSubmit"
      >
        <section class="mt-6 flex space-x-6">
          <aside class="pt-7 shrink-0">
            <n-form-item
              path="file"
              :show-label="false"
              :validation-status="fileValidation.status"
              :feedback="fileValidation.feedback || errors?.file"
            >
              <n-upload
                v-model:value="model.file"
                directory-dnd
                :max="1"
                accept="video/mp4,video/webp"
                :on-change="onFileChange"
              >
                <n-upload-dragger class="w-[260px] h-[472px]">
                  <div style="margin-bottom: 12px">
                    <n-icon size="48" :depth="3">
                      <UploadIcon />
                    </n-icon>
                  </div>
                  <n-text style="font-size: 16px">
                    Click or drag a video to this area to upload
                  </n-text>
                  <n-p depth="3" class="mt-2 space-y-0.5">
                    <div>MP4 or WebM</div>
                    <div>720x1280 resolution or higher</div>
                    <div>Up to 5 minutes</div>
                    <div>Less than 2 GBs</div>
                  </n-p>
                </n-upload-dragger>
              </n-upload>
            </n-form-item>
          </aside>
          <main class="flex-1">
            <n-form-item
              label="Title"
              path="title"
              :validation-status="errors?.title ? 'error' : undefined"
              :feedback="errors?.title"
            >
              <n-input
                v-model:value="model.title"
                show-count
                :maxlength="150"
              />
            </n-form-item>

            <n-form-item
              label="Description"
              path="description"
              :validation-status="errors?.description ? 'error' : undefined"
              :feedback="errors?.description"
            >
              <n-input type="textarea" />
            </n-form-item>

            <ClientOnly>
              <BaseInputMap
                class="h-[300px]"
                name="location"
                label="Choose the location"
              />
            </ClientOnly>
            <n-form-item>
              <n-button type="primary" attr-type="submit" :loading="loading">
                Post
              </n-button>
            </n-form-item>
          </main>
        </section>
      </n-form>
    </div>
  </div>
</template>
