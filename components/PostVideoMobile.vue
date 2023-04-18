<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import { useElementSize } from "@vueuse/core";
import { AxiosError, AxiosResponse } from "axios";
import { FormInst, UploadFileInfo, useMessage } from "naive-ui";
import {
  UploadVideoErrors,
  UploadVideoPayload,
  videoRepository,
} from "~~/repositories/video-repository";

const MOBILE_STEPS = {
  INFO: "info",
  LOCATION: "location",
};

const model = ref<{
  title: string;
  description: string;
  file: File | null | undefined;
  latitude: number | undefined;
  longitude: number | undefined;
  location: number[] | undefined;
}>({
  title: "",
  description: "",
  file: null,
  latitude: undefined,
  longitude: undefined,
  location: undefined,
});
const errors = ref<UploadVideoErrors>({});

const file = computed(() => model.value.file);
const videoValidation = useVideoValidation(file);

const currentStep = ref(MOBILE_STEPS.INFO);

const message = useMessage();
const formInstance = ref<FormInst | null>(null);
const mapWrapper = ref(null);
const { height } = useElementSize(mapWrapper);

const rules = computed(() => {
  if (currentStep.value === MOBILE_STEPS.INFO) {
    return {
      file: [{ required: true, message: "Please select video" }],
      title: [{ required: true, message: "Please enter video title" }],
      description: [
        { required: true, message: "Please enter video description" },
      ],
    };
  } else {
    return {
      location: [
        { required: true, message: "Please select location from the map" },
      ],
    };
  }
});

const onFileChange = ({ file }: { file: UploadFileInfo }) => {
  model.value.file = file.file;
};

const showBackBtn = computed(() => currentStep.value !== MOBILE_STEPS.INFO);
const onBack = () => {
  currentStep.value = MOBILE_STEPS.INFO;
};

const { mutate: upload, isLoading: loading } = useMutation<
  AxiosResponse<any>,
  AxiosError<UploadVideoErrors>,
  UploadVideoPayload
>(videoRepository.upload);

const onSubmit = async () => {
  await formInstance.value?.validate();
  if (currentStep.value === MOBILE_STEPS.INFO) {
    currentStep.value = MOBILE_STEPS.LOCATION;
  } else {
    model.value = {
      ...model.value,
      latitude: model.value.location?.[0] as number,
      longitude: model.value.location?.[1] as number,
    };

    upload(model.value as UploadVideoPayload, {
      onSuccess() {
        message.success("Video has been uploaded successfully");
        navigateTo("/");
      },
      onError(error) {
        message.error(error.response?.statusText || error.message);
        errors.value = error.response?.data || {};
        if (
          errors.value.title ||
          errors.value.description ||
          errors.value.file
        ) {
          currentStep.value = MOBILE_STEPS.INFO;
        }
      },
    });
  }
};
</script>
<template>
  <div class="flex-1 px-4 py-6 h-full flex flex-col">
    <n-h1>Upload video</n-h1>
    <n-form
      ref="formInstance"
      id="form"
      :model="model"
      :rules="rules"
      class="flex-1 flex flex-col"
      @submit.prevent="onSubmit"
    >
      <section v-if="currentStep === MOBILE_STEPS.INFO" class="space-y-2">
        <n-form-item
          label="Video"
          path="file"
          :validation-status="videoValidation.status"
          :feedback="videoValidation.feedback"
        >
          <n-upload
            accept="video/mp4,video/webp"
            :max="1"
            :on-change="onFileChange"
          >
            <n-button>Select file</n-button>
          </n-upload>
        </n-form-item>
        <n-form-item
          label="Title of the video"
          path="title"
          :validation-status="errors?.title ? 'error' : undefined"
          :feedback="errors?.title"
        >
          <n-input v-model:value="model.title" />
        </n-form-item>

        <n-form-item
          label="Description of the video"
          path="description"
          :validation-status="errors?.description ? 'error' : undefined"
          :feedback="errors?.description"
        >
          <n-input v-model:value="model.description" type="textarea" />
        </n-form-item>
      </section>
      <section ref="mapWrapper" v-else class="flex-1">
        <ClientOnly>
          <n-form-item
            v-if="height"
            label="Please select location"
            path="location"
          >
            <BaseMap
              v-model="model.location"
              :style="{ height: `${height - 60}px` }"
            />
          </n-form-item>
        </ClientOnly>
      </section>
    </n-form>
    <n-space justify="center">
      <n-button
        v-if="showBackBtn"
        type="secondary"
        :disabled="loading"
        @click="onBack"
      >
        Back
      </n-button>
      <n-button
        type="primary"
        attr-type="submit"
        form="form"
        :loading="loading"
        :disabled="loading"
      >
        {{ currentStep === MOBILE_STEPS.INFO ? "Next" : "Upload" }}
      </n-button>
    </n-space>
  </div>
</template>
